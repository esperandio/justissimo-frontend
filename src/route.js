import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import MinhaAgenda from "./pages/MinhaAgenda";
import ConfiguracaoAgenda from "./pages/CasosDeUso/Agenda/Configuracao";
import EditarPerfil from "./pages/EditarPerfil";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/advogado/cad" component={CadAdvogado}/>
        <Route path="/cliente/cad" component={CadCliente}/>
        <Route path="/advogado/cad" component={CadAdvogado}/>
        <Route path="/divulgacao/cad" component={CadDivulgacao}/>
        <Route path="/login" component={Login}/>
        <Route path="/home" component={Home}/>
        <Route path="/redefinirsenha/email" component={RedefinirSenha_Email}/>
        <Route path="/redefinirsenha/codigo" component={RedefinirSenha_Codigo}/>
        <Route path="/redefinirsenha/novasenha" component={RedefinirSenha_NovaSenha}/>
        <Route path="/avaliacao/advogado/:id" component={AvaliacaoAdvogado}/>
        <Route path="/advogado/listar" component={ListarAdvogado}/>
        <Route path="/advogado/:id" component={InformacoesAdvogado}/>
        <Route path="/minha-agenda" component={MinhaAgenda}/>
        <Route path="/configuracao/agenda" component={ConfiguracaoAgenda}/> 
        <Route path="/editar-perfil" component={EditarPerfil}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;