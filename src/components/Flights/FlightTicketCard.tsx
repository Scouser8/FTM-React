import { Box, Button, Card, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = { flightCode: string; date: string; capacity: number | string };

export default function FlightTicketCard(props: Props) {
  const { flightCode, date, capacity } = props;
  return (
    <Card sx={{ width: "fit-content", px: 3, py: 6 }}>
      <Typography>
        <b>Flight Code:</b> {flightCode}
      </Typography>
      <Typography>
        <b>Date:</b> {date}
      </Typography>
      <Typography>
        <b>Capacity:</b> {capacity}
      </Typography>
      <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
        <Button variant="outlined" startIcon={<EditIcon />}>
          Edit
        </Button>
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </Box>
    </Card>
  );
}
