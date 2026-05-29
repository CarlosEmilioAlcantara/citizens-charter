import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sectors from "./pages/Sectors";
import Charter from "./pages/Charter";
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
