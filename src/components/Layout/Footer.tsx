import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import footerStyles from "../../styles/footer.styles";

function Footer() {
  const theme = useTheme();
  return (
    <Box component="footer" sx={footerStyles(theme)}>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="body1">
          Senior Frontend Developer Task (Giza Systems) -
          mohammed.abdelbaki96@hotmail.com © 2023
        </Typography>
        {/* <Copyright /> */}
      </Container>
    </Box>
  );
}

export default Footer;
