import * as Yup from "yup";

export const userSettingsValidationSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too short! Min 2").max(12, "Too long! Max 12"),
  email: Yup.string().email("Enter a valid email"),
  gender: Yup.string().oneOf(["woman", "man"], "Please choose gender"),
  weight: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .min(0, "The weight must be at least 1 kg")
    .max(500, "The weight cannot be more than 500 kg"),
  dailySportTime: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .min(0, "Sports time cannot be negative")
    .max(24, "The maximum value is 24 hours"),
  dailyNorm: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .min(0.5, "Minimum 0.5 liters")
    .max(15, "Maximum 0.5 liters"),
});
