import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ValidarAutenticacaoAdvogado } from "../../components/ValidarAutenticacao";
import Header from "../Main/Header";
import Footer from "../Main/Footer";
import { Container, Grid, FormControl, Button } from "@material-ui/core/";
import { TitlePage } from "../../components/Utils/title";
import { 
  Typography,
  Chip,
  Divider,
  Backdrop,
  CircularProgress,
  TextField,
  Stack,
  Avatar
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import { grey } from "@mui/material/colors";
import { LawyerService } from "../../services";

export default function VisualizarDivulgacao() {
  const params = useParams();

  const [backdropOpen, setBackdropOpen] = useState(true);
  const [divulgacao, setDivulgacao] = useState({});
  const [mensagens, setMensagens] = useState([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    async function buscarInformacoesDivulgacao() {
      const id = parseInt(params.id);
      const fk_advogado = parseInt(sessionStorage.getItem("id_advogado"));

      const resultado = await LawyerService.getDivulgationInfo(fk_advogado, id);

      setDivulgacao(resultado.data);
      setMensagens(resultado.data.mensagens)

      setBackdropOpen(false)
    }

    buscarInformacoesDivulgacao();
  }, []);

  function formatDate(date) {
    date = new Date(date);

    return `${date.getUTCDate()}`.padStart(2, 0)
      + "/"
      + `${date.getUTCMonth() + 1}`.padStart(2, 0)
      + "/"
      + `${date.getUTCFullYear()}`;
  }

  async function buscarInformacoesDivulgacao() {
    const id = parseInt(params.id);
    const fk_advogado = parseInt(sessionStorage.getItem("id_advogado"));

    const resultado = await LawyerService.getDivulgationInfo(fk_advogado, id);

    setDivulgacao(resultado.data);
    setMensagens(resultado.data.mensagens)

    setBackdropOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let retorno = "";

    setBackdropOpen(true);

    try {   
      const id = parseInt(params.id);
      const fk_advogado = parseInt(sessionStorage.getItem("id_advogado"));

      await LawyerService.sendMessageDivulgation(fk_advogado, id, mensagem);
      retorno = "Mensagem enviada com sucesso!";
    } catch (error) {
      if (error.response.status === 400) {
        retorno = "Erro ao enviar mensagem! \n\n" + error.response.data.message;
      } else {
        retorno = "Erro ao enviar mensagem! \n" + error.message;
      }
    }

    setBackdropOpen(false);
    alert(retorno);

    await buscarInformacoesDivulgacao();

    setMensagem("");
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ValidarAutenticacaoAdvogado />
      <Header />
      <Container maxWidth="lg">
        <TitlePage internal="Detalhes da divulgação" />
        <Chip 
          variant="outlined" 
          color="primary" 
          size="small" 
          icon={<EventAvailableIcon />} 
          label={`Postado em ${formatDate(divulgacao.dt_cadastro)}`}
        />
        <br />
        <br />
        <Stack spacing={2} direction={"row"}>
          <Avatar />
          <Stack>
            <Typography fontWeight={700}>{divulgacao.cliente?.nome}</Typography>
            <Stack direction={"row"}>
              <LocationOnIcon fontSize="small" sx={{ color: grey[500] }}/> 
              <Typography variant="body2" color="text.secondary">
                {divulgacao.cliente?.endereco?.cidade}, {divulgacao.cliente?.endereco?.estado}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <br />
        <Divider />
        <br />
        <Typography variant="h4">{divulgacao.titulo}</Typography>
        <br />
        <Typography variant="h6">Descrição</Typography>
        <Typography sx={{fontStyle: "italic"}} textAlign={"justify"}>
          {divulgacao.descricao}
        </Typography>
        <br />

        {mensagens == "" && (
          <>
            <Grid container spacing={1} justifyContent="center">
              <Typography style={{ fontWeight: 600 }}>
                Você ainda não mandou nenhuma mensagem nessa divulgação
              </Typography>
            </Grid>
          </>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* Mensagem */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    id="Mensagem"
                    label="Envie uma mensagem para esse usuário"
                    placeholder="Digite a mensagem"
                    multiline
                    minRows={3}
                    variant="outlined"
                    value={mensagem}
                    onChange={e => setMensagem(e.target.value)}
                    margin="normal"
                  />
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  startIcon={<SendIcon />}
                >
                  Enviar mensagem
                </Button>       
              </Grid>
            </Grid>
          </Grid>
        </form>

        <br/>

        {mensagens.length > 0 && (
          <>
            <Typography variant="h6">Mensagens enviadas</Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm container spacing={1}>
                {mensagens.map((mensagem) => (
                  <Grid key={mensagem.id_mensagem_divulgacao} item xs={12}>
                    <Chip 
                      variant="outlined" 
                      color="default" 
                      size="small" 
                      icon={<EventAvailableIcon />} 
                      label={formatDate(mensagem.dt_mensagem)}
                    />
                    <br />
                    <br />

                    <Typography textAlign={"justify"}>
                      {mensagem.mensagem}
                    </Typography>

                    <br />
                    <Divider />
                    <br />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}