import { useState } from "react";
import FlightTickets from "../Flights";
import HomeHeader from "./HomeHeader";
import FlightTicketFormContainer from "../Forms/FlightTicketForm";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../store/actions/snackbar";
import { SUCCESS } from "../../constants/snackbar";

export default function Home() {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const openFormDialog = () => setIsFormDialogOpen(true);

  const closeFormDialog = () => setIsFormDialogOpen(false);

  const onBookTicketSuccess = () => {
    dispatch(
      showSnackbar({
        message: "Ticket Created Successfully!",
        status: SUCCESS,
      })
    );
    closeFormDialog();
  };

  return (
    <Box sx={{ px: 10, py: 5, minHeight: "90vh" }}>
      <HomeHeader openTicketForm={openFormDialog} />
      <FlightTickets />
      {isFormDialogOpen && (
        <FlightTicketFormContainer
          isFormDialogOpen={isFormDialogOpen}
          handleCloseFormDialog={closeFormDialog}
          afterFormSubmission={onBookTicketSuccess}
        />
      )}
    </Box>
  );
}
