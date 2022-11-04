import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/Login/LoginPage";
import RegisterPage from "./Pages/Register/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
