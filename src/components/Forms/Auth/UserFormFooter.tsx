import Typography from "@mui/material/Typography";

function UserFormFooter() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}&nbsp; Senior Frontend Developer Task (Giza
      Systems) mohammed.abdelbaki96@hotmail.com
    </Typography>
  );
}

export default UserFormFooter;
