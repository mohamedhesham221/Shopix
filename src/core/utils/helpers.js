// utils.js
// Utility functions for text formatting and cart data management.
// - formatText: Formats category/product text for display with proper spacing and possessive forms
// - mergeCartData: Merges local and Firebase cart data with quantity conflict resolution
// - Handles gender-specific text formatting (men/women -> men's/women's)
// - Uses Map for efficient cart merging and deduplication
// - Prioritizes higher quantities when merging duplicate cart items

export function formatText(text) {
  const textFormated = text.replace("-", " ")
  if (text.startsWith("men") || text.startsWith("women")) {
    const textFormatedByGender = textFormated.replace("s", "'s")
    return textFormatedByGender
  } else {
    return textFormated
  }
}

// Merge local cart data with Firebase cart data, resolving conflicts by keeping higher quantities
export function mergeCartData(localCart, firebaseCart) {
  const merged = new Map();

  localCart.forEach(item => {
    merged.set(item.id, { ...item });
  });

  firebaseCart.forEach(item => {
    if (merged.has(item.id)) {
      const existing = merged.get(item.id);
      merged.set(item.id, {
        ...existing,
        quantity: Math.max(existing.quantity, item.quantity)
      });
    } else {
      merged.set(item.id, { ...item });
    }
  });

  return Array.from(merged.values());
}
