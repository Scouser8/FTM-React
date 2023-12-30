import { useState } from "react";
import FlightTickets from "../Flights";
import HomeHeader from "./HomeHeader";
import FlightTicketFormContainer from "../Forms/FlightTicketForm";
import { Box } from "@mui/material";

export default function Home() {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);

  const openFormDialog = () => setIsFormDialogOpen(true);

  const closeFormDialog = () => setIsFormDialogOpen(false);

  return (
    <Box sx={{ px: 10, py: 5 }}>
      <HomeHeader openTicketForm={openFormDialog} />
      <FlightTickets />
      {isFormDialogOpen && (
        <FlightTicketFormContainer
          isFormDialogOpen={isFormDialogOpen}
          handleCloseFormDialog={closeFormDialog}
        />
      )}
    </Box>
  );
}
