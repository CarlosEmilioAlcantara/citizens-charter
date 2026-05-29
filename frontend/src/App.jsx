import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Charter from "./pages/Charter";
import CharterPDF from "./pages/CharterPDF";
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
              exact
            />
            <Route
              element={
                <ProtectedRoute>
                  <Charter />
                </ProtectedRoute>
              }
              path="/charter"
              exact
            />
            <Route
              element={
                <ProtectedRoute>
                  <CharterPDF />
                </ProtectedRoute>
              }
              path="/charter-pdfs"
              exact
            />

            <Route element={<Login />} path="/login" />
            <Route element={<Home />} path="/" />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
