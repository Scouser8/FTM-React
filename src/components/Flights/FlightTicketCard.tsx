import { Box, Button, Card, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FlightTicket } from "../../types/store.types";

type Props = {
  ticket: FlightTicket;
  setSelectedTicket: (ticket: FlightTicket) => void;
  openEditDialog: () => void;
  openDeleteConfitmation: () => void;
};

export default function FlightTicketCard(props: Props) {
  const { ticket, setSelectedTicket, openEditDialog, openDeleteConfitmation } =
    props;
  const { flightCode, date, capacity } = ticket;

  const handleEditTicket = () => {
    setSelectedTicket(ticket);
    openEditDialog();
  };
  const handleDeleteTicket = () => {
    setSelectedTicket(ticket);
    openDeleteConfitmation();
  };
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
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={handleEditTicket}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteTicket}
        >
          Delete
        </Button>
      </Box>
    </Card>
  );
}
