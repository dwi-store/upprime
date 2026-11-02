-- Keep active products public while allowing UPPRIME admins to see inactive products.
-- One policy avoids duplicate permissive SELECT policies for authenticated users.
DROP POLICY IF EXISTS "Admins can read all products" ON public.products;
DROP POLICY IF EXISTS "Anyone can read active products" ON public.products;

CREATE POLICY "Public and admins can read products"
ON public.products
FOR SELECT
TO anon, authenticated
USING (
  is_active = true
  OR EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = (SELECT auth.uid())
      AND p.is_admin = true
  )
);
