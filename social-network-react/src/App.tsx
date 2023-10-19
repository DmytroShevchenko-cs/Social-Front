import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import { Layout } from "./components/Layout";

import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import RegisterPage from "./pages/RegisterPage";

import { checkAuth } from "./services/authService";
import BebraPage from "./pages/BebraPage";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!checkAuth()) {
      navigate("/auth");
    }
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path='/bebra' element={<BebraPage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
