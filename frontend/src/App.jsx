import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Charter from "./pages/Charter";
import Sectors from "./pages/Sectors";
import Offices from "./pages/Offices";
import Positions from "./pages/Positions";
import Users from "./pages/Users";
import CharterAudit from "./pages/CharterAudit";
import AdminAudit from "./pages/AdminAudit";
import CharterPDFs from "./pages/CharterPDFs";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
              path="/dashboard"
            />
            <Route
              element={
                <ProtectedRoute>
                  <Charter />
                </ProtectedRoute>
              }
              path="/charter"
            />
            <Route
              element={
                <ProtectedRoute>
                  <Sectors />
                </ProtectedRoute>
              }
              path="/sectors"
            />
            <Route
              element={
                <ProtectedRoute>
                  <Offices />
                </ProtectedRoute>
              }
              path="/offices"
            />
            <Route
              element={
                <ProtectedRoute>
                  <Positions />
                </ProtectedRoute>
              }
              path="/positions"
            />
            <Route
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
              path="/users"
            />
            <Route
              element={
                <ProtectedRoute>
                  <CharterAudit />
                </ProtectedRoute>
              }
              path="/charter-audit"
            />
            <Route
              element={
                <ProtectedRoute>
                  <AdminAudit />
                </ProtectedRoute>
              }
              path="/admin-audit"
            />
            <Route
              element={
                <ProtectedRoute>
                  <CharterPDFs />
                </ProtectedRoute>
              }
              path="/charter-pdfs"
            />

            <Route element={<Login />} path="/login" />
            <Route element={<Home />} path="/" />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
