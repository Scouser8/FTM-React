import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import RegisterFormView from "./RegisterFormView";
import userSchema from "../../../../utils/form/validationSchema/UserRegisterSchema";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

export default function LoginFormContainer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
    resolver: yupResolver(userSchema),
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleToggleShowPassword = () =>
    setShowPassword((prevState) => !prevState);

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <RegisterFormView
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      showPassword={showPassword}
      handleToggleShowPassword={handleToggleShowPassword}
      errors={errors}
    />
  );
}
