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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Header from '../../../Main/Header';
import Footer from '../../../Main/Footer';
//import validator from 'validator';

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
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    input: {
        display: 'none',
    },
}));

export default function CadastroUsuarioDados() {

    function converterDoisDigitos(num) {
        return num.toString().padStart(2, '0');
    }
    
    function formatarData(date) {
        return [
          date.getFullYear(),
          converterDoisDigitos(date.getMonth() + 1),
          converterDoisDigitos(date.getDate()),
        ].join('-');
    }
      
    const classes = useStyles();
    const [nome, setNome] = useState('');
    const [dt_nascimento, setDataNascimento] = useState(formatarData(new Date()));
    const [cpf, setCpfCnpj] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCep] = useState('');
    const [nr_cna, setRegistroCna] = useState('');
    const [uf_cna, setUfCna] = useState('');
    const [tel_celular, setTelefone] = useState('');
    const [area_atuacao, setArea] = useState('');

    async function handleCadastro(e) {
        e.preventDefault();

        const dados = {
            nome,
            dt_nascimento,
            cpf,
            cnpj: "",
            cidade,
            estado,
            cep,
            nr_cna,
            uf_cna,
            tel_celular,
            area_atuacao,
        };

        try {
            console.log(dados);
            const response = await api.post('lawyers', dados);
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
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        required
                                        id="nomeCompleto"
                                        label="Nome completo"
                                        placeholder="Digite o nome completo"
                                        multiline
                                        variant="outlined"
                                        value={nome}
                                        onChange={e => setNome(e.target.value)}
                                        
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        required
                                        id="dataNascimento"
                                        label="Data de nascimento"
                                        placeholder="Data de nascimento"
                                        multiline
                                        variant="outlined"
                                        value={dt_nascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                        
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        required
                                        label="Registro da CNA"
                                        placeholder="Digite o Registro da CNA"
                                        multiline
                                        variant="outlined"
                                        value={nr_cna}
                                        onChange={e => setRegistroCna(e.target.value)}
                                        
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth variant="outlined"  className={classes.margin}>
                                    <InputLabel id="ufcna">UF da CNA</InputLabel>
                                    <Select
                                        required
                                        label="UF da CNA"
                                        multiline
                                        variant="outlined"
                                        value={uf_cna}
                                        onChange={e => setUfCna(e.target.value)}
                                        
                                    >
                                        <MenuItem value="SC">Santa Catarina</MenuItem>
                                        <MenuItem value={2}>São Luís</MenuItem>
                                        <MenuItem value={3}>São Paulo</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        required
                                        label="CPF/CNPJ"
                                        placeholder="Digite o CPF/CNPJ"
                                        multiline
                                        variant="outlined"
                                        value={cpf}
                                        onChange={e => setCpfCnpj(e.target.value)}
                                        
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        id="Telefone"
                                        label="Telefone"
                                        placeholder="+55 00 999999999"
                                        multiline
                                        variant="outlined"
                                        value={tel_celular}
                                        onChange={e => setTelefone(e.target.value)}
                                        
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        id="CEP"
                                        label="CEP"
                                        placeholder="CEP"
                                        multiline
                                        variant="outlined"
                                        value={cep}
                                        onChange={e => setCep(e.target.value)}
                                        
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        id="Cidade"
                                        label="Cidade"
                                        placeholder="Cidade"
                                        multiline
                                        variant="outlined"
                                        value={cidade}
                                        onChange={e => setCidade(e.target.value)}
                                        
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        id="Estado"
                                        label="Estado"
                                        placeholder="Estado"
                                        multiline
                                        variant="outlined"
                                        value={estado}
                                        onChange={e => setEstado(e.target.value)}
                                        
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        id="Area"
                                        label="Área"
                                        placeholder="Área de Atuação"
                                        multiline
                                        variant="outlined"
                                        value={area_atuacao}
                                        onChange={e => setArea(e.target.value)}
                                        
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <FormControl className={classes.margin}>
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

