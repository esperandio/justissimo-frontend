import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from '../../Main/Header';
import Footer from '../../Main/Footer';
import { TitleJustissimo, TitlePage } from '../../../components/Utils/title';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ptBR } from "date-fns/locale";
import Autocomplete from '@mui/material/Autocomplete';
import InputCnpjMask from '../../../components/Utils/mask/inputCnpjMask';
import InputCpfMask from '../../../components/Utils/mask/inputCpfMask';
import InputLabel from '@material-ui/core/InputLabel';
import InputCepMask from '../../../components/Utils/mask/inputCepMask';
import InputTelefone from '../../../components/Utils/mask/inputTelefoneMask';
import api from '../../../service/api';
import { Redirect } from 'react-router-dom';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';

const steps = ['Dados pessoais', 'Dados da OAB', 'Dados de acesso'];

export default function CadastroAdvogado() {
    const [nome, setNome] = useState('');
    const [dt_nascimento, setNascimento] = useState(null);
    const [tipoPessoa, setTipoPessoa] = useState('Física');
    const [cpf, setCPF] = useState('');
    const [cnpj, setCNPJ] = useState('');
    const [cep, setCEP] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [nr_cna, setNumeroCNA] = useState('');
    const [estado_cna, setEstadoCNA] = useState('');
    const [tel_celular, setTelefoneCelular] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
    const [redirect, setState] = useState(false);

    const [activeStep, setActiveStep] = useState(0);

    const [tiposPessoa] = useState(['Física', 'Jurídica']);
    const [estados] = useState(['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']);

    async function handleCadastro(e) {
        e.preventDefault();

        if (senha !== senhaConfirmacao) {
            alert(`A senha e confirmação de senha não conferem!`);
            return;
        }

        const dt_nascimento_formatado = `${dt_nascimento.getUTCFullYear()}` 
            + "-"
            + `${dt_nascimento.getUTCMonth() + 1}`.padStart(2, 0)
            + "-"
            + `${dt_nascimento.getDate()}`.padStart(2, 0);
        
        const dados = {
            nome,
            dt_nascimento: dt_nascimento_formatado,
            cpf: cpf.replace(/\D/g, ""),
            cnpj: cnpj.replace(/\D/g, ""),
            cidade,
            estado,
            cep: cep.replace(/\D/g, ""),
            senha,
            email,
            nr_cna,
            uf_cna: estado_cna,
            tel_celular: tel_celular.replace(/\D/g, ""),
            areas: [1],
            info: "Teste"
        }

        try {   
            // Envia ao backend/api os dados inseridos no cadastro
            const response = await api.post('lawyers', dados);

            // Verifica o 'status code' recebido
            switch ((response).status) {
                case 201:
                    alert("Cadastro realizado com sucesso!"); 
                    setState({ redirect: true });
                    break;
                default:   
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

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    async function handleNext(e) {
        e.preventDefault();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        if (activeStep >= (steps.length - 1)) {
            handleCadastro(e);
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
                <Header title="Cadastrar Advogado" />
                <TitleJustissimo />
                <TitlePage internal="Cadastro de advogado" />

                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};

                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                <form onSubmit={handleNext}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container spacing={1}>
                            {/* 1ª etapa */}
                            {activeStep == 0 && (
                                <>
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
                                                    renderInput={(params) => <TextField {...params} required variant="outlined" margin="normal" />}
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
                                            {tipoPessoa === "Física"
                                                ? <InputCpfMask value={cpf} required onChange={e => setCPF(e.target.value)} />
                                                : <InputCnpjMask value={cnpj} required onChange={e => setCNPJ(e.target.value)} />
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
                                                value={estado}
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

                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="Telefone"></InputLabel>
                                            <InputTelefone
                                                value={tel_celular}
                                                onChange={e => setTelefoneCelular(e.target.value)}
                                                required
                                            />
                                        </FormControl>
                                    </Grid>
                                </>
                            )}

                            {/* 2ª etapa */}
                            {activeStep == 1 && (
                                <>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth>
                                            <TextField
                                                required
                                                id="nr_cna"
                                                label="CNA"
                                                placeholder="N° do CNA"
                                                variant="outlined"
                                                value={nr_cna}
                                                onChange={e => setNumeroCNA(e.target.value)}
                                                margin="normal"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth>
                                            <Autocomplete
                                                options={estados}
                                                value={estado_cna}
                                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                                onChange={ (_, v) => { setEstadoCNA(v); } }
                                                renderInput={(params) => <TextField {...params} required variant="outlined" margin="normal" multiline label="Estado do CNA" />}
                                            />
                                        </FormControl>
                                    </Grid>
                                </>
                            )}

                            {/* 3ª etapa */}
                            {activeStep >= 2 && (
                                <>
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
                                        <span>Mínimo 8 caracteres</span> <br/>
                                        <span>Caracteres maiúsculos</span> <br/>
                                        <span>Caracteres mínusculos</span> <br/>
                                        <span>Símbolos ou números</span> <br/>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            variant="contained"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Voltar
                        </Button>

                        { activeStep >= (steps.length - 1) 
                            ? <>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    startIcon={<SaveIcon />}
                                >
                                    Cadastrar
                                </Button>
                            </>
                            : <>
                                <Button 
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Próximo
                                </Button>
                            </>
                        }
                    </Box>
                </form>
                <Footer />

            </Container>
        </React.Fragment>
    );
}