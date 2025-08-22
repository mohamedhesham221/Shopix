// navbar/Logo.jsx
import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <div>
      <Link href="/" className="flex items-center">
        <Image
          src="/assets/logo.png"
          alt="Shopix Logo"
          width={60}
          height={60}
          className="h-10 w-10 md:h-15 md:w-15 object-cover"
        />
      </Link>
    </div>
  );
}
