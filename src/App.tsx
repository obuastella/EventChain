import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/LandingPage";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import CivicProviderWrapper from "./components/CivicProviderWrapper";
import Discover from "./pages/Discover/Discover";
import MyTickets from "./pages/MyTickets/MyTickets";
import ManageEvents from "./pages/ManageEvents/ManageEvents";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSyncUserToFirestore } from "./helpers/useSyncUserToFirestore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  useSyncUserToFirestore();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <CivicProviderWrapper>
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
              <Route
                path="/discover"
                element={
                  <Layout>
                    <Discover />
                  </Layout>
                }
              />
              <Route
                path="/my-tickets"
                element={
                  <Layout>
                    <MyTickets />
                  </Layout>
                }
              />
              <Route
                path="/manage"
                element={
                  <Layout>
                    <ManageEvents />
                  </Layout>
                }
              />
            </Routes>

            <ToastContainer />
          </CivicProviderWrapper>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
