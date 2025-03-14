export const setWaterData = (data) => ({
  type: "SET_WATER_DATA",
  payload: data,
});

export const setError = (error) => ({
  type: "SET_ERROR",
  payload: error,
});

export const setLoading = (isLoading) => ({
  type: "SET_LOADING",
  payload: isLoading,
});
