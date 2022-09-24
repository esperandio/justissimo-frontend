import React, { useState, useEffect } from "react";
import Header from "../Main/Header";
import Footer from "../Main/Footer";
import { CssBaseline, Container, Grid } from "@material-ui/core/";
import { TitlePage } from "../../components/Utils/title";
import { 
  Button, 
  Stack, 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { ClientService } from "../../services";

export default function MinhaAgenda() {
  const [agendas, setAgendas] = useState([]); 
  
  useEffect(() => {
    async function buscarInformacoesAgendaAdvogado() {
      const id = parseInt(sessionStorage.getItem("id_cliente"));

      const resultado = await ClientService.getAllSchedulings(id);

      setAgendas(resultado.data);
    }

    buscarInformacoesAgendaAdvogado();
  }, []);

  const [dias] = useState(["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]);

  function formatDate(date) {
    date = new Date(date);

    return `${date.getUTCDate()}`.padStart(2, 0)
      + "-"
      + `${date.getUTCMonth() + 1}`.padStart(2, 0)
      + "-"
      + `${date.getUTCFullYear()}`;
  }

  function formatDia(date) {
    const data = new Date(date);
    return dias[data.getUTCDay()];
  }

  function formatTime(date) {
    return `${date.getUTCHours()}`.padStart(2, "0") + ":" + `${date.getUTCMinutes()}`.padStart(2, "0")
  }

  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <TitlePage internal="Minha Agenda" />
        <Stack
          direction={{ xs: "column", sm: "row" }} 
          spacing={2}
        >
          <Button variant="contained" startIcon={<FilterAltIcon />} onClick={ () => {} }>
            Filtro
          </Button>
        </Stack>

        <br />
        
        {agendas.map((agenda) => (
          <Grid key={agenda.id_agenda} container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Stack
                    direction={{ xs: "column", md: "row" }} 
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Typography variant="h6" component="div">
                      <b>{agenda.advogado.nome}</b>
                    </Typography>
                    <Typography variant="h6" component="div">
                      <b>Causa: {agenda.area_atuacao}</b>
                    </Typography>
                  </Stack>

                  <Typography gutterBottom variant="h7" component="div">
                    <b>{formatDate(agenda.data_agendamento)}</b>
                  </Typography>

                  <Typography gutterBottom variant="h8" component="div">
                    {formatDia(agenda.data_agendamento)}
                  </Typography>

                  <Typography gutterBottom variant="h8" component="div">
                    {formatTime(new Date(agenda.horario))}h
                  </Typography>
                </CardContent>

                <Stack
                  direction="row"
                  justifyContent="flex-end"
                >
                  <CardActions>
                    <Button
                      type="submit"
                      color="error"
                      onClick={ () => {} }>
                      <b>ENCERRAR</b>
                    </Button>
                  </CardActions>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        ))}
      </Container>
      <Footer />
    </>
  );
}