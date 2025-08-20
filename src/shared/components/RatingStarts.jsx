"use client";
import { Star } from "lucide-react";

export default function RatingStars({ rating = 0, reviewsCount = 0, max = 5 }) {
  const stars = Array.from({ length: max }, (_, index) => {
    const starValue = index + 1;
    const diff = rating - index; // Difference between rating and star number

    if (diff >= 1) return 100; // Full star
    if (diff > 0) return diff * 100; // Percentage
    return 0; // Empty star
  });

  return (
    <div className="flex items-center gap-x-2">
      <div className="flex">
        {stars.map((fillPercent, i) => (
          <div key={i} className="relative w-5 h-5">
            {/* Background of the empty star */}
            <Star
              className="absolute top-0 left-0 text-muted-foreground/50"
              size={20}
            />
            {/* The partially or fully filled star */}
            {fillPercent > 0 && (
              <Star
                className="absolute top-0 left-0 text-yellow-400 fill-yellow-400"
                size={20}
                style={{
                  clipPath: `inset(0 ${100 - fillPercent}% 0 0)`,
                }}
              />
            )}
          </div>
        ))}
      </div>
      {reviewsCount > 0 && (
        <p className="text-sm text-muted-foreground">
          ({reviewsCount})
        </p>
      )}
    </div>
  );
}
