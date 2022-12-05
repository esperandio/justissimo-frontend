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
      <Container position="sticky" maxWidth="100%" sx={{ backgroundImage: "linear-gradient(rgba(0,1,0,1), rgba(0,0,0,0.4)), url(https://img.freepik.com/fotos-gratis/pessoas-negocio-apertar-mao-em-um-sala-reuniao_53876-15185.jpg?w=740&t=st=1670258156~exp=1670258756~hmac=8acca085c980eaafdaaff8a1eccc6d5fe73864650c6b437d9257fd599c1f3048)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }} style={{ height: "70vh", marginTop: 0, padding: 0 }}>
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
      <Footer />
    </>  
  );
}