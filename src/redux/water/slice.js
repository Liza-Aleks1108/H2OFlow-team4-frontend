import { initialState } from "../initialState";

const waterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_WATER_DATA":
      return { ...state, waterData: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default waterReducer;
