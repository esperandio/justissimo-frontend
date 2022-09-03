import React from 'react';
import Container from '@material-ui/core/Container';
import Header from '../Main/Header';
import { TitleJustissimo, TitlePage } from '../../components/Utils/title';

export default function EditarPerfil() {
    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <Header title="Editar perfil" />
                <TitleJustissimo />
                <TitlePage internal="Editar perfil" />
            </Container>
        </React.Fragment>
    )
}