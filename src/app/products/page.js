import AllProducts from '@/features/all-products/components/AllProducts';
import BreadcrumbNavigate from '@/shared/components/BreadcrumbNavigate';

export default function ProductsPage() {
  return (
    <section>
      <h1 className='sr-only'>All Products</h1>
      <BreadcrumbNavigate category={"All Products"} />
      <AllProducts />
    </section>
  );
}