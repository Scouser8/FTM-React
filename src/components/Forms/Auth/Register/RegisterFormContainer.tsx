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
import { getUserSelector } from "../../../../store/selectors/user";
import { USER_AUTH_PENDING } from "../../../../constants/thunk-status";
import { showSnackbar } from "../../../../store/actions/snackbar";
import { ERROR, SUCCESS } from "../../../../constants/snack-status";
import { useNavigate } from "react-router";
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

  const { status } = useSelector(getUserSelector);

  const isSubmitting = status === USER_AUTH_PENDING;

  const handleToggleShowPassword = () =>
    setShowPassword((prevState) => !prevState);

  const onSubmit = async (data: FormValues) => {
    const { email, password, firstName, lastName } = data;
    const payload = { email, password, firstName, lastName };
    await dispatch(userRegister(payload))
      .unwrap()
      .then(() => {
        dispatch(
          showSnackbar({
            message: "Account created successfully, welcome to FTM",
            status: SUCCESS,
          })
        );
        navigate(APP_ROUTES.LOGIN);
      })
      .catch((error) =>
        dispatch(showSnackbar({ message: error, status: ERROR }))
      );
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
