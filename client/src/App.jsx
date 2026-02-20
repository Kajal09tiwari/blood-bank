import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterDonor from "./pages/RegisterDonor";
import RegisterRecipient from "./pages/RegisterRecipient";
import DashboardDonor from "./pages/DashboardDonor";
import DashboardRecipient from "./pages/DashboardRecipient";
import RecipientForm from "./pages/RecipientForm";
import DonorForm from "./pages/DonorForm";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";



import HospitalLogin from "./pages/HospitalLogin";
import HospitalDashboard from "./pages/HospitalDashboard";



// ✅ Protected Route Component
const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // not logged in
    window.location.href = "/login";
    return null;
  }

  if (role && user.role !== role) {
    // logged in with wrong role
    window.location.href = "/";
    return null;
  }

  return children;
};

// ✅ App Component with Routing
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/donor" element={<RegisterDonor />} />
        <Route path="/register/recipient" element={<RegisterRecipient />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/FAQ" element={<FAQ />} />


        <Route path="/hospital/login" element={<HospitalLogin />} />
        <Route path="/hospital/dashboard" element={<HospitalDashboard />} />

        {/* Protected Routes for Donor */}
        <Route
          path="/dashboard/donor"
          element={
            <ProtectedRoute role="donor">
              <DashboardDonor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor-form"
          element={
            <ProtectedRoute role="donor">
              <DonorForm />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes for Recipient */}
        <Route
          path="/dashboard/recipient"
          element={
            <ProtectedRoute role="recipient">
              <DashboardRecipient />
            </ProtectedRoute>
          }
        />

<Route path="/DashboardRecipient" element={<DashboardRecipient />} />
        <Route
          path="/recipient-form"
          element={
            <ProtectedRoute role="recipient">
              <RecipientForm />
            </ProtectedRoute>
          }
        />
      </Routes>


     
    </Router>
  );
}

export default App;
