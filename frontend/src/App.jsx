import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SignupPage from "./pages/SignupPage";
import "./App.css";
import Sidebar  from "./components/Sidebar";

function App() {
  const isLoggedIn = true; // later you’ll replace this with real check

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/sidebar"
        element={isLoggedIn ? <Sidebar /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/sidebar" element={<Sidebar />}></Route>
    </Routes>
  );
}

export default App;




