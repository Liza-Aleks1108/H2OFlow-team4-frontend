// import { createSelector } from "@reduxjs/toolkit";

export const selectWaterDate = (state) => state.water.waterDate;
export const selectDay = (state) => state.water.day;
export const selectMonth = (state) => state.water.month;
export const selectActiveDate = (state) => state.water.activeDate;
// export const selectActiveDate = createSelector(
//   (state) => state.water.activeDate,
//   (activeDate) => new Date(activeDate)
// );
export const selectTotalVolume = (state) => state.water.totalVolume;
export const selectLoading = (state) => state.water.loading;
export const selectError = (state) => state.water.error;
