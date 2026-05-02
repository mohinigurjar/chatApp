import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useSocket } from "./hooks/useSocket"
import { useAuthStore } from "./store/authStore"
import ChatPage from "./pages/ChatPage";
import "./App.css";


function App() {
  const { currentUser, loading, checkAuth, initialized } = useAuthStore();
  
  useSocket(); //used globally for listeners

  useEffect(()=> {
    checkAuth();
  }, [])

  console.log("initialized is", initialized);

  if (!initialized) return <div>Loading...</div>;

  return (
    <Routes>

      <Route 
        path="/login" 
        element={currentUser ? <Navigate to="/chat" replace /> : <LoginPage />} 
      />

      <Route
        path="/signup"
        element={currentUser ? <Navigate to="/chat" replace /> : <SignupPage />}
      />

      <Route
        path="/chat"
        element={currentUser ? <ChatPage /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<Navigate to="/login" />} />      
    </Routes>
  );
}

export default App;




