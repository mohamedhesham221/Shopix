import BreadcrumbNavigate from '@/shared/components/BreadcrumbNavigate';
import CartProducts from '@/features/cart/components/CartProducts';

export default function CartPage() {
  return (
    <section className='px-5 md:px-15 lg:px-20 flex flex-col gap-y-15'>
      <h1 className='sr-only'>Cart</h1>
      <BreadcrumbNavigate category={'cart'} />
      <CartProducts />
    </section>
  );
}