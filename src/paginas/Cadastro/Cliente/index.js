import React, { useState } from 'react';
import api from '../../../service/api';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import InputLabel from '@material-ui/core/InputLabel';
import Header from '../../Main/Header';
import Footer from '../../Main/Footer';
import { Redirect } from 'react-router-dom';
import { TitleJustissimo, TitlePage } from '../../../components/Utils/title';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ptBR } from "date-fns/locale";

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

export default function CadastroUsuario() {

    const classes = useStyles();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [dt_nascimento, setNascimento] = useState(new Date());
    const [cpf, setCPF] = useState('');
    const [cnpj, setCNPJ] = useState('');
    const [cep, setCEP] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [redirect, setState] = useState(false);

    async function handleCadastro(e) {
        e.preventDefault();

        const dt_nascimento_formatado = `${dt_nascimento.getUTCFullYear()}` 
            + "-"
            + `${dt_nascimento.getUTCMonth() + 1}`.padStart(2, 0)
            + "-"
            + `${dt_nascimento.getDate()}`.padStart(2, 0);

        const dados = {
            nome,
            email,
            senha,
            dt_nascimento: dt_nascimento_formatado,
            cpf,
            cnpj,
            cep,
            cidade,
            estado
        };

        try {
            
            // Verifica se todos os campos foram preenchidos
            if (nome !== "" &&
                email !== "" && 
                senha !== "" &&
                dt_nascimento !== "" &&
                cpf !== "" &&
                cep !== "" &&
                cidade !== "" &&
                estado !== "") {
                    
                // Envia ao backend/api os dados inseridos no cadastro
                const clients = await api.post('clients', dados);
    
                // Verifica o 'status code' recebido
                switch ((clients).status) {
                    case 201:
                        alert("Cadastro realizado com sucesso!"); 
                        setState({ redirect: true });
                        break;
                    default:
                        
                }

            } else {
                alert('Preencha todos os campos!')
            }
        } catch (error) {
            if (error.response.status === 400) {
                alert("Cadastro Inválido! " + error.response.data.message); 
            }
            else {
                alert("Cadastro Inválido! " + error.message);
            } 
        }

    }

    // Se o 'login' for aceito, redireciona para a tela de home
    if (redirect) {
        return <Redirect to='../login' />;
    }
    
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Cadastrar Cliente" />
                <TitleJustissimo/>
                <TitlePage internal="Cadastro de cliente" />

                <form onSubmit={handleCadastro}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        required
                                        id="Nome"
                                        label="Nome"
                                        placeholder="Digite o nome completo"
                                        multiline
                                        variant="outlined"
                                        value={nome}
                                        onChange={e => setNome(e.target.value)}
                                        margin="normal"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                                        <DatePicker
                                            label="Data de nascimento"
                                            value={dt_nascimento}
                                            onChange={newValue => setNascimento(newValue)}
                                            renderInput={(params) => <TextField {...params} variant="outlined" margin="normal" />}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth className={classes.margin}>
                                    <InputLabel id="Tipo"></InputLabel>
                                    <TextField
                                        id="CPF"
                                        label="CPF"
                                        placeholder="Digite apenas o CPF"
                                        multiline
                                        variant="outlined"
                                        value={cpf}
                                        onChange={e => setCPF(e.target.value)}
                                        margin="normal"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth className={classes.margin}>
                                    <InputLabel id="Tipo"></InputLabel>
                                    <TextField
                                    
                                        id="CNPJ"
                                        label="CNPJ"
                                        placeholder="Digite apenas o CNPJ"
                                        multiline
                                        variant="outlined"
                                        value={cnpj}
                                        onChange={e => setCNPJ(e.target.value)}
                                        margin="normal"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth className={classes.margin}>
                                    <InputLabel id="Tipo"></InputLabel>
                                    <TextField
                                        required
                                        id="CEP"
                                        label="CEP"
                                        placeholder="Digite apenas o CEP"
                                        multiline
                                        variant="outlined"
                                        value={cep}
                                        onChange={e => setCEP(e.target.value)}
                                        margin="normal"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        id="Estado"
                                        label="Estado"
                                        placeholder="Digite seu Estado"
                                        multiline
                                        variant="outlined"
                                        value={estado}
                                        onChange={e => setEstado(e.target.value)}
                                        margin="normal"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        id="Cidade"
                                        label="Cidade"
                                        placeholder="Nome da Cidade"
                                        multiline
                                        variant="outlined"
                                        value={cidade}
                                        onChange={e => setCidade(e.target.value)}
                                        margin="normal"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        required
                                        id="email"
                                        label="E-mail"
                                        placeholder="meuemail@email.com"
                                        multiline
                                        variant="outlined"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        margin="normal"
                                    />
                                </FormControl>
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="senha"
                                        label="Senha"
                                        type="password"
                                        id="senha"
                                        autoComplete="current-senha"
                                        value={senha}
                                        onChange={e => setSenha(e.target.value)}
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

