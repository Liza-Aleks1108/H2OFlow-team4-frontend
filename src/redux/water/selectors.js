export const selectEntries = (state) => state.water.entries;
export const selectLoading = (state) => state.water.loading;
export const selectError = (state) => state.water.error;

// from filters
export const selectIsLoading = (state) => state.water.isLoading;
export const selectDayWater = (state) => state.water.perDay;
export const selectMonthWater = (state) => state.water.perMonth;
