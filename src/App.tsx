import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import { AuthLayout, Layout } from "./components/Layout";

import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route index element={<MainPage />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
