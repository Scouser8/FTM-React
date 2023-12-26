import { Grid, Paper } from "@mui/material";
import { Route, UserAuthForms } from "../../../types/router.types";
import { APP_ROUTES } from "../../../constants/routes";
import Register from "./Register";
import Login from "./Login";

type Props = {
  route: Route;
};

const userAuthForms: UserAuthForms = {
  [APP_ROUTES.REGISTER]: <Register />,
  [APP_ROUTES.LOGIN]: <Login />,
};

function UserAuthentication(props: Props) {
  const { route } = props;
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
