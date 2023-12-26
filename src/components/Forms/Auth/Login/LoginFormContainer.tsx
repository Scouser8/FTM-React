import { useState } from "react";

import { useForm } from "react-hook-form";

import LoginFormView from "./LoginFormView";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginFormContainer() {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleToggleShowPassword = () =>
    setShowPassword((prevState) => !prevState);

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <LoginFormView
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      showPassword={showPassword}
      handleToggleShowPassword={handleToggleShowPassword}
    />
  );
}
