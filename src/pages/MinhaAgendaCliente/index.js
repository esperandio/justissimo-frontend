import React from "react";
import Header from "../Main/Header";
import Footer from "../Main/Footer";
import { CssBaseline, Container } from "@material-ui/core/";
import { TitlePage } from "../../components/Utils/title";

export default function MinhaAgenda() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <TitlePage internal="Minha Agenda" />
      </Container>
      <Footer />
    </>
  );
}