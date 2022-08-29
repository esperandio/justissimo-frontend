import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from '../../Main/Header';
import Footer from '../../Main/Footer';
import { TitleJustissimo, TitlePage } from '../../../components/Utils/title';

export default function CadastroAdvogado() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Cadastrar Cliente" />
                <TitleJustissimo />
                <TitlePage internal="Cadastro de cliente" />
                <Footer />
            </Container>
        </React.Fragment>
    );
}