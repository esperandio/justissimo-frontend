import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { 
  Container, 
  Grid, 
  FormControl, 
  Button, 
  Collapse, 
  FormControlLabel,
  Switch
} from "@material-ui/core";
import { 
  Autocomplete, 
  TextField, 
  Stack,
  Backdrop,
  CircularProgress,
  Avatar
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { TitlePage } from "../../../components/Utils/title";
import api from "../../../services/api";
import { Rating } from "@mui/material";
import Header from "../../Main/Header";

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

  const [backdropOpen, setBackdropOpen] = useState(true);
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
    async function buscarListaAdvogados() {
      const resultadoAdvogados = await api.get("lawyers");
      setAdvogados(resultadoAdvogados.data);

      const resultadoAreas = await api.get("areas");
      setAreas(resultadoAreas.data);

      setBackdropOpen(false);
    }

    buscarListaAdvogados();
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
                      <Avatar
                        alt="profile"
                        src={advogado.usuario.url_foto_perfil == null
                          ? ""
                          : advogado.usuario.url_foto_perfil
                        }
                        sx={{ width: "20vh", height: "20vh" }}
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
    </>
  );
}