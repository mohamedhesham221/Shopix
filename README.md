# Shopix 🛒

**Shopix** is a modern e-commerce web application built with **Next.js + React**, delivering a smooth shopping experience with secure authentication, product browsing, wishlist, cart, and checkout. Designed with a clean and responsive UI, Shopix is ready for production and future scalability.

---

## ✨ Features

* 🔑 **User Authentication** with [Clerk](https://clerk.com)
* 🏠 **Home Page** with featured sections and offers
* 👨‍💼 **Profile Page** with featured manage profile, see your orders and your wishlist items.
* 📦 **Products Page** with filtering and search
* 🏷️ **Category Page** to explore items by category
* 📖 **Single Product Page** with detailed info
* 💖 **Wishlist** to save favorite products
* 🛒 **Cart** with total cost & shipping calculation
* 💳 **Checkout** (Stripe Integration / Cash on Delivery)
* 🎨 **UI Components** built with [shadcn/ui](https://ui.shadcn.com/)
* 🕺 **Animations** powered by [Framer Motion](https://www.framer.com/motion/)
* 🧾 **Form Validation** with [Zod](https://github.com/colinhacks/zod) and [React Hook Form](https://react-hook-form.com/)
* 📅 **Date formatting** with [date-fns](https://date-fns.org/)
* 🌐 **API requests** handled with [Axios](https://axios-http.com/)
* 📱 **Responsive design** across all devices

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mohamedhesham221/Shopix.git
cd Shopix
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure environment variables

Create a `.env.local` file and add the following:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-key>
CLERK_SECRET_KEY=<your-key>

NEXT_PUBLIC_FIREBASE_API_KEY=<your-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-key>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-key>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-key>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-key>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-key>

STRIPE_WEBHOOK_SECRET=<your-key>
STRIPE_SECRET_KEY=<your-key>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your-key>
```

### 4. Run the development server

```bash
npm run dev
```

Then open: [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tech Stack

* ⚛️ [React](https://reactjs.org/)
* ▲ [Next.js](https://nextjs.org/)
* 🎨 [Tailwind CSS](https://tailwindcss.com/)
* 🎨 [shadcn/ui](https://ui.shadcn.com/)
* 🔐 [Clerk Authentication](https://clerk.com/)
* 💳 [Stripe](https://stripe.com/)
* 🔥 Firebase (Database & Storage)
* 🕺 [Framer Motion](https://www.framer.com/motion/)
* 🧾 [Zod](https://github.com/colinhacks/zod) & [React Hook Form](https://react-hook-form.com/)
* 📅 [date-fns](https://date-fns.org/)
* 🌐 [Axios](https://axios-http.com/)
* Zustand / React Query (State Management)

---

## 👤 Author

**Muhammad Hisham**
Email: [muhammedheshamm2@gmail.com](mailto:muhammedheshamm2@gmail.com)
Portfolio: [https://muhammad-hisham-portfolio-22.vercel.app/](https://muhammad-hisham-portfolio-22.vercel.app/)
