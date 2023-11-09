import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Container from "@mui/material/Container";

import styles from "../css/layout.module.css";

export const Layout = () => {
  return (
    <>
      <Header />
      <Container classes={{ root: styles.mainContainer }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};
