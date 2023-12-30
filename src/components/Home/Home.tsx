import { useState } from "react";
import FlightTickets from "../Flights";
import AddFlightTicketFormContainer from "../Forms/AddFlightTicketForm";
import HomeHeader from "./HomeHeader";

export default function Home() {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);

  const openFormDialog = () => setIsFormDialogOpen(true);

  const closeFormDialog = () => setIsFormDialogOpen(false);

  return (
    <>
      <HomeHeader openTicketForm={openFormDialog} />
      <FlightTickets />
      {isFormDialogOpen && (
        <AddFlightTicketFormContainer
          isFormDialogOpen={isFormDialogOpen}
          handleCloseFormDialog={closeFormDialog}
        />
      )}
    </>
  );
}
