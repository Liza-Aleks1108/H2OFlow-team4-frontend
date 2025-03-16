export const initialState = {
  water: {
    perDay: [
      { id: 1, amount: 250, time: "07:00" },
      { id: 2, amount: 250, time: "11:00" },
      { id: 3, amount: 250, time: "14:00" },
    ],
    perMonth: [],
  },
  user: {
    userData: {
      name: "User",
      email: null,
      gender: "woman",
      weight: 0,
      dailySportTime: 0,
      dailyNorm: 1500,
      avatarUrl: "img/avatar.png",
    },
    totalAmount: null,
    isLoggedIn: false,
    token: null,
    loading: false,
    error: null,
  },
  water: {
    entries: [],
    loading: false,
    error: null,
  },
  monthData: [],
  isLoadingMonth: false,
  isErrorMonth: null,
};
