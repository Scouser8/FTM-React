import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Routes from "./router/Routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <Router>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Layout>
          <Routes />
        </Layout>
      </LocalizationProvider>
    </Router>
  );
}

export default App;
