import React, { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import FlightTicketCard from "./FlightTicketCard";
import ConfirmationDialog from "../ConfirmationDialog";
import { AppDispatch, FlightTicket } from "../../types/store.types";
import FlightTicketFormContainer from "../Forms/FlightTicketForm";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFlightTicket,
  getFlightTickets,
} from "../../store/flightTicketsSlice";
import { flightTicketsSelector } from "../../store/selectors/flightTickets";
import {
  FLIGHT_TICKETS_DELETED_SUCCESSFULLY,
  FLIGHT_TICKETS_INITIAL,
} from "../../constants/thunk-status";
import { showSnackbar } from "../../store/actions/snackbar";
import { INFO, SUCCESS } from "../../constants/snack-status";

const DELETE_CONFIRMATION_MESSAGE =
  "Are you sure you want to delete this Ticket?";

export default function FlightTickets() {
  const [selectedTicket, setSelectedTicket] = useState<FlightTicket>();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const { flightTickets, status } = useSelector(flightTicketsSelector);

  useEffect(() => {
    if (
      status === FLIGHT_TICKETS_INITIAL ||
      status === FLIGHT_TICKETS_DELETED_SUCCESSFULLY
    ) {
      dispatch(getFlightTickets());
      handleCloseDeleteDialog();
    }
  }, [status]);

  const handleOpenEditDialog = () => setIsEditDialogOpen(true);
  const handleCloseEditDialog = () => {
    setSelectedTicket(undefined);
    setIsEditDialogOpen(false);
  };

  const onEditSuccess = () => {
    dispatch(
      showSnackbar({
        message: "Ticket Updated Successfully!",
        status: SUCCESS,
      })
    );
    handleCloseEditDialog();
  };

  const handleOpenDeleteDialog = () => setIsDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => {
    setSelectedTicket(undefined);
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteSubmit = () => {
    if (selectedTicket?.id) {
      dispatch(deleteFlightTicket(selectedTicket?.id))
        .unwrap()
        .then(() => {
          dispatch(
            showSnackbar({
              message: "Ticket Deleted Successfully",
              status: INFO,
            })
          );
        });
    }
  };

  const tickets = flightTickets?.map((ticket) => (
    <FlightTicketCard
      key={ticket.flightCode}
      ticket={ticket}
      setSelectedTicket={setSelectedTicket}
      openEditDialog={handleOpenEditDialog}
      openDeleteConfitmation={handleOpenDeleteDialog}
    />
  ));

  const noFlightsBookedYet = (
    <Typography variant="h5">There are no Flights booked yet!</Typography>
  );
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {tickets?.length ? tickets : noFlightsBookedYet}
      </Box>
      {isEditDialogOpen && selectedTicket && (
        <FlightTicketFormContainer
          isFormDialogOpen={isEditDialogOpen}
          handleCloseFormDialog={handleCloseEditDialog}
          editMode
          ticketToEdit={selectedTicket}
          afterFormSubmission={onEditSuccess}
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
