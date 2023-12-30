import { useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Field } from "../../../types/form.types";

import TextField from "@mui/material/TextField";

import AddFlightTicketFormView from "./AddFlightTicketFormView";
import flightTicketSchema from "../../../utils/form/validationSchema/FlightTicketSchema";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const FORM_TITLE = "Book your ticket for next flight!";
const SUBMIT_BUTTON_TEXT = "Book";

type FormValues = {
  flightCode: string;
  date?: dayjs.Dayjs;
  capacity: number;
};

const defaultValues: FormValues = {
  flightCode: "",
  date: dayjs(),
  capacity: 200,
};

type Props = {
  isFormDialogOpen: boolean;
  handleCloseFormDialog: () => void;
};

export default function AddFlightTicketFormContainer(props: Props) {
  const { isFormDialogOpen, handleCloseFormDialog } = props;
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
