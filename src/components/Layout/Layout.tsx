import { useSelector } from "react-redux";

import { getUserSelector } from "../../store/selectors/user";

import { Box } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";
import Snackbar from "../Snackbar";
import { snackbarValuesSelector } from "../../store/selectors/snackbar";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  const { children } = props;
  const { user } = useSelector(getUserSelector);
  const snackbarValues = useSelector(snackbarValuesSelector);

  return (
    <>
      {user && <Header />}
      <Box component="main">{children}</Box>
      {user && <Footer />}
      {snackbarValues.message && <Snackbar {...snackbarValues} />}
    </>
  );
}
