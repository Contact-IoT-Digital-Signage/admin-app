// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Layout from "./components/layout/Layout";

// Pages
import Dashboard from "./pages/dashboard";
import SignIn from "./pages/login";
import CallCenter from "./pages/call-center";
import NotFound from "./pages/404";

// Firebase
import { initializeApp } from "firebase/app";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyAy9uKW7aqTofvACspzDl2Y4HnoyqjDqOY",
      authDomain: "developerweek2023.firebaseapp.com",
      projectId: "developerweek2023",
      storageBucket: "developerweek2023.appspot.com",
      messagingSenderId: "731214157690",
      appId: "1:731214157690:web:eb8fe6badb2c4d9051e8c3",
    };

    const app = initializeApp(firebaseConfig);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />

        <Route path="/dashboard" element={<Layout page={<Dashboard />} />} />
        <Route path="/call-center" element={<Layout page={<CallCenter />} />} />
        <Route path="*" element={<Layout page={<NotFound />} />} />
      </Routes>
    </Router>
  );
}
