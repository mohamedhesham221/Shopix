import UserWishlist from "@/components/wishlist/UserWishlist";

export default function WishlistPage() {
  return (
    <section className='px-5 md:px-15 lg:px-20 flex flex-col gap-y-15'>
      <UserWishlist />
    </section>
  );
}