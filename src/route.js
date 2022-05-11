import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CadAdvogado from './paginas/Cadastro/Advogado'
import CadCliente from './paginas/Cadastro/Cliente'
//import EditUsuario from './paginas/Usuario/EditUsuario'
//import ListarUsuario from './paginas/Usuario/ListarUsuario'
import Login from './paginas/Login';
import Home from './paginas/Home';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Login}/>
                <Route path="/advogado/cad" component={CadAdvogado}/>
                <Route path="/cliente/cad" component={CadCliente}/>
                {/* <Route path="/usuario/edit" component={EditUsuario}/> */}
                {/* <Route path="/usuario/listar" component={ListarUsuario}/> */}
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;