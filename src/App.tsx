import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Routes from "./router/Routes";

function App() {
  return (
    <Router>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  );
}

export default App;
