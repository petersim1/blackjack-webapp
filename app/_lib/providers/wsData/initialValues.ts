export const INITIAL_GAME_CONTEXT = {
  profit: 0,
  count: [0, 0],
  text: "",
  total: 0,
  houseCards: [],
  playerCards: [],
  policy: [],
};

export const INITIAL_WSDATA_CONTEXT = {
  ws: null,
  gameData: {
    history: [],
    data: { ...INITIAL_GAME_CONTEXT },
  },
};
