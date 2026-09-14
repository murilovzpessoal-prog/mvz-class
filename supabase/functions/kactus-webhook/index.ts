import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Este webhook recebe avisos da CAKTO
serve(async (req) => {
  try {
    const payload = await req.json()
    
    // Obter chaves de admin (para poder deletar usuários)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    // Ajuste para o payload padrão da CAKTO
    const email = payload.data?.customer?.email || payload.customer?.email || payload.email;
    const event = payload.event_type || payload.event || payload.status; 

    if (!email) {
      return new Response("E-mail não encontrado no webhook", { status: 400 })
    }

    // Eventos de compra aprovada
    if (event === 'transaction.paid' || event === 'paid' || event === 'approved') {
      // 1. COMPRA APROVADA: Insere o e-mail no cofre
      await supabaseAdmin.from('compras_aprovadas').upsert({ 
        email: email, 
        status: 'active' 
      }, { onConflict: 'email' })
      
      console.log(`[CAKTO] Acesso liberado para: ${email}`);
    } 
    // Eventos de estorno/reembolso/cancelamento
    else if (event === 'transaction.refunded' || event === 'transaction.canceled' || event === 'refunded' || event === 'chargeback') {
      // 2. REEMBOLSO: Bloqueia o usuário
      await supabaseAdmin.from('compras_aprovadas').update({ status: 'refunded' }).eq('email', email)
      
      const { data: users, error: searchError } = await supabaseAdmin.auth.admin.listUsers()
      if (!searchError && users?.users) {
        const user = users.users.find(u => u.email === email)
        if (user) {
          await supabaseAdmin.auth.admin.deleteUser(user.id)
          console.log(`[CAKTO] Usuário ${email} deletado com sucesso (Reembolso).`);
        }
      }
    }

    return new Response(JSON.stringify({ success: true, processed_email: email, event: event }), { headers: { "Content-Type": "application/json" } })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
