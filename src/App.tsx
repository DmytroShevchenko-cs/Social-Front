import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { AuthLayout, Layout } from "./components/Layout";

import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import RegisterPage from "./pages/RegisterPage";
import TranslatePage from "./pages/TranslationPage";
import Chats from "./pages/Chats";
import Groups from "./pages/Groups";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route index element={<MainPage />} />
        <Route path='/groups' index element={<Groups />} />
        <Route path='/chats' index element={<Chats />} />
        <Route path='/notifications' index element={<Notifications />} />
        <Route path='/profile' index element={<Profile />} />
        <Route path='/trans' index element={<TranslatePage />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
