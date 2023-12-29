import { useSelector } from "react-redux";

import { getUser } from "../../store/selectors/user";

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
      {children}
      {user && <Footer />}
    </>
  );
}
