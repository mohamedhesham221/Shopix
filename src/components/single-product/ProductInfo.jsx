"use client";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import { Rating as ReactRating, Star } from "@smastrom/react-rating";
import { Badge } from "@/components/ui/badge";
import { Store, Barcode, Ruler } from "lucide-react";

const ratingStyles = {
  itemShapes: Star,
  activeFillColor: "#facc15",
  inactiveFillColor: "#d1d5db",
};

export default function ProductInfo({ product, isLoading }) {
  const oldPrice = (price, discount) =>
    (price + price * (discount / 100)).toFixed(2);

  return (
    <div className="flex flex-col gap-y-4 md:gap-y-6">
      {/* Title */}
      {isLoading ? (
        <Skeleton className="w-full h-6 md:h-8" />
      ) : (
        <h2 className="font-inter text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight">
          {product.title}
        </h2>
      )}

      {/* Rating + Reviews + Stock */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 items-start sm:items-center">
        <div className="flex items-center gap-x-2">
          {isLoading ? (
            <Skeleton className="w-24 h-5" />
          ) : (
            <ReactRating
              style={{ maxWidth: 100 }}
              value={Number(product.rating)}
              readOnly
              halfFillMode="svg"
              itemStyles={ratingStyles}
            />
          )}
        </div>

        <div className="flex items-center">
          {isLoading ? (
            <Skeleton className="w-20 h-5" />
          ) : (
            <p className="text-muted-foreground font-roboto text-sm">
              ({product.reviews.length} Reviews)
            </p>
          )}
        </div>

        <Separator orientation="vertical" className="hidden sm:block h-5" />

        <div className="flex items-center">
          {isLoading ? (
            <Skeleton className="w-24 h-5" />
          ) : (
            <p className="font-roboto text-sm">
              <span className="text-green-600 font-medium">
                {product.availabilityStatus}
              </span>{" "}
              <span className="text-muted-foreground text-xs">
                ({product.stock} in stock)
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton className="w-16 h-6" key={idx} />
            ))
          : product.tags.map((tag, idx) => (
              <Badge
                variant="outline"
                key={idx}
                className="capitalize font-roboto text-xs"
              >
                {tag}
              </Badge>
            ))}
      </div>

      {/* Price */}
      {isLoading ? (
        <Skeleton className="w-40 h-8" />
      ) : (
        <div className="flex flex-wrap gap-3 items-baseline">
          <span className="font-inter font-bold text-2xl sm:text-3xl">
            ${product.price.toFixed(2)}
          </span>
          {product.discountPercentage && (
            <>
              <span className="text-muted-foreground line-through text-lg font-roboto">
                ${oldPrice(product.price, product.discountPercentage)}
              </span>
              <Badge variant="destructive" className="text-xs">
                {product.discountPercentage}% OFF
              </Badge>
            </>
          )}
        </div>
      )}

      {/* Description */}
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </div>
      ) : (
        <p className="text-sm sm:text-base font-roboto leading-relaxed text-muted-foreground">
          {product.description}
        </p>
      )}

      <Separator className="my-2" />

      {/* Brand + SKU */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 items-start">
        {isLoading ? (
          <>
            <Skeleton className="w-32 h-5" />
            <Skeleton className="w-24 h-6" />
          </>
        ) : (
          <>
            {product.brand && (
              <p className="font-inter flex items-center gap-2 text-sm">
                <Store size={16} className="text-muted-foreground" />
                <span className="font-medium">{product.brand}</span>
              </p>
            )}
            <Badge
              variant="secondary"
              className="font-roboto flex items-center gap-2 text-xs"
            >
              <Barcode size={14} /> {product.sku}
            </Badge>
          </>
        )}
      </div>

      {/* Dimensions */}
      {isLoading ? (
        <Skeleton className="w-full h-5" />
      ) : (
        <div className="font-roboto flex flex-wrap items-center gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Ruler size={16} className="text-muted-foreground" />
            <span className="font-medium">Dimensions:</span>
          </div>
          <div className="flex flex-wrap gap-3 text-xs">
            <span className="bg-muted px-2 py-1 rounded">
              W: {product.dimensions.width}"
            </span>
            <span className="bg-muted px-2 py-1 rounded">
              H: {product.dimensions.height}"
            </span>
            <span className="bg-muted px-2 py-1 rounded">
              D: {product.dimensions.depth}"
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
