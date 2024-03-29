import React, { useState, useEffect } from "react";
import Header from "../../Main/Header";
import Footer from "../../Main/Footer";
import { TitlePage } from "../../../components/Utils/title";
import SaveIcon from "@material-ui/icons/Save";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ptBR } from "date-fns/locale";
import InputCnpjMask from "../../../components/Utils/mask/inputCnpjMask";
import InputCpfMask from "../../../components/Utils/mask/inputCpfMask";
import InputCepMask from "../../../components/Utils/mask/inputCepMask";
import InputTelefone from "../../../components/Utils/mask/inputTelefoneMask";
import api from "../../../services/api";
import { Redirect } from "react-router-dom";
import TextFieldPassword from "../../../components/TextFieldPassword"
import {
  TextField,
  Autocomplete,
  Stepper,
  Step,
  StepLabel,
  Stack
} from "@mui/material";
import { 
  Container, 
  Grid,
  FormControl,
  Button,
  InputLabel
} from "@material-ui/core";

import AlertError from "../../../components/alerts/AlertError";
import AlertSuccess from "../../../components/alerts/AlertSuccess";

const steps = ["Dados pessoais", "Dados da OAB", "Dados de acesso"];

export default function CadastroAdvogado() {
  const [nome, setNome] = useState("");
  const [dt_nascimento, setNascimento] = useState(null);
  const [tipoPessoa, setTipoPessoa] = useState("Física");
  const [cpf, setCPF] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [cep, setCEP] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [areas_atuacao, setAreasAtuacao] = useState([]);
  const [nr_cna, setNumeroCNA] = useState("");
  const [estado_cna, setEstadoCNA] = useState("");
  const [info, setInfo] = useState("");
  const [tel_celular, setTelefoneCelular] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
  const [redirect, setState] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  const [areas, setAreas] = useState([]);
  const [tiposPessoa] = useState(["Física", "Jurídica"]);
  const [estados] = useState(["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
    "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]);

  useEffect(() => {
    async function buscarAreas() {
      const resultado = await api.get("areas");
      setAreas(resultado.data);
    }

    buscarAreas();
  }, []);

  function handleAutocompleteAreaChange(event, values) {
    setAreasAtuacao(values);
  }

  async function handleCadastro(e) {
    e.preventDefault();

    if (senha !== senhaConfirmacao) {
      await AlertError("A senha e confirmação de senha não conferem!");
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
      areas: areas_atuacao.map(x => x.id),
      info
    }

    try {   
      // Envia ao backend/api os dados inseridos no cadastro
      const response = await api.post("lawyers", dados);

      // Verifica o 'status code' recebido
      switch ((response).status) {
      case 201:
        await AlertSuccess("Cadastro realizado! Você será redirecionado para a tela de login.");
        setState({ redirect: true });
        break;
      default:   
      }
    } catch (error) {
      if (error.response.status === 400) {
        await AlertError(error.response.data.message);
      }
      else {
        await AlertError(error.message)
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
    <>
      <Header />
      <Container maxWidth="lg">
        <TitlePage internal="Cadastro de advogado" />

        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
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
              {activeStep === 0 && (
                <>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        id="Nome"
                        label="Nome"
                        placeholder="Digite o nome completo"
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
                        renderInput={(params) => <TextField {...params}  variant="outlined" margin="normal" label="Tipo de pessoa" />}
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
                        renderInput={(params) => <TextField {...params} required variant="outlined" margin="normal" label="Estado" />}
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
              {activeStep === 1 && (
                <>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <Autocomplete
                        multiple
                        options={areas.map((x) => { 
                          return {
                            label: x.titulo,
                            id: x.id_area_atuacao
                          }
                        })}
                        onChange={ handleAutocompleteAreaChange }
                        value={areas_atuacao}
                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
                        renderInput={(params) => <TextField {...params} required={areas_atuacao.length === 0} label="Área de atuação" />}
                      />
                    </FormControl>
                  </Grid>

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
                        renderInput={(params) => <TextField {...params} required variant="outlined" margin="normal" label="Estado do CNA" />}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        multiline
                        label="Descrição do perfil"
                        variant="outlined"
                        value={info}
                        onChange={e => setInfo(e.target.value)}
                        margin="normal"
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
                        type="email"
                        placeholder="meuemail@email.com"
                        variant="outlined"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        margin="normal"
                      />
                    </FormControl>
                  </Grid>
                                    
                  <Grid item xs={12} sm={6}>
                    <TextFieldPassword onChange={e => setSenha(e.target.value)}></TextFieldPassword>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextFieldPassword onChange={e => setSenhaConfirmacao(e.target.value)}></TextFieldPassword>
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

          <br />

          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={1}
          >
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
          </Stack>
        </form>
      </Container>
      <Footer />
    </>
  );
}