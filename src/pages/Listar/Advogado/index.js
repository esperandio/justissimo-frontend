import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Header from "../../Main/Header";
import Footer from "../../Main/Footer";
import { makeStyles } from "@material-ui/core/styles";
import { TitlePage } from "../../../components/Utils/title";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import UserDefaultIcon from "../../../user.svg";
import api from "../../../services/api";
import { Rating } from "@mui/material";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const useStyles = makeStyles((theme) => ({
  user: {
    width: "20vh",
    minWidth: "20vh",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function ListarAdvogado() {
  const classes = useStyles();
  const history = useHistory();

  const [nome, setNome] = useState("");
  const [advogados, setAdvogados] = useState([]);
  const [usarFiltroAvancado, setUsarFiltroAvancado] = useState(false);
  const [id_area_atuacao, setAreaAtuacao] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");

  const [areas, setAreas] = useState([]);
  const [estados] = useState(["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
    "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]);

  useEffect(() => {
    async function buscarAdvogados() {
      const resultado = await api.get("lawyers");
      setAdvogados(resultado.data);
    }

    async function buscarAreas() {
      const resultado = await api.get("areas");
      setAreas(resultado.data);
    }

    buscarAdvogados();
    buscarAreas();
  }, []);

  function handleAutocompleteAreaChange(event, values) {
    setAreaAtuacao(values?.id);
  }

  function handleAutocompleteEstadoChange(event, values) {
    setEstado(values);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let filtroApi = `nome=${nome}`;

    if (usarFiltroAvancado === true) {
      filtroApi = `${filtroApi}&area=${id_area_atuacao ?? ""}&estado=${estado ?? ""}&cidade=${cidade ?? ""}`;
    }

    try {
      const resultado = await api.get(`lawyers?${filtroApi}`);
      setAdvogados(resultado.data);
    } catch (error) {
      const mensagem_retorno_api = error?.response?.data?.message;

      if (mensagem_retorno_api == null) {
        alert("🤨 Algo deu errado! Tente novamente mais tarde");
        return ;
      }

      alert(mensagem_retorno_api);
    }
  }

  async function handleExibirAdvogado(id_advogado) {
    history.push(`/advogado/${id_advogado}`);
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <TitlePage internal="Busque advogados" />

        <Grid container spacing={2}>
          <Grid item xs={12} sm container spacing={1}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <TextField
                  id="Pesquisa"
                  label="Nome do advogado"
                  placeholder="Nome do advogado"
                  variant="outlined"
                  margin="normal"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12}>
              <FormControlLabel
                control={<Switch checked={usarFiltroAvancado} color="primary" onChange={() => {
                  setUsarFiltroAvancado((prev) => !prev);
                }} />}
                label="Filtros avançados"
              />
              <Collapse in={usarFiltroAvancado}>
                <Grid item xs={12} sm container spacing={1}>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <Autocomplete
                        options={areas.map((x) => { 
                          return {
                            label: x.titulo,
                            id: x.id_area_atuacao
                          }
                        })}
                        renderInput={(params) => <TextField {...params} label="Área de atuação" />}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        onChange={ handleAutocompleteAreaChange }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <Autocomplete
                        options={estados}
                        renderInput={(params) => <TextField {...params} label="Estado" />}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        onChange={ handleAutocompleteEstadoChange }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <TextField
                        id="Cidade"
                        label="Cidade"
                        placeholder="Cidade"
                        variant="outlined"
                        margin="normal"
                        value={cidade}
                        onChange={e => setCidade(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Collapse>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<FilterAltIcon />}
                onClick={ handleSubmit }
              >
                Filtrar
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {advogados.length === 0 ? <h3>Nenhum advogado encontrado</h3> : ""}

        <Grid container spacing={2}>
          <Grid item xs={12} sm container spacing={1}>
            {advogados.map((advogado)=>{
              return (
                <Grid key={advogado.id_advogado} item xs={12} sm={4} className={classes.submit}>
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}

                  >
                    <Stack
                      justifyContent="center"
                      spacing={2}
                      sx={{ height: "20vh", minHeight: "20vh" }}
                    >
                      <img 
                        src={advogado.usuario.url_foto_perfil == null
                          ? UserDefaultIcon
                          : advogado.usuario.url_foto_perfil
                        } 
                        className={classes.user} 
                        alt="profile" 
                      />
                    </Stack>
                    <h2>{advogado.nome}</h2>
                    <Rating 
                      id="nota"
                      name="nota" 
                      size='large'
                      
                      readOnly
                      value={advogado.nota}
                    />

                    <p>{advogado._count?.avaliacoes} avaliações</p>

                    <Button
                      variant="contained"
                      type="submit"
                      onClick={ () => handleExibirAdvogado(advogado.id_advogado) }
                    >
                        Visualizar
                    </Button>
                  </Stack>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}