import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ValidarAutenticacaoCliente } from "../../components/ValidarAutenticacao";
import Header from "../Main/Header";
import { Container, Grid } from "@material-ui/core/";
import { TitlePage } from "../../components/Utils/title";
import { 
  Typography,
  Chip,
  Divider,
  Button,
  Avatar,
  Stack,
  Backdrop,
  CircularProgress
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { grey } from "@mui/material/colors";
import { ClientService } from "../../services";

export default function InformacoesDivulgacao() {
  const params = useParams();
  const history = useHistory();

  const [backdropOpen, setBackdropOpen] = useState(true);
  const [divulgacao, setDivulgacao] = useState({});
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
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
    const resultado = await ClientService.getDivulgationInfo(id);

    setDivulgacao(resultado.data);
    setMensagens(resultado.data.mensagens)

    setBackdropOpen(false)
  }

  function handleClickVisualizarPerfilAdvogado(id_advogado) {
    history.push(`/advogado/${id_advogado}`);
  }

  async function handleClickEncerrarDivulgacao() {
    const confirmaEncerramento = confirm("Tem certeza que deseja prosseguir com o encerramento da divulgação?");

    if (!confirmaEncerramento) {
      return;
    }

    try {
      const id_usuario = parseInt(sessionStorage.getItem("id_usuario"));
      const id_divulgacao = parseInt(params.id);
  
      await ClientService.closeDivulgation(id_usuario, id_divulgacao);

      buscarInformacoesDivulgacao();
    } catch (error) {
      let retorno = "Erro ao encerrar divulgacao!";

      if (error.response.status === 400) {
        retorno += "\n\n" + error.response.data.message;
      } else {
        retorno += "\n" + error.message;
      }

      alert(retorno);
    }
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
        <Typography variant="h4">{divulgacao.titulo}</Typography>
        <br />
        <Typography variant="h6">Descrição</Typography>
        <Typography sx={{fontStyle: "italic"}} textAlign={"justify"}>
          {divulgacao.descricao}
        </Typography>
        <br />

        {divulgacao.encerrado === true 
          ? <>
            <Button
              type="submit"
              variant="contained"
              color="error"
              disabled={true}
            >
              Já encerrado
            </Button>
          </>
          : <>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={ handleClickEncerrarDivulgacao }
            >
              Encerrar divulgação
            </Button>
          </>
        }

        <br />
        <br />
        <Divider />
        <br />

        {mensagens == "" && (
          <>
            <Grid container spacing={1} justifyContent="center">
              <Typography style={{ fontWeight: 600 }}>
                Nenhuma mensagem encontrada
              </Typography>
            </Grid>
          </>
        )}

        {mensagens.length > 0 && (
          <>
            <Typography variant="h6">Mensagens recebidas</Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm container spacing={1}>
                {mensagens.map((mensagem) => (
                  <Grid key={mensagem.id_mensagem_divulgacao} item xs={12}>
                    <br />
                    <Chip 
                      variant="outlined" 
                      color="default" 
                      size="small" 
                      icon={<EventAvailableIcon />} 
                      label={formatDate(mensagem.dt_mensagem)}
                    />
                    <br />
                    <br />

                    <Stack spacing={2} direction={"row"}>
                      <Avatar />
                      <Stack>
                        <Typography fontWeight={700}>{mensagem.advogado.nome}</Typography>
                        <Stack direction={"row"}>
                          <LocationOnIcon fontSize="small" sx={{ color: grey[500] }}/> 
                          <Typography variant="body2" color="text.secondary">
                            {mensagem.advogado.endereco.cidade}, {mensagem.advogado.endereco.estado}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>

                    <br />

                    <Typography textAlign={"justify"}>
                      {mensagem.mensagem}
                    </Typography>

                    <br />

                    <Button
                      type="submit"
                      variant="contained"
                      onClick={ () => handleClickVisualizarPerfilAdvogado(mensagem.advogado.id_advogado) }
                    >
                      Visualizar perfil
                    </Button>
                    <br />
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
    </>
  );
}