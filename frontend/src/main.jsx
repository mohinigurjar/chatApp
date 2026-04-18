import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChatProvider } from "./context/ChatContext"; 
import App from "./App";
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(

  <ChatProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChatProvider>
  
  
);
