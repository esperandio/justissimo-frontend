import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../Main/Header";
import Footer from "../Main/Footer";
import { Container, Grid, FormControl } from "@material-ui/core/";
import { TitlePage } from "../../components/Utils/title";
import { 
  Button, 
  Stack, 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Dialog, 
  DialogTitle,
  DialogContent,
  TextField, 
  Backdrop,
  CircularProgress
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { ClientService } from "../../services";
import { ValidarAutenticacaoCliente } from "../../components/ValidarAutenticacao";
import EncerrarAgendamento from "../../components/EncerrarAgendamento";
import AlertError from "../../components/alerts/AlertError";

export default function MinhaAgenda() {
  const history = useHistory();
  
  const [backdropOpen, setBackdropOpen] = useState(true);
  const [agendas, setAgendas] = useState([]); 
  const [isOpenDialogFiltrarAgendamentos, setOpenDialogFiltrarAgendamentos] = useState(false);

  const [dataAgendamentoDe, setDataAgendamentoDe] = useState(new Date());
  const [dataAgendamentoAte, setDataAgendamentoAte] = useState(new Date());

  const [dias] = useState(["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]);
  
  useEffect(() => {
    buscarInformacoesAgendaAdvogado();
  }, []);

  function formatDate(date) {
    date = new Date(date);

    return `${date.getUTCDate()}`.padStart(2, 0)
      + "/"
      + `${date.getUTCMonth() + 1}`.padStart(2, 0)
      + "/"
      + `${date.getUTCFullYear()}`;
  }

  function formatDia(date) {
    const data = new Date(date);
    return dias[data.getUTCDay()];
  }

  function formatTime(date) {
    return `${date.getUTCHours()}`.padStart(2, "0") + ":" + `${date.getUTCMinutes()}`.padStart(2, "0")
  }

  async function buscarInformacoesAgendaAdvogado() {
    const id = parseInt(sessionStorage.getItem("id_cliente"));
    const resultado = await ClientService.getAllSchedulings(id);
    setAgendas(resultado.data);

    setBackdropOpen(false);
  }

  function handleClickVisualizarPerfilAdvogado(id_advogado) {
    history.push(`/advogado/${id_advogado}`);
  }

  function handleClickFiltroAgendamento() {
    setOpenDialogFiltrarAgendamentos(true);
  }

  async function handleClickBuscarAgenda() {
    const id_cliente = parseInt(sessionStorage.getItem("id_cliente"));

    const dataAgendamentoDeFormatada = `${dataAgendamentoDe.getUTCFullYear()}` 
      + "-"
      + `${dataAgendamentoDe.getUTCMonth() + 1}`.padStart(2, 0)
      + "-"
      + `${dataAgendamentoDe.getDate()}`.padStart(2, 0);

    const dataAgendamentoAteFormatada = `${dataAgendamentoAte.getUTCFullYear()}` 
      + "-"
      + `${dataAgendamentoAte.getUTCMonth() + 1}`.padStart(2, 0)
      + "-"
      + `${dataAgendamentoAte.getDate()}`.padStart(2, 0);

    try {
      const resultado = await ClientService.getAllSchedulings(
        id_cliente, 
        dataAgendamentoDeFormatada, 
        dataAgendamentoAteFormatada
      );
      setAgendas(resultado.data)
      setOpenDialogFiltrarAgendamentos(false);
    } catch (error) {
      const mensagem_retorno_api = error?.response?.data?.message;

      if (mensagem_retorno_api == null) {
        await AlertError("🤨 Algo deu errado! Tente novamente mais tarde");
        return ;
      }

      await AlertError(mensagem_retorno_api);
    }
  }

  function handleCloseDialogFiltrarAgendamentos() {
    setOpenDialogFiltrarAgendamentos(false);
  }

  function handleChangeDataAgendamentoDe(newValue) {
    setDataAgendamentoDe(newValue);
  }

  function handleChangeDataAgendamentoAte(newValue) {
    setDataAgendamentoAte(newValue);
  }

  function handleAfterSubmitEncerramento() {
    buscarInformacoesAgendaAdvogado();
  }

  async function handleClickLimparFiltroAgendamento() {
    buscarInformacoesAgendaAdvogado();
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ValidarAutenticacaoCliente />
      <Header />
      <Container maxWidth="lg">
        <TitlePage internal="Meus agendamentos" />
        <Stack
          direction={{ xs: "column", sm: "row" }} 
          spacing={2}
        >
          <Button variant="contained" startIcon={<FilterAltIcon />} onClick={ handleClickFiltroAgendamento }>
            Filtro
          </Button>

          <Button variant="contained" startIcon={<FilterAltOffIcon />} onClick={ handleClickLimparFiltroAgendamento }>
            Limpar filtros
          </Button>
        </Stack>

        <br />

        <Grid container spacing={1} justifyContent="center">
          {agendas == "" && (
            <>
              <Typography style={{ fontWeight: 600 }}>
                Nenhum agendamento encontrado
              </Typography>
            </>
          )}
        </Grid>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm container spacing={1}>
            {agendas.map((agenda) => (
              <Grid key={agenda.id_agenda} item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <EventAvailableIcon />
                      {formatDate(agenda.data_agendamento)}
                    </Stack>

                    <br />

                    <Stack
                      direction={{ xs: "column", md: "row" }} 
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <Typography variant="h7">
                        <b>{agenda.advogado.nome}</b>
                      </Typography>
                      <Typography variant="h7">
                        <b>Causa: {agenda.area_atuacao}</b>
                      </Typography>
                    </Stack>

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
                        color="primary"
                        onClick={ () => handleClickVisualizarPerfilAdvogado(agenda.fk_advogado) }
                      >
                        Visualizar perfil
                      </Button>

                      <EncerrarAgendamento 
                        id_agenda={agenda.id_agenda} 
                        encerrado={agenda.encerrado}
                        motivo_encerramento={agenda.motivo_encerramento}
                        justificativa_encerramento={agenda.justificativa}
                        afterSubmit={ handleAfterSubmitEncerramento }
                      />
                    </CardActions>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Filtros de agenda */}
        <Dialog open={isOpenDialogFiltrarAgendamentos} onClose={ handleCloseDialogFiltrarAgendamentos }>
          <DialogTitle>Filtrar Agendamentos</DialogTitle>
          <DialogContent>
            <br />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                    <DatePicker
                      label="De:"
                      value={dataAgendamentoDe}
                      onChange={(newValue) => { handleChangeDataAgendamentoDe(newValue) }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                    <DatePicker
                      label="Até:"
                      value={dataAgendamentoAte}
                      onChange={(newValue) => { handleChangeDataAgendamentoAte(newValue) }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormControl>
                  <Button 
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={ handleClickBuscarAgenda }
                  >
                    Filtrar
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Container>
      <Footer />
    </>
  );
}