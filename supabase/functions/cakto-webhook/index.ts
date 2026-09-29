import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Este webhook recebe avisos da CAKTO
serve(async (req) => {
  try {
    const payload = await req.json()
    
    // Conecta no banco como Administrador Invisível
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    // Ajuste resiliente para capturar o email em qualquer formato enviado pela CAKTO
    const rawEmail = 
      payload.data?.customer?.email || 
      payload.customer?.email || 
      payload.buyer?.email ||
      payload.data?.buyer?.email ||
      payload.client?.email ||
      payload.data?.client?.email ||
      payload.email ||
      payload.data?.email;
      
    const email = rawEmail ? rawEmail.trim().toLowerCase() : null;

    // Normalização do evento ou status
    const rawEvent = (
      payload.event_type || 
      payload.event || 
      payload.status || 
      payload.data?.status ||
      payload.current_status ||
      ""
    ).toString().toLowerCase();

    if (!email) {
      console.warn("Payload recebido sem e-mail:", JSON.stringify(payload));
      return new Response(JSON.stringify({ error: "E-mail não encontrado no webhook", payload }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // 1. COMPRA APROVADA: Insere o e-mail no cofre
    if (
      rawEvent.includes("paid") || 
      rawEvent.includes("approved") || 
      rawEvent.includes("aprovad") || 
      rawEvent.includes("pago") ||
      rawEvent.includes("compra_aprovada")
    ) {
      const { error: upsertError } = await supabaseAdmin.from('compras_aprovadas').upsert({ 
        email: email, 
        status: 'active' 
      }, { onConflict: 'email' });
      
      if (upsertError) {
        console.error("Erro ao salvar no banco:", upsertError);
        return new Response(JSON.stringify({ error: upsertError.message }), { status: 500 });
      }

      console.log(`[CAKTO] Acesso liberado com sucesso para: ${email}`);
    } 
    
    // 2. REEMBOLSO: Corta o acesso pela raiz
    else if (
      rawEvent.includes("refund") || 
      rawEvent.includes("cancel") || 
      rawEvent.includes("chargeback") || 
      rawEvent.includes("reembols")
    ) {
      await supabaseAdmin.from('compras_aprovadas').update({ status: 'refunded' }).eq('email', email);
      
      const { data: users, error: searchError } = await supabaseAdmin.auth.admin.listUsers();
      if (!searchError && users?.users) {
        const user = users.users.find(u => u.email === email);
        if (user) {
          await supabaseAdmin.auth.admin.deleteUser(user.id);
          console.log(`[CAKTO] Usuário ${email} deletado com sucesso (Reembolso).`);
        }
      }
    }

    return new Response(JSON.stringify({ success: true, processed_email: email, event: rawEvent }), { headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
})