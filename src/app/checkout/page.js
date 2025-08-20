import CheckoutParent from '@/features/checkout/components/CheckoutParent';
import BreadcrumbNavigate from '@/shared/components/BreadcrumbNavigate';

export default function CheckoutPage() {
  return (
    <section className="px-5 md:px-15 lg:px-20 flex flex-col gap-y-15">
      <BreadcrumbNavigate category={'checkout'} />
      <h1 className='font-inter text-2xl md:text-4xl lg:text-5xl'>Billing Details</h1>
      <CheckoutParent />
    </section>
  );
}