export const initialState = {
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
};
