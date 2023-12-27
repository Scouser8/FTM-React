import { object, string } from "yup";

const userLoginSchema = object({
  email: string().required().email(),
  password: string()
    .matches(
      /^(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!/@_#\$%\^&\*])/,
      "Must have no Spaces, contain at least 8 Characters, One Uppercase, One Lowercase, One Number & One Special Character"
    )
    .min(8, "Password minimum length is 8 characters")
    .max(255)
    .required(),
});

export default userLoginSchema;
