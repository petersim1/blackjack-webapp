export const rulesDefault = {
  dealer_hit_soft17: false,
  push_dealer22: false,
  double_after_split: true,
  hit_after_split_aces: false,
  reduced_blackjack_payout: false,
  allow_surrender: true,
};

export const deckDefault = {
  shrink_deck: true,
  n_decks: 6,
  ratio_penetrate: 0.6667,
};

export const rulesDescriptors = {
  dealer_hit_soft17: "Dealer hits Soft 17",
  push_dealer22: "Push on Dealer 22",
  double_after_split: "Double After Split allowed",
  hit_after_split_aces: "Hit after splitting Aces",
  reduced_blackjack_payout: "Reduced Blackjack payout",
  allow_surrender: "Allow surrender",
};

export const deckDescriptors = {
  shrink_deck: "Deck depletes",
  n_decks: "Number of Decks",
  ratio_penetrate: "Cut Card % through Deck",
};

export const INITIAL_MODAL_CONTEXT = {
  open: false,
  setOpen: (): void => {},
  handleModal: (): void => {},
};

export const INITIAL_GAME_CONTEXT = {
  ready: false,
  round_over: false,
  hand_result: undefined,
  round_profit: undefined,
  total_profit: 0,
  count: [0, 0],
  cards_remaining: 1,
  player_total: undefined,
  house_total: undefined,
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
  gameDispatch: (): void => {},
};

export const INITIAL_LS_CONTEXT = {
  ready: false,
  storeData: {
    rules: { ...rulesDefault },
    deck: { ...deckDefault },
    count: true,
  },
  updateStore: (): void => {},
};

export const nameColors = {
  start: "var(--blue)",
  hit: "var(--green)",
  stay: "var(--yellow)",
  double: "var(--purple)",
  surrender: "var(--gray)",
  split: "var(--pink)",
};

export const resColors = {
  win: "var(--green)",
  loss: "var(--red)",
  bust: "var(--red)",
  push: "var(--gray)",
};
