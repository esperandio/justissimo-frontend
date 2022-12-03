import React from "react";
import Header from "../Main/Header";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import WatsonComponent from "../../components/watson/watson_component";

export default function Home() {
  return (
    <>
      <WatsonComponent />
      <Header />
      <Container position="sticky" maxWidth="xl" sx={{ backgroundImage: "url(https://images.pexels.com/photos/7979418/pexels-photo-7979418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)", WebkitFilter: "grayscale(50%)", filter: "gray", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }} style={{ height: "70vh", marginTop: 0, padding: 0 }}>
        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ height: "100%" }}
        >
          <Typography variant="h2" gutterBottom align='center' style={{ fontWeight: 600, color: "#fff" }}>
            A maneira mais simples de <br/> encontrar um advogado
          </Typography>

          <Typography variant="h6" gutterBottom align='center' style={{ fontStyle: "italic", color: "#fff" }}>
            Justíssimo, mais do que justo!
          </Typography>
        </Stack>
      </Container>
      {/* </AppBar> */}
      <Container>
        <Stack
          marginTop="3rem"
          display="flex"
          alignItems="flex-start"
          direction={{ xs: "column", md: "row" }} 
          justifyContent="center"
          spacing={2}
        >
          <Stack
            flex={1}
            alignItems="center"
            direction="column"
            justifyContent="center"
            spacing={2}
          >
            <Typography variant="h6" style={{ fontWeight: 600 }}>
              Objetivo do Justíssimo
            </Typography>

            <Typography variant="subtitle1" gutterBottom style={{ textAlign: "center" }}>
              Nossa solução tem o objetivo de propor que clientes consigam encontrar e entrar em contato com advogados verificados pela equipe do 
              Justíssimo, garantindo assim a confiabilidade e integridade de todos os usuários.
            </Typography>
          </Stack>

          <Stack
            flex={1}
            alignItems="center"
            direction="column"
            justifyContent="center"
            spacing={2}
          >
            <Typography variant="h6" style={{ fontWeight: 600 }}>
              Uma solução inovadora
            </Typography>

            <Typography variant="subtitle1" gutterBottom style={{ textAlign: "center" }}>
              O Justíssimo difere de todas as atuais soluções existentes no mercado. Oferecendo um módulo de agendamento diretamente pela 
              plataforma, entregando agilidade na gestão de agendas dos advogados. Oferecemos também um módulo de divulgação de necessidades 
              jurídicas, onde o usuário informa a sua necessidade e passa a ficar visível a todos os advogados cadastrados no Justíssimo, para que os 
              mesmos entrem em contato caso estejam interessados.
            </Typography>
          </Stack>

          <Stack
            flex={1}
            alignItems="center"
            direction="column"
            justifyContent="center"
            spacing={2}
          >
            <Typography variant="h6" style={{ fontWeight: 600 }}>
              Ficou com alguma dúvida?
            </Typography>

            <Typography variant="subtitle1" gutterBottom style={{ textAlign: "center" }}>
              O Justíssimo também dispõe de uma ferramenta de inteligência artificial. Batizado de Justus Assistente, seu objetivo é auxiliar os usuários 
              a tirar eventuais dúvidas relacionadas ao Justíssimo ou até mesmo, sobre a área jurídica. 
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </>  
  );
}