import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./pages/Login";
import TestPage from "./pages/Test";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <TestPage />
                </ProtectedRoute>
              }
              path="/"
              exact
            />
            <Route element={<Login />} path="/login" />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
