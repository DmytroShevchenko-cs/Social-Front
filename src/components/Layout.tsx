import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Container from "@mui/material/Container";

import styles from "../scss/layout.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const mainContent = (
  <>
    <Header />
    <Container classes={{ root: styles.mainContainer }}>
      <Outlet />
    </Container>
    <Footer />
  </>
);

export const AuthLayout = () => {
  var isAuth = useSelector((selector: RootState) => selector.auth.isAuth);

  if (!isAuth) {
    return (<Navigate to='/auth' replace = {true}/>);
  }

  return (
    <>
      {mainContent}
    </>
  );
};

export const Layout = () => {
  var isAuth = useSelector((selector: RootState) => selector.auth.isAuth);

  if(isAuth) {
    return (<Navigate to='/' replace = {true}/>);
  }

  return(
    <>
    {mainContent}
    </>
  )
}