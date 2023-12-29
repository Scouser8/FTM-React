import { useSelector } from "react-redux";

import { getUser } from "../../store/selectors/user";

import { Box } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  const { children } = props;
  const { user } = useSelector(getUser);
  console.log("User:", user);
  return (
    <>
      {user && <Header />}
      <Box component="main" sx={{ px: 10, py: 5 }}>
        {children}
      </Box>
      {user && <Footer />}
    </>
  );
}
