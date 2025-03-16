import { userAPI } from "../user/operations.js";

export const requestAddWater = async (water, token) => {
  try {
    const { data } = await userAPI.post("/water", water, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Помилка при відправці запиту:", error.response?.data);
    throw error;
  }
};

export const requestPatchWater = async (water, token) => {
  const { data } = await userAPI.patch(
    `/water/${water.id}`,
    {
      amount: water.amount,
      date: water.date,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
