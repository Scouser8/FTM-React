import { Card, Typography } from "@mui/material";

type Props = { flightCode: string; date: string; capacity: number | string };

export default function FlightTicketCard(props: Props) {
  const { flightCode, date, capacity } = props;
  return (
    <Card sx={{ width: "fit-content", px: 5, py: 6 }}>
      <Typography>Flight Code: {flightCode}</Typography>
      <Typography>Date: {date}</Typography>
      <Typography>Capacity: {capacity}</Typography>
    </Card>
  );
}
