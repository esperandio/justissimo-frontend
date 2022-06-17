import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { TitleJustissimo }  from '../../components/Utils/title';
import { Rating } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Main/Header';
import logo from '../../user.svg';
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
        width: '20vh',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function InformacoesAdvogado() {
    const classes = useStyles();
    const params = useParams();

    const [advogado, setAdvogado] = useState({});
    const [habilitarAgendamento, setHabilitarAgendamento] = useState(false);

    useEffect(() => {
        async function buscarInformacoesAdvogado() {
            const resultado = await api.get(`lawyers/${params.id}`);
            setAdvogado(resultado.data);
        }

        buscarInformacoesAdvogado();
    },[params.id]);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Informações do advogado" />
                <div className={classes.paper}>
                    <TitleJustissimo/>
                    <img src={logo} className={classes.user} alt="logo" />
                    <h1>{advogado.nome}</h1>
                    <Rating 
                        id="nota"
                        name="nota" 
                        size='large'
                        autoFocus
                        readOnly
                        value={advogado.nota ?? 0}
                    />
                    <p>{advogado._count?.avaliacoes} avaliações</p>
                </div>

                <Divider/>

                <div>
                    <h2>Descrição</h2>
                    <p>{advogado.info}</p>
                    <p>E-mail: {advogado.usuario?.email}</p>
                </div>

                <Grid item xs={12} sm={6}>
                    {advogado.tel_celular != null 
                        ? (
                            <Button className={classes.submit}
                                variant="contained"
                                color="primary"
                                onClick={ () => { window.open(`https://api.whatsapp.com/send?phone=${advogado.tel_celular.replace(/\+/g, "")}`, '_blank'); } }
                            >
                                Entrar em contato
                            </Button>
                        )
                        : ""
                    }

                    {' '}

                    <Button className={classes.submit}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => setHabilitarAgendamento(true)}
                    >
                        Agendar uma consulta
                    </Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                    {habilitarAgendamento === true
                        ? (
                            "Horários diponíveis"
                        )
                        : ""
                    }
                </Grid>
            </Container>
        </React.Fragment>
    );
}