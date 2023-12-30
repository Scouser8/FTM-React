import { Box, Button, Typography } from "@mui/material";
import headerStyles from "../../styles/header.styles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/store.types";
import { logout } from "../../store/actions/user";

function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Box sx={headerStyles}>
      <Typography>Flight Ticket Management App</Typography>
      <Button variant="outlined" color="warning" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}

export default Header;
