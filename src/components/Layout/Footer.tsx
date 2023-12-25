import { Box, Container, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 0.5,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
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
