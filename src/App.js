import { useContext, Loading, lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoadingSpinner from "./components/Widgets/LoadingSpinner/LoadingSpinner";
import HomePage from "./Pages/HomePage/HomePage";
import AuthContext from "./store/AuthContext";

const LoginPage = lazy(() => import("./Pages/Login/LoginPage"));
const RegisterPage = lazy(() => import("./Pages/Register/RegisterPage"));

function App() {
  const { isAuth } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!isAuth) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
