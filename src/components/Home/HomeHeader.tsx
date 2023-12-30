import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type Props = { openTicketForm: () => void };

function HomeHeader(props: Props) {
  const { openTicketForm } = props;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Welcome To Flight Ticket Management App
      </Typography>
      <Button
        variant="outlined"
        color="success"
        startIcon={<AddIcon />}
        onClick={openTicketForm}
      >
        Add New Ticket
      </Button>
    </Box>
  );
}

export default HomeHeader;
