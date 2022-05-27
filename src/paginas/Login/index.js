import './login.css';
import React, { useState } from 'react';
import api from '../../service/api';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';

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

    const [email, setEmail] = useState('');
    const [password, setSenha] = useState('');
    const [redirect, setState] = useState(false);
    
    async function handleLogin(e) {
        
        e.preventDefault();
        
        const dados = {
            email,
            password
        };
        
        try {
            
            // Verifica se todos os campos foram preenchidos
            if (email !== "" && password !== "") {
                
                // Envia ao backend/api os dados inseridos no login
                const login = api.post('login', dados);
                // Pega o token
                const login_token = (await login).data.token;
                // Seta o token na sessionStorage
                sessionStorage.setItem('token', login_token);
    
                // Verifica o 'status code' recebido
                switch ((await login).status) {
                    case 200:
                        setState({ redirect: true });
                        break;
                    case 401:
                        alert('😐 Usuário não cadastrado');
                        break;
                    default:
                        alert(`🤨 Algo deu errado! Tente novamente mais tarde`);
                        break;
                }

            } else {
                alert('Preencha todos os campos!')
            }

        } catch (error) {
            alert("Login Inválido! " + error.message);
        }
    }

    // Se o 'login' for aceito, redireciona para a tela de home
    if (redirect) {
        return <Redirect to='home' />;
    }

    return (
        // Form
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} /*onSubmit={handleLogin}*/>

                    {/* Input 'Email' */}
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
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    
                    {/* Input 'Senha' */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setSenha(e.target.value)}
                    />

                    {/* Checkbox 'Manter conectado' */}
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Manter conectado"
                    />

                    {/* Button 'Login' */}
                    <Button className={classes.submit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                    >
                    Login
                    </Button>

                    {/* href (link) 'Esqueceu a senha' */}
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
