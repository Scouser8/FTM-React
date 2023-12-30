import { useDispatch, useSelector } from "react-redux";

import { Route, UserAuthForms } from "../../../types/router.types";
import { APP_ROUTES } from "../../../constants/routes";

import { getUserSelector } from "../../../store/selectors/user";

import { Grid, Paper } from "@mui/material";

import Register from "./Register";
import Login from "./Login";
import { Navigate } from "react-router-dom";
import {
  USER_LOGIN_SUCCESSFUL,
  USER_REGISTRATION_SUCCESSFUL,
} from "../../../constants/thunk-status";
import { showSnackbar } from "../../../store/actions/snackbar";
import { ERROR, SUCCESS } from "../../../constants/snack-status";

type Props = {
  route: Route;
};

const userAuthForms: UserAuthForms = {
  [APP_ROUTES.REGISTER]: <Register />,
  [APP_ROUTES.LOGIN]: <Login />,
};

const notifierMessage = {
  login: "Logged In Successfully",
  register: "Account created successfully, welcome to FTP",
};

function UserAuthentication(props: Props) {
  const { route } = props;
  const { user, status, error } = useSelector(getUserSelector);
  const dispatch = useDispatch();

  const loggedInSuccessfully = status === USER_LOGIN_SUCCESSFUL;
  const registeredSuccessfully = status === USER_REGISTRATION_SUCCESSFUL;

  if (loggedInSuccessfully || registeredSuccessfully) {
    const message = loggedInSuccessfully
      ? notifierMessage.login
      : notifierMessage.register;
    dispatch(showSnackbar({ message: message, status: SUCCESS }));
  } else if (error) {
    dispatch(showSnackbar({ message: error, status: ERROR }));
  }

  if (user) {
    return <Navigate to={APP_ROUTES.HOME} replace />;
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={6}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
        {userAuthForms[route]}
      </Grid>
    </Grid>
  );
}

export default UserAuthentication;
