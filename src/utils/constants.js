export function formatText(text) {
  const textFormated = text.replace("-", " ")
  if (text.startsWith("men") || text.startsWith("women")) {
    const textFormatedByGender = textFormated.replace("s", "'s")
    return textFormatedByGender
  } else {
    return textFormated
  }
}