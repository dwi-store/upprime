-- Cache auth.uid() once per statement in the admin-only delete policy.
-- Keep the original restrictions: only admins may delete cancelled unpaid/failed orders.
DROP POLICY IF EXISTS "Admins can delete cancelled unpaid orders" ON public.orders;

CREATE POLICY "Admins can delete cancelled unpaid orders"
ON public.orders
FOR DELETE
TO authenticated
USING (
  order_status = 'cancelled'
  AND payment_status IN ('pending', 'failed')
  AND EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = (SELECT auth.uid())
      AND p.is_admin = true
  )
);
