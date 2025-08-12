import { Roboto, Inter } from 'next/font/google';
import "./globals.css";
import '@smastrom/react-rating/style.css'
import 'rc-slider/assets/index.css';
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from '@clerk/nextjs';
import ReactQueryProvider from "@/components/ReactQueryProvider";
import Categories from '@/components/navbar/Categories';
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
      <ReactQueryProvider >
        <html lang="en">
          <body
            className={`${roboto.variable} ${inter.variable} antialiased overflow-x-hidden`}
          >
            <Navbar />
            <Categories />
            <main>
              {children}
            </main>
            <Footer />
          </body>
        </html>
      </ReactQueryProvider>
    </ClerkProvider>
  );
}