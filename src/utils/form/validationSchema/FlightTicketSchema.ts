import { number, object, string } from "yup";

const flightTicketSchema = object({
  flightCode: string().required(),
  capacity: number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .required()
    .integer()
    .min(20)
    .max(850),
});

export default flightTicketSchema;
