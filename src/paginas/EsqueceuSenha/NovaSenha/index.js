import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import api from '../../../service/api';
import { Redirect } from 'react-router-dom';

// Style
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


export default function RedefinirSenha_NovaSenha() {
    
    const classes = useStyles();
    
    const [nova_senha, setNovaSenha] = useState('');
    const [confirmacao_nova_senha, setNovaSenhaConfirmacao] = useState('');
    const [redirect, setState] = useState(false);
    
    // Recupera o email da sessionStorage
    const email = window.sessionStorage.getItem('email');
    // Recupera o código de recuperação da sessionStorage
    const codigo_recuperacao = window.sessionStorage.getItem('codigo_recuperacao');
    
    /**
     * Limpa o email e o codigo de recuperacao da sessionStorage
     */
    function ClearSessionStorage() {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("codigo_recuperacao");
    }

    // Handle
    async function handleRecuperacaoSenha(e) {
        e.preventDefault();

        const dados = {
            email,
            codigo_recuperacao,

            nova_senha,
            confirmacao_nova_senha
        };

        try {
            if (nova_senha !== "" && confirmacao_nova_senha !== "") {
                // Verifica se a senha e confirmação de senha são diferentes
                if (nova_senha !== confirmacao_nova_senha) {
                    alert(`A senha e confirmação de senha não conferem!`);
                } else {
                    
                    // Envia ao backend/api os dados inseridos no login
                    const senha = await api.post('login/recovery/newpassword', dados);
                    
                    // Verifica o 'status code' recebido
                    switch ((senha).status) {
                        case 200:
                            alert(`Senha redefinida com sucesso!`);
                            
                            setState({ redirect: true });
                            
                            ClearSessionStorage();
                            
                            break;
                        default:
                            alert(`🤨 Algo deu errado! Tente novamente mais tarde`);
    
                            break;
                    }
                }


            } else {
                alert('Preencha todos os campos!')
            }
        } catch (error) {
            alert('Algo deu errado!');
        }
    }

    // Se o 'login' for aceito, redireciona para a tela da criação da nova senha
    if (redirect) {
        return <Redirect to='' />;
    }

    return (
        // Form
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} /*onSubmit={handleLogin}*/>

                    {/* Input 'Código de recuperação' */}
                    <TextField
                        type="password"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="nova_senha"
                        label="Nova senha"
                        name="nova_senha"
                        autoComplete="nova_senha"
                        autoFocus
                        value={nova_senha}
                        onChange={e => setNovaSenha(e.target.value)}
                    />

                    {/* Input 'Código de recuperação' */}
                    <TextField
                        type="password"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="confirmacao_nova_senha"
                        label="Confirmar a nova senha"
                        name="confirmacao_nova_senha"
                        autoComplete="confirmacao_nova_senha"
                        autoFocus
                        value={confirmacao_nova_senha}
                        onChange={e => setNovaSenhaConfirmacao(e.target.value)}
                    />

                    {/* Button 'Verificar' */}
                    <Button className={classes.submit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleRecuperacaoSenha}
                    >
                    MUDAR SENHA
                    </Button>

                </form>
            </div>
        </Container>
    );
}

