import { object, string, ref } from "yup";

const userSchema = object({
  firstName: string()
    .required()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
  lastName: string()
    .required()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
  email: string().required().email(),
  password: string()
    .matches(
      /^(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!/@_#\$%\^&\*])/,
      "Must have no Spaces, contain 8 Characters, One Uppercase, One Lowercase, One Number & One Special Character"
    )
    .min(8, "Password minimum length is 8 characters")
    .max(255)
    .required(),
  confirmPassword: string()
    .required()
    .oneOf([ref("password")], "Passwords must match"),
});

export default userSchema;
