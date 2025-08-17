import ProductInfo from "./ProductInfo";
import ProductActions from "./ProductActions";

export default function ProductDetails({ product, isLoading }) {
  return (
    <section className="flex flex-col gap-y-6 w-full md:w-1/2">
      <ProductInfo product={product} isLoading={isLoading} />
      <ProductActions product={product} isLoading={isLoading} />
    </section>
  );
}
