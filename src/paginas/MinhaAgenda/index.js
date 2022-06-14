import React, { useState } from 'react';
import api from '../../service/api';
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
import Header from '../Main/Header';
import Footer from '../Main/Footer';
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

export default function CadastroUsuario() {

    const classes = useStyles();
    const [nome, setNome] = useState('');
    const [causa, setCausa] = useState('');
    const [data, setData] = useState('');
    const [semanal, setSemanal] = useState('');
    const [hora, setHora] = useState('');
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
    const [id_tpouser, setTipo] = useState('');
    const [redirect, setState] = useState(false);

    async function handleCadastro(e) {
        e.preventDefault();

        const dados = {
            nome,
            causa,
            data,
            semanal,
            hora,
            email
        };

    //     try {
            
    //         // Verifica se todos os campos foram preenchidos
    //         if (nome !== "" &&
    //             email !== "" && 
    //             senha !== "" &&
    //             dt_nascimento !== "" &&
    //             cpf !== "" &&
    //             cep !== "" &&
    //             cidade !== "" &&
    //             estado !== "") {
                    
    //             // Envia ao backend/api os dados inseridos no cadastro
    //             const clients = await api.post('clients', dados);
    
    //             // Verifica o 'status code' recebido
    //             switch ((clients).status) {
    //                 case 201:
    //                     alert("Cadastro realizado com sucesso!"); 
    //                     setState({ redirect: true });
    //                     break;
    //             }

    //         } else {
    //             alert('Preencha todos os campos!')
    //         }
    //     } catch (error) {
    //         if (error.response.status == 400) {
    //             alert("Cadastro Inválido! " + error.response.data.message); 
    //         }
    //         else {
    //             alert("Cadastro Inválido! " + error.message);
    //         } 
    //     }

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
                <form onSubmit={handleCadastro}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        id="Nome"
                                        multiline
                                        variant="outlined"
                                        value={nome}
                                        onChange={e => setNome(e.target.value)}
                                        margin="normal"
                                    />
                                </FormControl>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        id="Causa"
                                        multiline
                                        variant="outlined"
                                        value={causa}
                                        onChange={e => setCausa(e.target.value)}
                                        margin="normal"
                                    />
                                </FormControl>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        id="Data"
                                        multiline
                                        variant="outlined"
                                        value={data}
                                        onChange={e => setData(e.target.value)}
                                        margin="normal"
                                    />
                                </FormControl>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        id="Semanal"
                                        multiline
                                        variant="outlined"
                                        value={semanal}
                                        onChange={e => setSemanal(e.target.value)}
                                        margin="normal"
                                    />
                                </FormControl>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        id="hora"
                                        multiline
                                        variant="outlined"
                                        value={hora}
                                        onChange={e => setHora(e.target.value)}
                                        margin="normal"
                                    />
                                </FormControl>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        id="Email"
                                        multiline
                                        variant="outlined"
                                        value={nome}
                                        onChange={e => setEmail(e.target.value)}
                                        margin="normal"
                                    />
                                </FormControl>
                                <FormControl>
                                    <Button className={classes.submit}
                                        variant="contained"
                                        color="red"
                                        type="submit"
                                        startIcon={<SaveIcon />}>
                                        ENCERRAR
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