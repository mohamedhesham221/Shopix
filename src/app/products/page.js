import AllProducts from '@/components/all-products/AllProducts';
import BreadcrumbNavigate from '@/components/BreadcrumbNavigate';

export default function ProductsPage() {
  return (
    <section>
      <h1 className='sr-only'>All Products</h1>
      <BreadcrumbNavigate category={"All Products"} />
      <AllProducts />
    </section>
  );
}