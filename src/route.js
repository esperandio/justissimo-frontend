import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./pages/Main/Footer"
import CadAdvogado from "./pages/Cadastro/Advogado"
import CadCliente from "./pages/Cadastro/Cliente"
import CadDivulgacao from "./pages/Cadastro/Divulgacao"
import Login from "./pages/Login";
import Home from "./pages/Home";
import RedefinirSenha_Email from "./pages/EsqueceuSenha/DefinicaoEmail";
import RedefinirSenha_Codigo from "./pages/EsqueceuSenha/CodigoEnviado";
import RedefinirSenha_NovaSenha from "./pages/EsqueceuSenha/NovaSenha";
import AvaliacaoAdvogado from "./pages/CasosDeUso/Avaliacao/Advogado";
import ListarAdvogado from "./pages/Listar/Advogado";
import InformacoesAdvogado from "./pages/InformacoesAdvogado";
import MinhaAgendaAdvogado from "./pages/MinhaAgendaAdvogado";
import MinhaAgendaCliente from "./pages/MinhaAgendaCliente";
import ConfiguracaoAgenda from "./pages/CasosDeUso/Agenda/Configuracao";
import EditarPerfil from "./pages/EditarPerfil";
import MinhasDivulgacoes from "./pages/MinhasDivulgacoes";
import BuscarDivulgacoes from "./pages/BuscarDivulgacoes";

function Routes() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Home}/>
          <Route path="/advogado/cad" component={CadAdvogado}/>
          <Route path="/advogado/listar" component={ListarAdvogado}/>
          <Route path="/advogado/minha-agenda" component={MinhaAgendaAdvogado}/>
          <Route path="/advogado/buscar-divulgacoes" component={BuscarDivulgacoes}/>
          <Route path="/advogado/:id" component={InformacoesAdvogado}/>
          <Route path="/cliente/cad" component={CadCliente}/>
          <Route path="/cliente/minha-agenda" component={MinhaAgendaCliente}/>
          <Route path="/cliente/minhas-divulgacoes" component={MinhasDivulgacoes}/>
          <Route path="/cliente/divulgacao/cad" component={CadDivulgacao}/>
          <Route path="/login" component={Login}/>
          <Route path="/home" component={Home}/>
          <Route path="/redefinirsenha/email" component={RedefinirSenha_Email}/>
          <Route path="/redefinirsenha/codigo" component={RedefinirSenha_Codigo}/>
          <Route path="/redefinirsenha/novasenha" component={RedefinirSenha_NovaSenha}/>
          <Route path="/avaliacao/advogado/:id" component={AvaliacaoAdvogado}/>
          <Route path="/configuracao/agenda" component={ConfiguracaoAgenda}/> 
          <Route path="/editar-perfil" component={EditarPerfil}/>
        </Switch>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default Routes;