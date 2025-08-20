import AllProductsSection from "@/features/home/components/AllProductsSection";
import BrandSlider from "@/features/home/components/BrandSlider";
import FeaturedProducts from "@/features/home/components/FeaturedProducts";
import FirstBanner from "@/features/home/components/FirstBanner";
import HeroSlide from "@/features/home/components/HeroSlide";
import SecondBanner from "@/features/home/components/SecondBanner";
import ServicesSection from "@/features/home/components/ServicesSection";
import ThirdBanner from "@/features/home/components/ThirdBanner";
export default function Home() {

  return (
    <>
      <HeroSlide />
      <FeaturedProducts />
      <FirstBanner />
      <AllProductsSection />
      <SecondBanner />
      <BrandSlider />
      <ThirdBanner />
      <ServicesSection />
      {/*
      */}
    </>
  );
}
