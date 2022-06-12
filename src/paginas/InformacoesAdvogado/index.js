import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import  TitleJustissimo  from '../../components/Utils/Title/title_justissimo';
import { Rating } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Main/Header';
import logo from '../../logo.svg';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import api from '../../service/api';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    user: {
        width: '40vh',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function InformacoesAdvogado() {
    const classes = useStyles();

    const [advogado, setAdvogado] = useState([]);

    useEffect(() => {
        async function buscarInformacoesAdvogado() {
            const resultado = await api.get('lawyers/3');
            setAdvogado(resultado.data);
        }

        buscarInformacoesAdvogado();
    },[]);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Informações do advogado" />
                <div className={classes.paper}>
                    <TitleJustissimo/>
                    <img src={logo} className={classes.user} alt="logo" />
                    <h1>Nome completo</h1>
                    <Rating 
                        id="nota"
                        name="nota" 
                        size='large'
                        autoFocus
                        readOnly
                        value={4}
                    />
                    <p>50 avaliações</p>
                </div>

                <Divider/>

                <div>
                    <h2>Descrição</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis deleniti quidem dolorem soluta non quis, magnam facilis magni error totam ullam fugit tenetur necessitatibus autem explicabo hic debitis labore corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, alias culpa tenetur eveniet nesciunt magni ipsum illo id molestiae dignissimos maiores doloribus quos optio dolore laudantium magnam quod! Porro, officiis.</p>
                    <p>E-mail: teste@teste.com</p>
                </div>

                <Grid item xs={12} sm={6}>
                    <Button className={classes.submit}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Entrar em contato
                    </Button>

                    {' '}

                    <Button className={classes.submit}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Agendar uma consulta
                    </Button>
                </Grid>
            </Container>
        </React.Fragment>
    );
}