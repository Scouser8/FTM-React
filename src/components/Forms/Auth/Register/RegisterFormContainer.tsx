import { useState, useMemo } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import userRegisterSchema from "../../../../utils/form/validationSchema/UserRegisterSchema";

import { Field } from "../../../../types/form.types";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import ShowPassword from "../ShowPassword";
import RegisterFormView from "./RegisterFormView";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../../../store/userSlice";
import { AppDispatch } from "../../../../types/store.types";
import { getUser } from "../../../../store/selectors/user";
import {
  USER_AUTH_PENDING,
  USER_REGISTRATION_SUCCESSFUL,
} from "../../../../constants/thunk-status";
import { redirect, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../../constants/routes";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

const defaultValues: FormValues = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
};

export default function LoginFormContainer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(userRegisterSchema),
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  
  const { status } = useSelector(getUser);

  const isSubmitting = status === USER_AUTH_PENDING;

  if (status === USER_REGISTRATION_SUCCESSFUL) {
    navigate(APP_ROUTES.LOGIN);
  }

  const handleToggleShowPassword = () =>
    setShowPassword((prevState) => !prevState);

  const onSubmit = (data: FormValues) => {
    const { email, password, firstName, lastName } = data;
    const payload = { email, password, firstName, lastName };
    dispatch(userRegister(payload));
    redirect(APP_ROUTES.LOGIN);
  };

  const fields: Field<FormValues>[] = useMemo(
    () => [
      {
        wrapperProps: { gridSize: { md: 6 } },
        fieldProps: { name: "firstName", label: "First Name" },
      },
      {
        wrapperProps: { gridSize: { md: 6 } },
        fieldProps: { name: "lastName", label: "Last Name" },
      },
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
      {
        fieldProps: {
          name: "confirmPassword",
          label: "Confirm Password",
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

  const formFields = fields?.map(({ fieldProps, wrapperProps }) => (
    <Grid item xs={12} {...wrapperProps?.gridSize}>
      <TextField
        key={fieldProps?.name}
        fullWidth
        error={!!errors[fieldProps?.name]}
        helperText={errors[fieldProps?.name]?.message}
        {...register(fieldProps?.name)}
        {...fieldProps}
      />
    </Grid>
  ));

  return (
    <RegisterFormView
      fields={formFields}
      handleSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    />
  );
}
