import TextField from "@mui/material/TextField";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ShowPassword from "../ShowPassword";
import LoginFormView from "./LoginFormView";
import { Field } from "../../../../types/form.types";
import { yupResolver } from "@hookform/resolvers/yup";
import userLoginSchema from "../../../../utils/form/validationSchema/UserLoginSchema";

type FormValues = {
  email: string;
  password: string;
};

const defaultValues: FormValues = {
  email: "",
  password: "",
};

export default function LoginFormContainer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(userLoginSchema),
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleToggleShowPassword = () =>
    setShowPassword((prevState) => !prevState);

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const fields: Field<FormValues>[] = useMemo(
    () => [
      { fieldProps: { name: "email", label: "Email" } },
      {
        fieldProps: {
          name: "password",
          label: "Password",
          type: showPassword ? "text" : "password",
          InputProps: {
            endAdornment: (
              <ShowPassword
                showPassword={showPassword}
                handleToggleShowPassword={handleToggleShowPassword}
              />
            ),
          },
        },
      },
    ],
    [showPassword, handleToggleShowPassword]
  );

  const formFields = fields?.map(({ fieldProps }) => (
    <TextField
      key={fieldProps?.name}
      fullWidth
      error={!!errors[fieldProps?.name]}
      helperText={errors[fieldProps?.name]?.message}
      margin="normal"
      {...register(fieldProps?.name)}
      {...fieldProps}
    />
  ));

  return (
    <LoginFormView handleSubmit={handleSubmit(onSubmit)} fields={formFields} />
  );
}
