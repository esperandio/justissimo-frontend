import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CadAdvogado from './paginas/Cadastro/Advogado'
import CadCliente from './paginas/Cadastro/Cliente'
import CadDivulgacao from './paginas/Cadastro/Divulgacao'
//import EditUsuario from './paginas/Usuario/EditUsuario'
//import ListarUsuario from './paginas/Usuario/ListarUsuario'
import Login from './paginas/Login';
import Home from './paginas/Home';
import RedefinirSenha_Email from './paginas/EsqueceuSenha/DefinicaoEmail';
import RedefinirSenha_Codigo from './paginas/EsqueceuSenha/CodigoEnviado';
import RedefinirSenha_NovaSenha from './paginas/EsqueceuSenha/NovaSenha';
import AvaliacaoAdvogado from './paginas/CasosDeUso/Avaliacao/Advogado';
import MinhaAgenda from './paginas/MinhaAgenda';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Login}/>
                <Route path="/advogado/cad" component={CadAdvogado}/>
                <Route path="/cliente/cad" component={CadCliente}/>
                <Route path="/divulgacao/cad" component={CadDivulgacao}/>
                {/* <Route path="/usuario/edit" component={EditUsuario}/> */}
                {/* <Route path="/usuario/listar" component={ListarUsuario}/> */}
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/redefinirsenha/email" component={RedefinirSenha_Email}/>
                <Route path="/redefinirsenha/codigo" component={RedefinirSenha_Codigo}/>
                <Route path="/redefinirsenha/novasenha" component={RedefinirSenha_NovaSenha}/>
                <Route path="/avaliacao/advogado" component={AvaliacaoAdvogado}/>
                <Route path="/MinhaAgenda" componet={MinhaAgenda}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;