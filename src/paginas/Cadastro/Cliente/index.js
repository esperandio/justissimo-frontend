import React, { useState } from 'react';
import api from '../../../service/api';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
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
import Autocomplete from '@mui/material/Autocomplete';
import InputCepMask from '../../../components/Utils/mask/inputCepMask';
import InputCnpjMask from '../../../components/Utils/mask/inputCnpjMask';
import InputCpfMask from '../../../components/Utils/mask/inputCpfMask';

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
    teste: {
        minHeight: '56px'
    }
}));

export default function CadastroUsuario() {

    const classes = useStyles();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
    const [dt_nascimento, setNascimento] = useState(null);
    const [cpf, setCPF] = useState('');
    const [cnpj, setCNPJ] = useState('');
    const [cep, setCEP] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [tipoPessoa, setTipoPessoa] = useState('F??sica');
    const [redirect, setState] = useState(false);

    const [estados] = useState(['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']);

    const [tiposPessoa] = useState(['F??sica', 'Jur??dica']);

    async function handleCadastro(e) {
        e.preventDefault();

        if (senha !== senhaConfirmacao) {
            alert(`A senha e confirma????o de senha n??o conferem!`);
            return;
        }

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
            cpf: cpf.replace(/\D/g, ""),
            cnpj: cnpj.replace(/\D/g, ""),
            cep: cep.replace(/\D/g, ""),
            cidade,
            estado
        };

        try {   
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
        } catch (error) {
            if (error.response.status === 400) {
                alert("Cadastro Inv??lido! " + error.response.data.message); 
            }
            else {
                alert("Cadastro Inv??lido! " + error.message);
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
                                <FormControl fullWidth>
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
                                <FormControl fullWidth>
                                    <Autocomplete
                                        options={ tiposPessoa }
                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                        onChange={ (_, v) => { setTipoPessoa(v); setCPF(""); setCNPJ("") } }
                                        clearIcon={ false }
                                        value={ tipoPessoa }
                                        renderInput={(params) => <TextField {...params}  variant="outlined" margin="normal" multiline label="Tipo de pessoa" />}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="Tipo"></InputLabel>
                                    {tipoPessoa === "F??sica"
                                        ? <InputCpfMask required onChange={e => setCPF(e.target.value)} />
                                        : <InputCnpjMask required onChange={e => setCNPJ(e.target.value)} />
                                    }
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="Tipo"></InputLabel>
                                    <InputCepMask  
                                        value={cep}
                                        onChange={e => setCEP(e.target.value)}
                                        required
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <Autocomplete
                                        options={estados}
                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                        onChange={ (_, v) => { setEstado(v); } }
                                        renderInput={(params) => <TextField {...params} required variant="outlined" margin="normal" multiline label="Estado" />}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <TextField
                                        required
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

                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
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
                                <FormControl fullWidth>
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

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="senha"
                                        label="Confirmar senha"
                                        type="password"
                                        id="senha"
                                        autoComplete="current-senha"
                                        value={senhaConfirmacao}
                                        onChange={e => setSenhaConfirmacao(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <span>M??nimo 8 caracteres</span> <br/>
                                <span>Caracteres mai??sculos</span> <br/>
                                <span>Caracteres m??nusculos</span> <br/>
                                <span>S??mbolos ou n??meros</span> <br/>
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

