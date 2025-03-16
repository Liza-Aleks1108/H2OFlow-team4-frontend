export const selectMonthWater = (state) => state.monthData.monthData.oneMonth;
export const selectIsLoadingMonth = (state) =>
  state.monthData.monthData.isLoadingMonth;
export const selectError = (state) => state.monthData.monthData.isErrorMonth;

// export const selectActiveDate = (state) => state.water?.activeDate || null;
