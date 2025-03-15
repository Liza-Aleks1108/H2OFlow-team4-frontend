// export const selectWaterEntries = (state) => state.user.userData.waterData;
// export const selectIsLoading = (state) => state.user.userData.isLoading;
// // export const selectError = (state) => state.user.error;

export const selectEntries = (state) => state.water.water.entries;
export const selectLoading = (state) => state.water.water.loading;
export const selectError = (state) => state.water.water.error;
