import React from "react";
import Header from "../Main/Header";
import Footer from "../Main/Footer";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import WatsonComponent from "../../components/watson/watson_component";

export default function Home() {
  return (
    <>
      <WatsonComponent />
      <Header />
      <Container>
        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ height: { xs: "100vh", sm: "60vh" } }}
        >
          <Typography variant="h2" gutterBottom align='center' style={{ fontWeight: 600 }}>
            A maneira mais simples <br></br> de encontrar um advogado
          </Typography>

          <Typography variant="subtitle1" gutterBottom align='center' style={{ fontStyle: "italic" }}>
            Justissimo, mais do que justo. 
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }} 
          justifyContent="center"
          spacing={2}
        >
          <Stack
            direction="column"
            justifyContent="center"
            spacing={2}
          >
            <Typography variant="h6" style={{ fontWeight: 600 }}>
              Objetivo do Justissimo
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Temos o objetivo de propor que clientes consigam encontrar e entrar em contato com advogados verificados pela equipe do Justíssimo. 
            </Typography>
          </Stack>

          <Stack
            direction="column"
            justifyContent="center"
            spacing={2}
          >
            <Typography variant="h6" style={{ fontWeight: 600 }}>
              Uma solução inovadora
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              O Justíssimo difere de todas as atuais soluções existentes no mercado. Oferece um módulo de agendamento diretamente pela plataforma, entregando agilidade na gestão de agenda dos advogados. 
            </Typography>
          </Stack>

          <Stack
            direction="column"
            justifyContent="center"
            spacing={2}
          >
            <Typography variant="h6" style={{ fontWeight: 600 }}>
              Ficou com alguma dúvida?
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              O Justissimo também dispõe de uma ferramenta de inteligencia artificial. Batizado de Justus Assistente, seu objetivo é auxiliar os usuários a tirar eventuais dúvidas relacionadas ao Justissimo ou até mesmo, sobre a área juridica. 
            </Typography>
          </Stack>
        </Stack>
      </Container>
      <Footer />
    </>  
  );
}