import React from "react";
import Header from "../Main/Header";
import { ValidarAutenticacaoCliente } from "../../components/ValidarAutenticacao";
import { Container, Link, Grid } from "@material-ui/core/";
import { TitlePage } from "../../components/Utils/title";
import { 
  Typography,
  Chip,
  Divider
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

export default function MinhasDivulgacoes() {
  return (
    <>
      <ValidarAutenticacaoCliente />
      <Header />
      <Container maxWidth="lg">
        <TitlePage internal="Minhas Divulgações" />

        <Grid container>
          <Grid item xs={12}>
            <Chip variant="outlined" color="primary" size="small" icon={<EventAvailableIcon />} label="28/09/2022" />
            <br />
            <br />
            <Link href="/cliente/minhas-divulgacoes" variant="h6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </Link>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate id culpa quis in fugit nobis officiis expedita commodi dicta odit distinctio veniam ...
            </Typography>
            <br />
            <Chip label="Direito Empresarial" />
          </Grid>
        </Grid>

        <br />
        <Divider />
        <br />
      </Container>
    </>
  );
}