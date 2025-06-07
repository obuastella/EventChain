import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/LandingPage";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
