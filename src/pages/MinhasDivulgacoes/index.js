import React, { useState, useEffect } from "react";
import Header from "../Main/Header";
import { ValidarAutenticacaoCliente } from "../../components/ValidarAutenticacao";
import { Container, Link, Grid, FormControl } from "@material-ui/core/";
import { TitlePage } from "../../components/Utils/title";
import { 
  Typography,
  Chip,
  Divider,
  Stack,
  Button,
  Dialog, 
  DialogTitle,
  DialogContent,
  TextField
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { ClientService } from "../../services";

export default function MinhasDivulgacoes() {
  const [divulgacoes, setDivulgacoes] = useState([]); 
  const [isOpenDialogFiltrarDivulgacoes, setOpenDialogFiltrarDivulgacoes] = useState(false);
  const [dataDivulgacaoDe, setDataDivulgacaoDe] = useState(new Date());
  const [dataDivulgacaoAte, setDataDivulgacaoAte] = useState(new Date());

  useEffect(() => {
    async function buscarMinhasDivulgacoes() {
      const id = parseInt(sessionStorage.getItem("id_cliente"));

      const resultado = await ClientService.getAllDivulgations(id);

      setDivulgacoes(resultado.data);
    }

    buscarMinhasDivulgacoes();
  }, []);

  function formatDate(date) {
    date = new Date(date);

    return `${date.getUTCDate()}`.padStart(2, 0)
      + "/"
      + `${date.getUTCMonth() + 1}`.padStart(2, 0)
      + "/"
      + `${date.getUTCFullYear()}`;
  }

  function handleClickFiltroDivulgacao() {
    setOpenDialogFiltrarDivulgacoes(true);
  }

  async function handleClickLimparFiltroDivulgacao() {
    const id = parseInt(sessionStorage.getItem("id_cliente"));

    const resultado = await ClientService.getAllDivulgations(id);

    setDivulgacoes(resultado.data);
  }

  function handleCloseDialogFiltrarDivulgacoes() {
    setOpenDialogFiltrarDivulgacoes(false);
  }

  function handleChangeDataDivulgacaoDe(newValue) {
    setDataDivulgacaoDe(newValue);
  }

  function handleChangeDataDivulgacaoAte(newValue) {
    setDataDivulgacaoAte(newValue);
  }

  async function handleClickBuscarDivulgacao() {
    const id_cliente = parseInt(sessionStorage.getItem("id_cliente"));

    const dataDivulgacaoDeFormatada = `${dataDivulgacaoDe.getUTCFullYear()}` 
      + "-"
      + `${dataDivulgacaoDe.getUTCMonth() + 1}`.padStart(2, 0)
      + "-"
      + `${dataDivulgacaoDe.getDate()}`.padStart(2, 0);

    const dataDivulgacaoAteFormatada = `${dataDivulgacaoAte.getUTCFullYear()}` 
      + "-"
      + `${dataDivulgacaoAte.getUTCMonth() + 1}`.padStart(2, 0)
      + "-"
      + `${dataDivulgacaoAte.getDate()}`.padStart(2, 0);

    try {
      const resultado = await ClientService.getAllDivulgations(
        id_cliente, 
        dataDivulgacaoDeFormatada, 
        dataDivulgacaoAteFormatada
      );
      setDivulgacoes(resultado.data)
      setOpenDialogFiltrarDivulgacoes(false);
    } catch (error) {
      const mensagem_retorno_api = error?.response?.data?.message;

      if (mensagem_retorno_api == null) {
        alert("🤨 Algo deu errado! Tente novamente mais tarde");
        return ;
      }

      alert(mensagem_retorno_api);
    }
  }

  return (
    <>
      <ValidarAutenticacaoCliente />
      <Header />
      <Container maxWidth="lg">
        <TitlePage internal="Minhas divulgações" />

        <Stack
          direction={{ xs: "column", sm: "row" }} 
          spacing={2}
        >
          <Button variant="contained" startIcon={<FilterAltIcon />} onClick={ handleClickFiltroDivulgacao }>
            Filtro
          </Button>

          <Button variant="contained" startIcon={<FilterAltOffIcon />} onClick={ handleClickLimparFiltroDivulgacao }>
            Limpar filtros
          </Button>
        </Stack>

        <br />

        <Grid container spacing={1} justifyContent="center">
          {divulgacoes == "" && (
            <>
              <Typography style={{ fontWeight: 600 }}>
                Nenhuma divulgação encontrada
              </Typography>
            </>
          )}
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm container spacing={1}>
            {divulgacoes.map((divulgacao) => (
              <Grid key={divulgacao.id_divulgacao} item xs={12}>
                <Chip 
                  variant="outlined" 
                  color="primary" 
                  size="small" 
                  icon={<EventAvailableIcon />} 
                  label={ formatDate(divulgacao.dt_cadastro) } 
                />
                <br />
                <br />
                <Link href={`/cliente/divulgacao/${divulgacao.id_divulgacao}`} variant="h6">
                  { divulgacao.titulo }
                </Link>
                <Typography textAlign={"justify"}>
                  { divulgacao.descricao }
                </Typography>
                <br />
                <Chip label={ divulgacao.areaAtuacao.titulo } />
                <br />
                <br />
                <Divider />
                <br />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Filtros de divulgação */}
        <Dialog open={isOpenDialogFiltrarDivulgacoes} onClose={ handleCloseDialogFiltrarDivulgacoes }>
          <DialogTitle>Filtrar divulgações</DialogTitle>
          <DialogContent>
            <br />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                    <DatePicker
                      label="De:"
                      value={dataDivulgacaoDe}
                      onChange={(newValue) => { handleChangeDataDivulgacaoDe(newValue) }}
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
                      value={dataDivulgacaoAte}
                      onChange={(newValue) => { handleChangeDataDivulgacaoAte(newValue) }}
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
                    onClick={ handleClickBuscarDivulgacao }
                  >
                    Filtrar
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
}