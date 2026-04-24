import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SignupPage from "./pages/SignupPage";
import "./App.css";
import Sidebar  from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { useSocket } from "./hooks/useSocket"
import ChatsList from "./components/ChatsList";
import ChatPage from "./pages/ChatPage";

function App() {
  const isLoggedIn = true; // later you’ll replace this with real check
  useSocket(); //used globally for listeners

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/chat"
        element={isLoggedIn ? <ChatPage /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      {/* <Route path="/sidebar" element={<Sidebar />}></Route>
      <Route path="/chatWindow/:userId" element={<ChatWindow/>}></Route> */}
      <Route path="/chat" element={<ChatPage/>}/>
      
    </Routes>
  );
}

export default App;




