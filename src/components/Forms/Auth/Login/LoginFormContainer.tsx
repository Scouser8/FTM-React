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

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <LoginFormView handleSubmit={handleSubmit(onSubmit)} register={register} />
  );
}
