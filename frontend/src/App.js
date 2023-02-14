// Router
import { BrowserRouter as Router, Routes, Route, redirect } from "react-router-dom";
// Components
import Layout from "./components/layout/Layout";
import AuthGuard from "./components/AuthGuard";

// Pages
import Dashboard from "./pages/dashboard";
import SignIn from "./pages/login";
import CallCenter from "./pages/call-center";
import NotFound from "./pages/404";

// Auth
import { AuthContextProvider } from "./hooks/firebaseAuth";
import CallHistory from "./pages/call-history";


export default function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />

          <Route path="/dashboard" element={<AuthGuard> <Layout page={<Dashboard />}/> </AuthGuard>} />
          <Route path="/call-center" element={<AuthGuard> <Layout page={<CallCenter />} /> </AuthGuard>} />
          <Route path="/call-history" element={<AuthGuard> <Layout page={<CallHistory />} /> </AuthGuard>} />
          <Route path="*" element={<AuthGuard> <Layout page={<NotFound />} /> </AuthGuard>} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}
