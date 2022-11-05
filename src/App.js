import { lazy, useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthContext from "./store/AuthContext";
import HomePage from "./Pages/HomePage/HomePage";

const LoginPage = lazy(() => import("./Pages/Login/LoginPage"));
const RegisterPage = lazy(() => import("./Pages/Register/RegisterPage"));

function App() {
  const auth = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!auth.isAuth) {
      return <Navigate to="/login" />;
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
