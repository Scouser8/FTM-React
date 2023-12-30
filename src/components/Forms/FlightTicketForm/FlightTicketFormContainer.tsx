import { useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Field } from "../../../types/form.types";

import TextField from "@mui/material/TextField";

import AddFlightTicketFormView from "./FlightTicketFormView";
import flightTicketSchema from "../../../utils/form/validationSchema/FlightTicketSchema";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FlightTicket } from "../../../types/store.types";

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

  const handleToggleShowPassword = () =>
    setShowPassword((prevState) => !prevState);

  const onSubmit = (data: FormValues) => {
    console.log(data);
    const dateString = dayjs(data.date).format("DD/MM/YYYY");
    console.log("dateString", dateString);
    const dateFromString = dayjs(dateString, "DD/MM/YYYY");
    console.log("dateFromString", dateFromString);
    if (editMode) {
      console.log("Edited");
    } else {
      console.log("Added");
    }
    afterFormSubmission?.();
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
    <AddFlightTicketFormView
      isFormDialogOpen={isFormDialogOpen}
      handleCloseFormDialog={handleCloseFormDialog}
      handleSubmit={handleSubmit(onSubmit)}
      fields={formFields}
      formDialogTitle={FORM_TITLE}
      formDialogSubmitText={SUBMIT_BUTTON_TEXT}
    />
  );
}
