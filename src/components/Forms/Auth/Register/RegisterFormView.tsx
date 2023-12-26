import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import UserFormFooter from "../UserFormFooter";

import { APP_ROUTES } from "../../../../constants/routes";
import ShowPassword from "../ShowPassword";
import { useMemo } from "react";

type Props = {
  handleSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  register: Function;
  showPassword: boolean;
  handleToggleShowPassword: () => void;
  errors: any;
};

function LoginFormView(props: Props) {
  const {
    handleSubmit,
    register,
    showPassword,
    handleToggleShowPassword,
    errors,
  } = props;

  const fields = useMemo(
    () => [
      {
        wrapperProps: { gridSizes: { md: 6 } },
        fieldProps: { name: "firstName", label: "First Name" },
      },
      {
        wrapperProps: { gridSizes: { md: 6 } },
        fieldProps: { name: "lastName", label: "Last Name" },
      },
      { fieldProps: { name: "email", label: "Email" } },
      {
        fieldProps: {
          name: "password",
          label: "Password",
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
    <Grid item xs={12} {...wrapperProps?.gridSizes}>
      <TextField
        key={name}
        fullWidth
        error={errors[fieldProps?.name]}
        helperText={errors[fieldProps?.name]?.message}
        {...register(fieldProps?.name)}
        {...fieldProps}
      />
    </Grid>
  ));

  return (
    <Box
      sx={{
        my: 1,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Welcome to FTM App
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {formFields}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
        >
          Register
        </Button>
        <Grid container sx={{ mb: 3 }}>
          <Grid item>
            <Link to={APP_ROUTES.LOGIN}>Already have an account? Sign In</Link>
          </Grid>
        </Grid>
        <UserFormFooter />
      </Box>
    </Box>
  );
}

export default LoginFormView;
