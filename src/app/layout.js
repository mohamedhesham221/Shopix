import { Roboto, Inter } from 'next/font/google';
import "./globals.css";
import '@smastrom/react-rating/style.css'
import 'rc-slider/assets/index.css';
import Navbar from "@/features/navbar/components/Navbar";
import Footer from "@/shared/components/Footer";
import { ClerkProvider } from '@clerk/nextjs';
import ReactQueryProvider from "@/core/providers/ReactQueryProvider";
import Categories from '@/features/navbar/components/Categories';
import dynamic from 'next/dynamic';
import { Toaster } from 'sonner';

const CartSyncProvider = dynamic(() => import ('@/core/providers/CartSyncProvider'), {
  ssr: false,
});

const WishlistSyncProvider = dynamic(() => import ('@/core/providers/WishlistSyncProvider'), {
  ssr: false,
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-roboto',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: "Shopix",
  description: "A modern e-commerce platform showcasing the latest in web design and functionality using Next.js and Tailwind CSS for a seamless shopping experience with a focus on performance and user experience.",
  openGraph: {
    title: "Shopix",
    description: "A modern e-commerce platform showcasing the latest in web design and functionality using Next.js and Tailwind CSS for a seamless shopping experience with a focus on performance and user experience.",
    url: "https://shopix.example.com",
    siteName: "Shopix",
    images: [
      {
        url: "https://shopix.example.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shopix - Modern E-commerce Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  }

};

export default function RootLayout({ children }) {
  return (

    <ClerkProvider>
      <ReactQueryProvider>
        <CartSyncProvider>
          <WishlistSyncProvider>
            <html lang="en">
              <body
                className={`${roboto.variable} ${inter.variable} antialiased overflow-x-hidden`}
              >
                <Navbar />
                <Categories />
                <main>
                  {children}
                  <Toaster
                    position="top-center"
                    richColors
                    expand
                    duration={3000}
                    theme="dark"
                  />

                </main>
                <Footer />
              </body>
            </html>
          </WishlistSyncProvider>
        </CartSyncProvider>
      </ReactQueryProvider>
    </ClerkProvider>
  );
}