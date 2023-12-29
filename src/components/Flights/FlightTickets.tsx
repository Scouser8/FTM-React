import { Box } from "@mui/material";
import FlightTicketCard from "./FlightTicketCard";

const flightTickets = [
  { flightCode: "150", date: "30/12/2023", capacity: 200 },
  { flightCode: "151", date: "01/01/2024", capacity: 300 },
  { flightCode: "152", date: "01/01/2024", capacity: 150 },
  { flightCode: "153", date: "02/01/2024", capacity: 220 },
  { flightCode: "154", date: "05/01/2024", capacity: 250 },
  { flightCode: "155", date: "06/01/2024", capacity: 180 },
];

export default function FlightTickets() {
  const tickets = flightTickets.map((ticket) => (
    <FlightTicketCard
      flightCode={ticket.flightCode}
      date={ticket.date}
      capacity={ticket.capacity}
    />
  ));
  return (
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent:'center' }}>{tickets}</Box>
  );
}
