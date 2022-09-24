import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../../Main/Header";
import Footer from "../../Main/Footer";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import api from "../../../services/api";
import { Redirect } from "react-router-dom";
import { TitlePage } from "../../../components/Utils/title";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: "none",
  },
}));

export default function CadastroDivulgacao() {
  const classes = useStyles();
  const history = useHistory();

  const [titulo, setTitulo] = useState("");
  const [id_area_atuacao, setAreaAtuacao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [areas, setAreas] = useState([]);

  useEffect(() => {
    function validarSessao() {
      if (sessionStorage.getItem("token") === null || sessionStorage.getItem("tipo_usuario") === "Advogado") {
        alert("Você precisa estar conectado como cliente para acessar essa tela!");
        setRedirect({ redirect: true });
      }
    }
    async function buscarAreas() {
      const resultado = await api.get("areas");
      setAreas(resultado.data);
    }
        
    validarSessao();
    buscarAreas();
  },[])

  async function handleSubmit(e) {
    e.preventDefault();

    const dados = { titulo, id_area_atuacao, descricao };

    const id_cliente = sessionStorage.getItem("id_cliente");

    try {
      await api.post(`clients/${id_cliente}/divulgations`, dados);

      alert("Divulgacação cadastrada com sucesso!");

      history.push("/home");
    } catch (error) {
      const mensagem_retorno_api = error?.response?.data?.message;

      if (mensagem_retorno_api == null) {
        alert("🤨 Algo deu errado! Tente novamente mais tarde");
        return ;
      }

      alert(mensagem_retorno_api);
    }
  }

  if (redirect) {
    return <Redirect to='../home' />;
  }

  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <TitlePage internal="Divulgue sua causa" />

        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container spacing={1}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className={classes.margin}>
                  <TextField
                    required
                    id="Nome"
                    label="Digite o título da sua causa"
                    placeholder="Título da causa"
                    multiline
                    variant="outlined"
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                    margin="normal"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
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
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth className={classes.margin}>
                  <TextField
                    required
                    id="Nome"
                    label="Descrição"
                    placeholder="Descreva a sua causa"
                    multiline
                    minRows={5}
                    inputProps={{ maxLength: 200 }}
                    variant="outlined"
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    margin="normal"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormControl>
                  <Button className={classes.submit}
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<SaveIcon />}
                    onClick={ handleSubmit }
                  >
                                        Cadastrar
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
      <Footer />
    </>
  );
}