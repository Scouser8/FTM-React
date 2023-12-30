import React, { useState } from "react";

import { Box } from "@mui/material";
import FlightTicketCard from "./FlightTicketCard";
import ConfirmationDialog from "../ConfirmationDialog";
import { FlightTicket } from "../../types/store.types";
import FlightTicketFormContainer from "../Forms/FlightTicketForm";

const flightTickets: FlightTicket[] = [
  { flightCode: "150", date: "30/12/2023", capacity: 200 },
  { flightCode: "151", date: "01/01/2024", capacity: 300 },
  { flightCode: "152", date: "01/01/2024", capacity: 150 },
  { flightCode: "153", date: "02/01/2024", capacity: 220 },
  { flightCode: "154", date: "05/01/2024", capacity: 250 },
  { flightCode: "155", date: "06/01/2024", capacity: 180 },
];

const DELETE_CONFIRMATION_MESSAGE =
  "Are you sure you want to delete this Ticket?";

export default function FlightTickets() {
  const [selectedTicket, setSelectedTicket] = useState<FlightTicket | null>();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const handleOpenEditDialog = () => setIsEditDialogOpen(true);
  const handleCloseEditDialog = () => {
    setSelectedTicket(null);
    setIsEditDialogOpen(false);
  };

  const handleOpenDeleteDialog = () => setIsDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => {
    setSelectedTicket(null);
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteSubmit = () => {
    handleCloseDeleteDialog();
  };

  const tickets = flightTickets.map((ticket) => (
    <FlightTicketCard
      key={ticket.flightCode}
      ticket={ticket}
      setSelectedTicket={setSelectedTicket}
      openEditDialog={handleOpenEditDialog}
      openDeleteConfitmation={handleOpenDeleteDialog}
    />
  ));
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>{tickets}</Box>
      {isEditDialogOpen && selectedTicket && (
        <FlightTicketFormContainer
          isFormDialogOpen={isEditDialogOpen}
          handleCloseFormDialog={handleCloseEditDialog}
          editMode
          ticketToEdit={selectedTicket}
          afterFormSubmission={handleCloseEditDialog}
        />
      )}
      <ConfirmationDialog
        isDialogOpen={isDeleteDialogOpen}
        handleDialogClose={handleCloseDeleteDialog}
        handleSubmit={handleDeleteSubmit}
        confirmationMessage={DELETE_CONFIRMATION_MESSAGE}
      />
    </React.Fragment>
  );
}
