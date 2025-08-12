import AllProductsSection from "@/components/home/AllProductsSection";
import BrandSlider from "@/components/home/BrandSlider";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FirstBanner from "@/components/home/FirstBanner";
import HeroSlide from "@/components/home/HeroSlide";
import SecondBanner from "@/components/home/SecondBanner";
import ServicesSection from "@/components/home/ServicesSection";
import ThirdBanner from "@/components/home/ThirdBanner";
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
