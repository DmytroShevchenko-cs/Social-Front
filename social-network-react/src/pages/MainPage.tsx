import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { checkAuth } from "../services/authService";

const MainPage = () => {
  const isAuth = checkAuth();

  return (
    <>
      {!isAuth ? (
        <Navigate to='/auth' replace={true} />
      ) : (
        <div>
          <h1>BAN MAIN PAGE</h1>
        </div>
      )}
    </>
  );
};

export default MainPage;
