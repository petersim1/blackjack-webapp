export const rulesDefault = {
  dealer_hit_soft17: false,
  push_dealer22: false,
  double_after_split: true,
  hit_after_split_aces: false,
  reduced_blackjack_payout: false,
  allow_surrender: true,
  shrink_deck: true,
};

export const rulesDescriptors = {
  dealer_hit_soft17: "Dealer hits Soft 17",
  push_dealer22: "Push on Dealer 22",
  double_after_split: "Double After Split allowed",
  hit_after_split_aces: "Hit after splitting Aces",
  reduced_blackjack_payout: "Reduced Blackjack payout",
  allow_surrender: "Allow surrender",
  shrink_deck: "Deck depletes",
};

export const INITIAL_MODAL_CONTEXT = {
  open: false,
  setOpen: (): void => {},
  handleModal: (): void => {},
};

export const INITIAL_GAME_CONTEXT = {
  cards_remaining: 1,
  round_over: true,
  deal_player: false,
  deal_house: false,
  profit: 0,
  count: [0, 0],
  text: "",
  player_total: 0,
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
