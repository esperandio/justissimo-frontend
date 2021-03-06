import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from '../Main/Header';
import { makeStyles } from '@material-ui/core/styles';
import { TitleJustissimo }  from '../../components/Utils/title';
import Footer from '../Main/Footer';
import Typography from '@mui/material/Typography';
import App from '../../components/watson/watson_component';
import InputTelefone from '../../components/Utils/mask/inputTelefoneMask';
const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    banner: {
        width: '20vw',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Home() {
    return (
        <React.Fragment>
            <App/>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Home" />

                <div >
                    <TitleJustissimo/>
                </div>

                <Typography variant="body1" gutterBottom align="justify">
                    Justíssimo trata-se de uma fundamental ferramenta para democratizar o conhecimento jurídico, e de forma gratuita. 
                    Além disso, auxilia muitos advogados em início de carreira, pelos serviços de correspondência.
                    Tem, ainda os clientes procuram os advogados fácil.
                </Typography>

                <Typography variant="body1" gutterBottom align="justify">
                    Somos uma starput que une Direito e Tecnologia para fazer com que a justiça dos tribunais e chegue às casas de qualquer cidadão ou cidadã, suas decisões e por meio da informação.
                </Typography>
            </Container>
            <Footer />
        </React.Fragment>  
    );
}