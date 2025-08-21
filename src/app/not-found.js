"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {Home, ArrowLeft} from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="absolute top-0 left-0 right-0 z-[999999] min-h-[100vh] overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl"
        />
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.25, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
          className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-fuchsia-500/30 blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:24px_24px]" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-[100dvh] max-w-3xl flex-col items-center justify-center p-6">
        {/* Card */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 text-sm text-zinc-300">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-rose-400" />
            Oops—this page went missing.
          </div>

          <div className="mt-6 flex items-end gap-4">
            <motion.h1
              initial={{ letterSpacing: "0.05em" }}
              animate={{ letterSpacing: "0.01em" }}
              transition={{ duration: 0.8 }}
              className="text-7xl font-black leading-none tracking-tight text-white sm:text-8xl"
            >
              404
            </motion.h1>
            <p className="mb-1 text-lg text-zinc-300">Not Found</p>
          </div>

          <p className="mt-4 max-w-prose text-zinc-300">
            The link may be broken or the page may have been moved.
          </p>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15 active:translate-y-[1px]"
            >
              <Home size={18} /> Home
            </Link>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15 active:translate-y-[1px]"
            >
              <ArrowLeft size={18} /> Go Back
            </button>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
