"use client";

import Image from "next/image";
import { useState } from "react";
import fallbackIamge from "../../../public/assets/fallback.svg";
export default function ImageWithFallback({ src, fallback = fallbackIamge, alt = "", ...props }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      {...props}
      unoptimized
    />
  );
}
