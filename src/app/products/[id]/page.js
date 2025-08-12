import SingleProduct from "@/components/single-product/SingleProduct";

export default async function ProductPage({ params }) {
  const { id } = await params;

  return (
    <section>
      <h1 className='sr-only'>Product: {id}</h1>
      <SingleProduct id={id} />
    </section>
  );
}