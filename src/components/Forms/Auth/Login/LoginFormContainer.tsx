import TextField from "@mui/material/TextField";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ShowPassword from "../ShowPassword";
import LoginFormView from "./LoginFormView";
import { Field } from "../../../../types/form.types";
import { yupResolver } from "@hookform/resolvers/yup";
import userLoginSchema from "../../../../utils/form/validationSchema/UserLoginSchema";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../../store/userSlice";
import { AppDispatch } from "../../../../types/store.types";
import { getUserSelector } from "../../../../store/selectors/user";
import { USER_AUTH_PENDING } from "../../../../constants/thunk-status";
import { showSnackbar } from "../../../../store/actions/snackbar";
import { ERROR, SUCCESS } from "../../../../constants/snackbar";

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

  const dispatch = useDispatch<AppDispatch>();

  const { status } = useSelector(getUserSelector);

  const isSubmitting = status === USER_AUTH_PENDING;

  const handleToggleShowPassword = () =>
    setShowPassword((prevState) => !prevState);

  const onSubmit = (data: FormValues) => {
    dispatch(userLogin(data))
      .unwrap()
      .then(() =>
        dispatch(
          showSnackbar({ message: "Logged In Successfully", status: SUCCESS })
        )
      )
      .catch((error) =>
        dispatch(showSnackbar({ message: error, status: ERROR }))
      );
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
    <LoginFormView
      handleSubmit={handleSubmit(onSubmit)}
      fields={formFields}
      isSubmitting={isSubmitting}
    />
  );
}
