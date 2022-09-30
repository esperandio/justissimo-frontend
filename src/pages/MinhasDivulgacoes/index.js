import React, { useState, useEffect } from "react";
import Header from "../Main/Header";
import { ValidarAutenticacaoCliente } from "../../components/ValidarAutenticacao";
import { Container, Link, Grid } from "@material-ui/core/";
import { TitlePage } from "../../components/Utils/title";
import { 
  Typography,
  Chip,
  Divider
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { ClientService } from "../../services";

export default function MinhasDivulgacoes() {
  const [divulgacoes, setDivulgacoes] = useState([]); 

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

  return (
    <>
      <ValidarAutenticacaoCliente />
      <Header />
      <Container maxWidth="lg">
        <TitlePage internal="Minhas Divulgações" />

        {/* Filtro */}

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
                <Link href="/cliente/minhas-divulgacoes" variant="h6">
                  { divulgacao.titulo }
                </Link>
                <Typography>
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
      </Container>
    </>
  );
}