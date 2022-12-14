import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import { TitlePage } from "../../../components/Utils/title";
import { ValidarAutenticacaoCliente } from "../../../components/ValidarAutenticacao"
import AlertSuccess from "../../../components/alerts/AlertSuccess";
import AlertError from "../../../components/alerts/AlertError";

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

  const [areas, setAreas] = useState([]);

  useEffect(() => {
    async function buscarAreas() {
      const resultado = await api.get("areas");
      setAreas(resultado.data);
    }

    buscarAreas();
  },[])

  async function handleSubmit(e) {
    e.preventDefault();

    const dados = { titulo, id_area_atuacao, descricao };

    const id_cliente = sessionStorage.getItem("id_cliente");

    try {
      await api.post(`clients/${id_cliente}/divulgations`, dados);

      await AlertSuccess("Divulgacação cadastrada! Você será redirecionado para a página de minhas divulgações.");

      history.push("/cliente/minhas-divulgacoes");
    } catch (error) {
      const mensagem_retorno_api = error?.response?.data?.message;

      if (mensagem_retorno_api == null) {
        await AlertError("🤨 Algo deu errado! Tente novamente mais tarde");
        return ;
      }

      await AlertError(mensagem_retorno_api);
    }
  }

  return (
    <>
      <ValidarAutenticacaoCliente />
      <Header />
      <Container maxWidth="lg">
        <TitlePage internal="Divulgue sua causa" />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container spacing={1}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className={classes.margin}>
                  <TextField
                    required
                    id="Nome"
                    label="Digite o título da sua causa"
                    placeholder="Título da causa"
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
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<SaveIcon />}
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