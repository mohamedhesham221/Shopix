export function formatText(text) {
  const textFormated = text.replace("-", " ")
  if (text.startsWith("men") || text.startsWith("women")) {
    const textFormatedByGender = textFormated.replace("s", "'s")
    return textFormatedByGender
  } else {
    return textFormated
  }
}

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
