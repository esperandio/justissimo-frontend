import React, { useState } from 'react';
import api from '../../../../service/api';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import Header from '../../../Main/Header';
import Footer from '../../../Main/Footer';

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

export default function CadastroUsuarioAcesso() {

    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmar_senha, setConfirmarSenha] = useState('');
    // const [erroEmail, setErroEmail] = useState('')
    // const validarEmail = (e) => {
    //     var EMAIL = e.target.value
    // }
    async function handleCadastro(e) {
        e.preventDefault();

        const dados = {
            email,
            senha,
        };

        try {
            console.log(dados);
            const response = await api.post('usuario', dados);
            const id = response.data.id;
            console.log(response.data);
            alert("o id do usuario é " + id);
        } catch (error) {
            alert("Erro ao cadastrar usuario " + error.message);
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Cadastrar Advogado" />
                    <form onSubmit={handleCadastro}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm container spacing={1}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth className={classes.margin}>
                                        <TextField
                                            required
                                            label="E-mail"
                                            placeholder="meuemail@email.com"
                                            multiline
                                            variant="outlined"
                                            value={email}
                                            // onBlur={e => { validarEmail(e) }}
                                            onChange={e => setEmail(e.target.value)}
                                            margin="normal"
                                        />
                                        {/* <span style={{
                                            fontWeight: 'bold',
                                            color: 'red',
                                        }}>{erroEmail}</span> */}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth className={classes.margin}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="senha"
                                            label="Senha"
                                            type="password"
                                            autoComplete="current-password"
                                            value={senha}
                                            onChange={e => setSenha(e.target.value)}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth className={classes.margin}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="confirmar_senha"
                                            label="confirmar_senha"
                                            type="password"
                                            autoComplete="current-password"
                                            value={confirmar_senha}
                                            onChange={e => setConfirmarSenha(e.target.value)}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormControl>
                                        <Button className={classes.submit}
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            startIcon={<SaveIcon />}
                                        >
                                            Cadastrar
                                        </Button>
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