import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from '../../Main/Header';
import Footer from '../../Main/Footer';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    input: {
        display: 'none',
    },
}));

export default function CadastroDivulgacao() {
    const classes = useStyles();
    const [NOME, setNome] = useState('');

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Cadastrar divulgação" />
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth className={classes.margin}>
                                        <TextField
                                            required
                                            id="Nome"
                                            label="Digite o título da sua causa"
                                            placeholder="Título da causa"
                                            multiline
                                            variant="outlined"
                                            value={NOME}
                                            onChange={e => setNome(e.target.value)}
                                            margin="normal"
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth className={classes.margin}>
                                        <TextField
                                            required
                                            id="Nome"
                                            label="Área de atuação"
                                            placeholder="Área de atuação"
                                            multiline
                                            variant="outlined"
                                            value={NOME}
                                            onChange={e => setNome(e.target.value)}
                                            margin="normal"
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth className={classes.margin}>
                                        <TextField
                                            required
                                            id="Nome"
                                            label="Descrição"
                                            placeholder="Descreva a sua causa"
                                            multiline
                                            rows={5}
                                            variant="outlined"
                                            value={NOME}
                                            onChange={e => setNome(e.target.value)}
                                            margin="normal"
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                <Footer />
            </Container>
        </React.Fragment>
    );
}