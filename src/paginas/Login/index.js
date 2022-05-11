import './login.css';
import React, { useState } from 'react';
//import api from '../Services/api';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    
    const classes = useStyles();
    const [EMAIL, getEmail] = useState('');
    const [SENHA, getSenha] = useState('');

    async function handleLogin(e) {
        e.preventDefault();

        // const dados = {
        //     EMAIL,
        //     SENHA
        // };

        // try {
        //     const response = await api.post('login', dados);
        //     //alert("Login valido! Status: " + response.status);
        //     window.open("/home", "_self")
        // } catch (error) {
        //     alert("Login Inválido " + error.message);
        // }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} onSubmit={handleLogin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={EMAIL}
                        onChange={e => getEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="senha"
                        label="Senha"
                        type="password"
                        id="senha"
                        autoComplete="current-password"
                        value={SENHA}
                        onChange={e => getSenha(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Manter conectado"
                    />
                        <Button className={classes.submit}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                        Login
                        </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="" variant="body2">
                                {"Esqueceu a senha?"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
