import { useState, useEffect } from 'react';
import { 
  TextField, 
  Card, 
  CardActions, 
  CardContent, 
  Button, 
  Typography, 
  Stack, 
  Dialog, 
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { InputLabel, Select, MenuItem, CssBaseline, Container, FormControl } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from "date-fns/locale";
import ConfigIcon from '@mui/icons-material/Settings';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Redirect } from 'react-router-dom';
import Header from '../Main/Header';
import Footer from '../Main/Footer';
import { TitlePage } from '../../components/Utils/title';
import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: '0px auto',
    maxWidth: '80%',
    fontFamily:'Inter',
    alignItems: 'center'
  },
  user: {
    width: '20vh',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:" ff0000",
  }
}));

export default function MinhaAgenda() {
  const classes = useStyles();

  const [agendas, setAgendas] = useState([]);  
  const [areas, setAreas] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataAgendamentoDe, setDataAgendamentoDe] = useState(new Date());
  const [dataAgendamentoAte, setDataAgendamentoAte] = useState(new Date());
  const [id_area_atuacao, setAreaAtuacao] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [redirectConfigAgenda, setRedirectConfigAgenda] = useState(false);
  const [dias] = useState(['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']);

  function formatDia(date) {
    const data = new Date(date);
    return dias[data.getUTCDay()];
  }

  function formatTime(date) {
    return `${date.getUTCHours()}`.padStart(2, "0") + ':' + `${date.getUTCMinutes()}`.padStart(2, "0")
  }

  function formatDate(date) {
    date = new Date(date);

    return `${date.getUTCDate()}`.padStart(2, 0)
      + "-"
      + `${date.getUTCMonth() + 1}`.padStart(2, 0)
      + "-"
      + `${date.getUTCFullYear()}`;
  }

  function handleClickAgendamentoManual() {
    console.log("handleClickAgendamentoManual");
  }

  function handleAbrirModalAgendamento() {
    setOpen(true);
  }

  function handleChangeDataAgendamentoDe(newValue) {
    setDataAgendamentoDe(newValue);
  }

  function handleChangeDataAgendamentoAte(newValue) {
    setDataAgendamentoAte(newValue);
  }

  function handleClickFecharModalAgendamento() {
    setOpen(false);
  }

  function handleConfiguracaoAgenda() {
    setRedirectConfigAgenda({redirectConfigAgenda: true})
  }

  // Carrega inicialmente
  useEffect(() => {
    function validarSessao() {
      if (sessionStorage.getItem('token') === null || sessionStorage.getItem('tipo_usuario') !== 'Advogado') {
        alert('Você precisa estar conectado como Advogado para acessar essa tela!');
        setRedirect({ redirect: true });
      }
    }

    async function buscarInformacoesAgendaAdvogado() {
      const id = sessionStorage.getItem('id_advogado');
      const resultado = await api.get(`schedulings/lawyer/${id}`);
      setAgendas(resultado.data)
    }

    async function buscarAreas() {
      const resultado = await api.get('areas');
      setAreas(resultado.data);
    }

    validarSessao();
    buscarInformacoesAgendaAdvogado();
    buscarAreas();
  }, []);

  async function deleteAgenda(id_agenda) {
    if (window.confirm("Confirmar encerramento do agendamento?") === false) {
      return;
    }

    const agendaDepois = agendas.filter((x) => x.id_agenda !== id_agenda);

    const id = sessionStorage.getItem('id_advogado');

    await api.delete(`scheduling`, {
      data: {
        id_advogado: parseInt(id),
        id_agenda: parseInt(id_agenda)
      }
    });

    setAgendas(agendaDepois);

    alert("excluido com sucesso")
  }

  async function handleClickBuscarHorarios() {
    const fk_advogado = parseInt(sessionStorage.getItem('id_advogado'));

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
      const resultado = await api.get(`schedulings/lawyer/${fk_advogado}?data_inicial=${dataAgendamentoDeFormatada}&data_final=${dataAgendamentoAteFormatada}&area=${id_area_atuacao}`);
      setAgendas(resultado.data)
      setOpen(false);
    } catch (error) {
      const mensagem_retorno_api = error?.response?.data?.message;

      if (mensagem_retorno_api == null) {
        alert(`🤨 Algo deu errado! Tente novamente mais tarde`);
        return ;
      }

      alert(mensagem_retorno_api);
    }
  }

  if (redirect) {
    return <Redirect to='../home' />;
  }

  if (redirectConfigAgenda) {
    return <Redirect to='configuracao/agenda' />;
  }

  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <TitlePage internal="Minha Agenda" />

        <div className={classes.paper}>
          <Stack
            direction={{ xs: "column", md: "row" }} 
            spacing={2}
          >
            <Button variant="contained" startIcon={<CalendarMonthIcon />} onClick={ handleClickAgendamentoManual }>
              Agendamento manual
            </Button>
            <Button variant="contained" startIcon={<ConfigIcon />} onClick={ handleConfiguracaoAgenda }>
              Configuração da Agenda
            </Button>
            <Button variant="contained" startIcon={<FilterAltIcon />} onClick={ handleAbrirModalAgendamento }>
              Filtro
            </Button>
          </Stack>

          <br />

          {agendas.map((agenda) => (
            <Card key={agenda.id_agenda} id="myTable" xs={{ maxWidth: 800 }} style={{marginBottom: "10%", fontFamily:"Inter", height:"50%", padding:"2%", boxShadow:"1px 5px 10px #888888"}}>
              <CardContent>
                <Stack
                  direction={{ xs: "column", md: "row" }} 
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Typography variant="h6" component="div">
                    <b>{agenda.cliente.nome}</b>
                  </Typography>
                  <Typography variant="h6" component="div">
                    <b>Causa: { areas.map((area) => (agenda.fk_advogado_area === area.id_area_atuacao ? area.titulo : ''))}</b>
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

                <Typography gutterBottom variant="h7" component="div">
                  Contato em {agenda.contato_cliente}
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
                    onClick={ () => deleteAgenda(agenda.id_agenda) }>
                    <b>ENCERRAR</b>
                  </Button>
                </CardActions>
              </Stack>
            </Card>
          ))}
        </div>

        <Dialog open={open} onClose={handleClickFecharModalAgendamento}>
          <DialogTitle>Filtrar Agendamentos</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <FormControl fullWidth className={classes.margin}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                  <DatePicker
                    label="De:"
                    value={dataAgendamentoDe}
                    onChange={(newValue) => { handleChangeDataAgendamentoDe(newValue) }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <DatePicker
                    label="Até:"
                    value={dataAgendamentoAte}
                    onChange={(newValue) => { handleChangeDataAgendamentoAte(newValue) }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>

              <FormControl fullWidth variant="outlined" margin="normal" className={classes.margin}>
                <InputLabel id="Area">Área de atuação</InputLabel>
                <Select
                  required
                  labelId="Área de atuação"
                  id="AreaSelect"
                  multiline
                  variant="outlined"
                  value={id_area_atuacao}
                  onChange={e => setAreaAtuacao(e.target.value)}
                  label="Tipo de Usuario"
                >
                  {areas.map((area)=>{
                    return <MenuItem key={area.id_area_atuacao} value={area.id_area_atuacao}>{area.titulo}</MenuItem>
                  })}
                </Select>
              </FormControl>

              <br />
              <br />

              <Button 
                variant="contained"
                color="primary"
                onClick={handleClickBuscarHorarios}
              >
                Filtrar
              </Button>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Container>
      <Footer />
    </>          
  );
}
