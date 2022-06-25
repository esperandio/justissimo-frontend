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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Header from '../../Main/Header';
import Footer from '../../Main/Footer';
//import validator from 'validator';
import { green } from '@material-ui/core/colors';
import { Redirect } from 'react-router-dom';

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

// 1° PASSO 
export default function CadastroUsuario() {

    const classes = useStyles();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [erroEmail, setErroEmail] = useState('')
    const validarEmail = (e) => {
        var EMAIL = e.target.value
        
        // if (validator.isEmail(EMAIL)) {
        //     setErroEmail('E-mail válido!')
        // } else {
        //     setErroEmail('Entre um E-mail válido!')
        // }
    }

    // 2° PASSO 
    const [senha, setSenha] = useState('');
    const [dt_nascimento, setNascimento] = useState('');
    const [cpf, setCPF] = useState('');
    const [cnpj, setCNPJ] = useState('');
    const [cep, setCEP] = useState('');
    const [tel_celular, setTelefone] = useState('');
    const [id_tpouser, setTipo] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [nr_cna, setNr_cna] = useState('');
    const [uf_cna, setUf_cna] = useState('');
    const [areas, setAreas] = useState([]);
    const [info, setInfo] = useState('');
    const [redirect, setState] = useState(false);

    async function handleCadastro(e) {
        e.preventDefault();

        // 3° PASSO 
        const dados = {
            nome,
            email,
            senha,
            dt_nascimento,
            cpf,
            cnpj,
            cidade,
            estado,
            cep,
            nr_cna,
            uf_cna,
            tel_celular,
            areas,
            info
        };

        try {
            
            // 4° PASSO
            // Verifica se todos os campos foram preenchidos
            if (nome !== "" &&
                email !== "" && 
                senha !== "" &&
                dt_nascimento !== "" &&
                cpf !== "" &&
                cep !== "" &&
                cidade !== "" &&
                estado !== "" &&
                nr_cna !== "" &&
                uf_cna !== "" &&
                tel_celular !== "" &&
                areas.length  == 0) {
                    
                // Envia ao backend/api os dados inseridos no cadastro
                const clients = await api.post('lawyers', dados);
    
                // Verifica o 'status code' recebido
                switch ((clients).status) {
                    case 201:
                        alert("Cadastro realizado com sucesso!"); 
                        setState({ redirect: true });
                        break;
                }

            } else {
                alert('Preencha todos os campos!')
            }
        } catch (error) {
            if (error.response.status == 400) {
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
    
    // 5° PASSO
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Cadastrar Advogado" />
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
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        required
                                        id="email"
                                        label="E-mail"
                                        placeholder="meuemail@email.com"
                                        multiline
                                        variant="outlined"
                                        value={email}
                                        onBlur={e => { validarEmail(e) }}
                                        onChange={e => setEmail(e.target.value)}
                                        margin="normal"
                                    />
                                    <span style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                    }}>{erroEmail}</span>
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

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        required
                                        id="Data de Nascimento"
                                        label="Data de Nascimento"
                                        placeholder="Coloca Data de Nascimento"
                                        multiline
                                        variant="outlined"
                                        value={dt_nascimento}
                                        onChange={e => setNascimento(e.target.value)}
                                        margin="normal"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={4}>
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

                            <Grid item xs={12} sm={4}>
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
                                        id="Nr_cna"
                                        label="Nr_cna"
                                        placeholder="Digite seu numero do CNA"
                                        multiline
                                        variant="outlined"
                                        value={nr_cna}
                                        onChange={e => setNr_cna(e.target.value)}
                                        margin="normal"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        id="Uf_cna"
                                        label="Uf_cna"
                                        placeholder="Digite seu UF do CNA"
                                        multiline
                                        variant="outlined"
                                        value={uf_cna}
                                        onChange={e => setUf_cna(e.target.value)}
                                        margin="normal"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        id="tel_celular"
                                        label="Telefone"
                                        placeholder="Digite seu numero do telefone"
                                        multiline
                                        variant="outlined"
                                        value={tel_celular}
                                        onChange={e => setTelefone(e.target.value)}
                                        margin="normal"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        id="areas"
                                        label="areas"
                                        placeholder="Digite a sua area"
                                        multiline
                                        variant="outlined"
                                        value={areas}
                                        onChange={e => setAreas(e.target.value)}
                                        margin="normal"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                            <textarea id="w3review" name="w3review" rows="8" cols="70">
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        id="info"
                                        label="info"
                                        placeholder="Descrição"
                                        multiline
                                        variant="outlined"
                                        value={info}
                                        onChange={e => setInfo(e.target.value)}
                                        margin="normal"
                                    />
                                </FormControl>
                            </textarea>
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

