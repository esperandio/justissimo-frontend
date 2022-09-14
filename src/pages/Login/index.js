import './login.css';
import React, { useState } from 'react';
import api from '../../services/api';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import { TitleJustissimo, TitlePage } from '../../components/Utils/title';

const useStyles = makeStyles((theme) => ({
    paper: {
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
    const [senha, setSenha] = useState('');
    const [redirect, setState] = useState(false);
    
    async function handleLogin(e) {
        
        e.preventDefault();
        
        const dados = {
            email,
            senha
        };
        
        try {
            
            // Verifica se todos os campos foram preenchidos
            if (email !== "" && senha !== "") {
                // Envia ao backend/api os dados inseridos no login
                const login = await api.post('login', dados);
                // Pega o token
                const login_token = (login).data.token;
                // Pega o tipo do usuario
                const tipo_usuario = (login).data.tipo_usuario;
                const id_usuario = login.data.id_usuario;
                const url_foto_perfil = login.data.url_foto_perfil;
                
                // Seta o token na sessionStorage
                sessionStorage.setItem('token', login_token);
                sessionStorage.setItem('tipo_usuario', tipo_usuario);
                sessionStorage.setItem('id_usuario', id_usuario);
                sessionStorage.setItem('url_foto_perfil', url_foto_perfil);
                
                // Pega o id e seta na sessionStorage, de acordo o tipo do usuario
                if (tipo_usuario === 'Cliente') {
                    const id_cliente = (login).data.id_cliente;
                    sessionStorage.setItem('id_cliente', id_cliente);
                } else if (tipo_usuario === 'Advogado') {
                    const id_advogado = (login).data.id_advogado;
                    sessionStorage.setItem('id_advogado', id_advogado);
                }
    
                // Verifica o 'status code' recebido
                switch ((login).status) {
                    case 200:
                        setState({ redirect: true });
                        break;
                    default:
                        alert(`🤨 Algo deu errado! Tente novamente mais tarde`);
                        break;
                }

            } else {
                alert('Preencha todos os campos!')
            }
        } catch (error) {
            if (error.response.status === 401) {
                alert("Login Inválido! " + error.response.data.message); 
            }
            else {
                alert("Login Inválido! " + error.message);
            } 
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
            <TitleJustissimo/>
            <TitlePage internal="ENTRAR" />
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
                        type="password"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="senha"
                        label="Senha"
                        id="senha"
                        autoComplete="current-senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
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
                            <Link href="redefinirsenha/email" variant="body2">
                                {"Esqueceu a senha?"}
                            </Link>
                        </Grid>
                    </Grid>

                </form>
            </div>
        </Container>
    );
}
