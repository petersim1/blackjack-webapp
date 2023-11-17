/*
  @param card is a tuple of cardNum and Suit
*/
export const getImgUrl = (card: [number | string, string]): string => {
  const [cardVal, suit] = card;
  if (suit === "Hidden") {
    return "/images/back.png";
  }
  return "/images/" + String(cardVal) + suit + ".png";
};
