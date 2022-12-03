import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { 
  Container, 
  Divider
} from "@material-ui/core";
import { 
  Button,
  Rating,
  Stack,
  Backdrop,
  CircularProgress,
  Avatar
} from "@mui/material";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { TitlePage }  from "../../components/Utils/title";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import Header from "../Main/Header";
import Footer from "../Main/Footer";
import ButtonWithTooltip from "../../components/ButtonWithTooltip";
import RealizarAgendamento from "../../components/RealizarAgendamento";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  user: {
    width: "20vh",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function InformacoesAdvogado() {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();

  const [backdropOpen, setBackdropOpen] = useState(true);
  const [advogado, setAdvogado] = useState({});
  const [advogadoAreas, setAdvogadoAreas] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);

  const[autenticado, setAutenticado] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function buscarInformacoesAdvogado() {
      const resultado = await api.get(`lawyers/${params.id}`);
      setAdvogado(resultado.data);
      setAdvogadoAreas(resultado.data.areas)
      setAvaliacoes(resultado.data.avaliacoes)

      setBackdropOpen(false)
    }

    buscarInformacoesAdvogado();

    if (sessionStorage.getItem("token") !== null || sessionStorage.getItem("tipo_usuario") === "Cliente") {
      setAutenticado(true);
    }
  }, [params.id]);

  function handleClickAbrirModalAgendamento() {
    setOpen(true);
  }

  function handleClickFecharModalAgendamento() {
    setOpen(false);
  }

  function handleClickAvaliarAdvogado() {
    history.push(`/avaliacao/advogado/${advogado?.id_advogado}`);
  }

  function formatarDataAvaliacao(dt_avaliacao) {
    const date = new Date(dt_avaliacao);

    return `${date.getDate()}`.padStart(2, 0)
      + "/"
      + `${date.getUTCMonth() + 1}`.padStart(2, 0)
      + "/"
      + `${date.getUTCFullYear()}`;
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Header />
      <Container maxWidth="lg">
        <br />
        <br />
        <div className={classes.paper}>
          <Stack
            justifyContent="center"
            spacing={2}
            sx={{ height: "20vh", minHeight: "20vh" }}
          >
            <Avatar
              alt="profile"
              src={advogado?.usuario?.url_foto_perfil == null && backdropOpen === false
                ? ""
                : advogado?.usuario?.url_foto_perfil
              } 
              sx={{ width: "20vh", height: "20vh" }}
            />
          </Stack>

          <TitlePage internal={advogado.nome} />
          <Rating 
            id="nota"
            name="nota" 
            size='large'
            
            readOnly
            value={advogado.nota ?? 0}
          />
          <p>{advogado._count?.avaliacoes} avaliações</p>
        </div>

        <Divider/>

        <div>
          <h2>Descrição</h2>
          <p>{advogado.info}</p>
          <p>E-mail: {advogado.usuario?.email}</p>
        </div>

        <Stack
          direction={{ xs: "column", sm: "row" }} 
          spacing={2}
        >
          {advogado.tel_celular != null && (
            <Button className={classes.submit}
              variant="contained"
              color="primary"
              startIcon={<WhatsAppIcon/>}
              onClick={ () => { window.open(`https://api.whatsapp.com/send?phone=${advogado.tel_celular.replace(/\+/g, "")}`, "_blank"); } }
            >
              Entrar em contato
            </Button>
          )}

          <ButtonWithTooltip 
            startIcon={<CalendarMonthIcon/>}
            disabled={!autenticado}
            tooltip="Você precisa estar autenticado para acessar esse recurso."
            onClick={ handleClickAbrirModalAgendamento }
          >
            Agendar uma consulta
          </ButtonWithTooltip>

          <ButtonWithTooltip
            startIcon={<StarHalfIcon/>}
            disabled={!autenticado}
            tooltip="Você precisa estar autenticado para acessar esse recurso."
            onClick={ handleClickAvaliarAdvogado }
          >
            Avaliar advogado
          </ButtonWithTooltip>
        </Stack>

        <br />

        <Divider/>

        {avaliacoes.length > 0 && (
          <div>
            {avaliacoes.length == 1 && (
              <h2>Avaliação</h2>  
            )}
            {avaliacoes.length > 1 && (
              <h2>Avaliações</h2>  
            )}
            {avaliacoes.map((avaliacao)=>{
              return (
                <div key={avaliacao.id_avaliacao}>
                  <Rating 
                    readOnly
                    value={avaliacao.nota ?? 0}
                  />  

                  <div>Avaliado em { formatarDataAvaliacao(avaliacao.data_avaliacao) }</div>
                  <div>{avaliacao.descricao}</div>

                  <br/>
                </div>
              )
            })}
          </div>
        )}

        <RealizarAgendamento
          open={open}
          advogado={advogado}
          areas={advogadoAreas}
          onClose={ handleClickFecharModalAgendamento }
        ></RealizarAgendamento>
      </Container>
      <Footer />
    </>
  );
}

