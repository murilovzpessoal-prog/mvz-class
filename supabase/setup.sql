-- 1. Cria a tabela de Compras Aprovadas
CREATE TABLE public.compras_aprovadas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active' NOT NULL, -- 'active', 'refunded'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Habilita a Segurança (RLS)
ALTER TABLE public.compras_aprovadas ENABLE ROW LEVEL SECURITY;

-- NENHUMA POLICY de SELECT é necessária pois o frontend não precisa ler essa tabela.
-- Tudo acontece de forma blindada no Trigger do banco.

-- 3. Função e Trigger para BLOQUEAR criação de conta se não tiver comprado
CREATE OR REPLACE FUNCTION check_purchase_before_signup()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.compras_aprovadas 
    WHERE email = NEW.email AND status = 'active'
  ) THEN
    RAISE EXCEPTION 'Acesso negado: E-mail não possui compra ativa.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS prevent_unauthorized_signup ON auth.users;
CREATE TRIGGER prevent_unauthorized_signup
BEFORE INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION check_purchase_before_signup();
