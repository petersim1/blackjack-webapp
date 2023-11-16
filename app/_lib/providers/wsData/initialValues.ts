export const INITIAL_GAME_CONTEXT = {
  profit: 0,
  count: [0, 0],
  text: "",
  total: 0,
  house_cards: [],
  player_cards: [],
  policy: [],
};

export const INITIAL_WSDATA_CONTEXT = {
  ws: null,
  connected: false,
  gameData: {
    history: [],
    data: { ...INITIAL_GAME_CONTEXT },
  },
};
