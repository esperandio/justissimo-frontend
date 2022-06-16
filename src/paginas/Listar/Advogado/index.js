import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from '../../Main/Header';
import Footer from '../../Main/Footer';
import { makeStyles } from '@material-ui/core/styles';
import TitleJustissimo from '../../../components/Utils/Title/title_justissimo';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import logo from '../../../user.svg';
import api from '../../../service/api';
import { Rating } from '@mui/material';

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
    }
}));

export default function ListarAdvogado() {
    const classes = useStyles();

    const [nome, setNome] = useState("");
    const [advogados, setAdvogados] = useState([]);

    useEffect(() => {
        async function buscarAdvogados() {
            const resultado = await api.get(`lawyers`);
            setAdvogados(resultado.data);
        }

        buscarAdvogados();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const resultado = await api.get(`lawyers?nome=${nome}`);
            setAdvogados(resultado.data);
        } catch (error) {
            const mensagem_retorno_api = error?.response?.data?.message;

            if (mensagem_retorno_api == null) {
                alert(`🤨 Algo deu errado! Tente novamente mais tarde`);
                return ;
            }

            alert(mensagem_retorno_api);
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Cadastrar divulgação" />
                <div className={classes.paper}>
                    <TitleJustissimo/>

                    <h2>Busque advogados</h2>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        id="Pesquisa"
                                        label="Pesquise aqui"
                                        placeholder="Pesquise aqui"
                                        variant="outlined"
                                        margin="normal"
                                        value={nome}
                                        onChange={e => setNome(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <Button className={classes.submit}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    startIcon={<FilterAltIcon />}
                                    onClick={ handleSubmit }
                                >
                                    Filtrar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container spacing={1}>
                        {advogados.map((advogado)=>{
                            return  <Grid key={advogado.id_advogado} item xs={12} sm={4} className={classes.submit}>
                                        <div className={classes.paper}>
                                            <img src={logo} className={classes.user} alt="logo" />
                                            <h2>{advogado.nome}</h2>
                                            <Rating 
                                                id="nota"
                                                name="nota" 
                                                size='large'
                                                autoFocus
                                                readOnly
                                                value={advogado.nota}
                                            />
                                            <p>{advogado._count?.avaliacoes} avaliações</p>
                                        </div>
                                    </Grid>
                        })}
                        </Grid>
                    </Grid>
                </div>
                <Footer />
            </Container>
        </React.Fragment>
    );
}