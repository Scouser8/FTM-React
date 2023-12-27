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
  fields: JSX.Element[];
  handleSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
};

function LoginFormView(props: Props) {
  const { fields, handleSubmit } = props;

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
          {fields}
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
