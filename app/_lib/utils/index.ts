import { InferenceSession } from "onnxruntime-web";

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

export const spawnOrtSession = async (): Promise<InferenceSession> => {
  const session = await InferenceSession.create("/model/deep_q.onnx", {
    executionProviders: ["webgl"],
  });

  return session;
};
