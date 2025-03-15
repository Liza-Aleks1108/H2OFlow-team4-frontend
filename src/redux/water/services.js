import { userAPI } from "../user/operations.js";

const token = localStorage.getItem("token"); // Отримуємо токен з localStorage

if (!token) {
  throw new Error("Токен авторизації відсутній");
}

export const requestAddWater = async (water) => {
  const { data } = await userAPI.post("/water", water, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const requestPatchWater = async (water) => {
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
