import { Link } from "react-router-dom";

import { APP_ROUTES } from "../../../../constants/routes";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiLink from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import UserFormFooter from "../UserFormFooter";

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
        my: 8,
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
        {fields}
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container sx={{ mb: 3 }}>
          <Grid item xs>
            <MuiLink href="#" variant="body2">
              Forgot password?
            </MuiLink>
          </Grid>
          <Grid item>
            <Link to={APP_ROUTES.REGISTER}>Don't have an account? Sign Up</Link>
          </Grid>
        </Grid>
        <UserFormFooter />
      </Box>
    </Box>
  );
}

export default LoginFormView;
