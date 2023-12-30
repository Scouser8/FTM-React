import { useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Field } from "../../../types/form.types";

import TextField from "@mui/material/TextField";

import FlightTicketFormView from "./FlightTicketFormView";
import flightTicketSchema from "../../../utils/form/validationSchema/FlightTicketSchema";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AppDispatch, FlightTicket } from "../../../types/store.types";
import { useDispatch, useSelector } from "react-redux";
import {
  createFlightTicket,
  getFlightTickets,
  updateFlightTicket,
} from "../../../store/flightTicketsSlice";
import { flightTicketsSelector } from "../../../store/selectors/flightTickets";
import {
  FLIGHT_TICKETS_CREATED_SUCCESSFULLY,
  FLIGHT_TICKETS_UPDATED_SUCCESSFULLY,
} from "../../../constants/thunk-status";

const FORM_TITLE = "Book your ticket for next flight!";
const SUBMIT_BUTTON_TEXT = "Book";

type FormValues = {
  flightCode: string;
  date?: dayjs.Dayjs;
  capacity: number;
};

type Props = {
  isFormDialogOpen: boolean;
  handleCloseFormDialog: () => void;
  editMode?: boolean;
  ticketToEdit?: FlightTicket;
  afterFormSubmission?: () => void;
};

export default function FlightTicketFormContainer(props: Props) {
  const {
    isFormDialogOpen,
    handleCloseFormDialog,
    editMode = false,
    ticketToEdit,
    afterFormSubmission,
  } = props;
  const defaultValues: FormValues = useMemo(
    () => ({
      flightCode: ticketToEdit?.flightCode || "",
      date: ticketToEdit?.date
        ? dayjs(ticketToEdit?.date, "DD/MM/YYYY")
        : dayjs(),
      capacity: ticketToEdit?.capacity || 200,
    }),
    []
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(flightTicketSchema),
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const { status } = useSelector(flightTicketsSelector);

  useEffect(() => {
    if (
      status === FLIGHT_TICKETS_CREATED_SUCCESSFULLY ||
      status === FLIGHT_TICKETS_UPDATED_SUCCESSFULLY
    ) {
      dispatch(getFlightTickets());
      afterFormSubmission?.();
      handleCloseFormDialog();
    }
  }, [status]);

  const handleToggleShowPassword = () =>
    setShowPassword((prevState) => !prevState);

  const onSubmit = (data: FormValues) => {
    const dateString = dayjs(data.date).format("DD/MM/YYYY");
    const payload: FlightTicket = { ...data, date: dateString };
    if (editMode && ticketToEdit?.id) {
      dispatch(
        updateFlightTicket({ flightTicket: payload, id: ticketToEdit?.id })
      );
    } else {
      dispatch(createFlightTicket(payload));
    }
  };

  const fields: Field<FormValues>[] = useMemo(
    () => [
      { fieldProps: { name: "flightCode", label: "Flight Code" } },
      {
        fieldProps: {
          name: "date",
          label: "Date",
          type: "date",
          defaultValue: defaultValues.date,
        },
      },
      {
        fieldProps: {
          name: "capacity",
          label: "Capacity",
          type: "number",
        },
      },
    ],
    [showPassword, handleToggleShowPassword]
  );

  const formFields = fields?.map(({ fieldProps }) =>
    fieldProps.type === "date" ? (
      <DatePicker
        key={fieldProps?.name}
        slotProps={{
          textField: {
            fullWidth: true,
            error: !!errors[fieldProps?.name],
            helperText: errors[fieldProps?.name]?.message,
            margin: "normal",
            ...register(fieldProps?.name),
          },
        }}
        {...fieldProps}
      />
    ) : (
      <TextField
        key={fieldProps?.name}
        fullWidth
        error={!!errors[fieldProps?.name]}
        helperText={errors[fieldProps?.name]?.message}
        margin="normal"
        {...register(fieldProps?.name)}
        {...fieldProps}
      />
    )
  );

  return (
    <FlightTicketFormView
      isFormDialogOpen={isFormDialogOpen}
      handleCloseFormDialog={handleCloseFormDialog}
      handleSubmit={handleSubmit(onSubmit)}
      fields={formFields}
      formDialogTitle={FORM_TITLE}
      formDialogSubmitText={SUBMIT_BUTTON_TEXT}
    />
  );
}
