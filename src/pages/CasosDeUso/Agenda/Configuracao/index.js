import React, { useState } from "react";
import { Container, TextField } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import { TitlePage } from "../../../../components/Utils/title";
import api from "../../../../services/api";
import Header from "../../../Main/Header";
import Footer from "../../../Main/Footer";
import { ValidarAutenticacaoAdvogado } from "../../../../components/ValidarAutenticacao"
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import MuiAlert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ConfiguracaoAgenda() {
    
  // dias inserir
  let dias_inserir = [];
  function setDiasInserir(diaInserirDados) {
    dias_inserir.push(diaInserirDados)
  }


  const [hora_inicio, setHorarioInicio] = useState("");
  const [hora_final, setHorarioFinal] = useState("");
  const [horarios] = useState([
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", 
    "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30",
    "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", 
    "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", 
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", 
    "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", 
    "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"]);

  const [dia, setDia] = useState("");
  const [diaInicio, setDiaInicio] = useState("");
  const [diaFim, setDiaFim] = useState("");
  const [dias] = useState(["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]);
  const [dias_api_format] = useState(["segunda", "terca", "quarta", "quinta", "sexta"]);

  const [duracao, setDuracao] = useState(0);
  const [duracoes] = useState([
    "30", "45", "60", "75", "90",
    "105", "120", "135", "150", "165"]);

  const fk_advogado = parseInt(sessionStorage.getItem("id_advogado"));

  async function handleSubmit(e) {
        
    e.preventDefault();
        
    if(diaInicio === diaFim) {
      setDia(diaInicio.toLowerCase());
      setDiasInserir({
        dia,
        hora_inicio,
        hora_final,
        duracao
      });
    }
    else {
      let indexInicio = dias.indexOf(diaInicio);
      let indexFim = dias.indexOf(diaFim);

      dias_api_format.map((dia, index) =>{
        if((index >= indexInicio) && (index <= indexFim)){ 
          setDia(dia);
          setDiasInserir({
            dia,
            hora_inicio,
            hora_final,
            duracao
          });
        }

        return dia;
      });
    }

    const dados = {
      fk_advogado,
      dias_inserir
    };

    const dadosApi = {
      dados
    };
        
    try {
            
      // Verifica se todos os campos foram preenchidos
      if (hora_inicio !== "" && hora_final !== "" && duracao !== 0) {

        // Envia ao backend/api os dados inseridos na configuração da agenda
        const configuracaoAgenda = await api.post("lawyers/config-schedule", dadosApi);
    
        // Verifica o 'status code' recebido
        switch ((configuracaoAgenda).status) {
        case 200:
          alert("Cadastro de horarios efetuado com sucesso!");
          break;
        default:
          alert("🤨 Algo deu errado! Tente novamente mais tarde");
          break;
        }

      } else {
        alert("Preencha todos os campos!")
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

  function handleChangeHorarioInicio(_, values) {
    setHorarioInicio(values);
  }
    
  function handleChangeHorarioFinal(_, values) {
    setHorarioFinal(values);
  }

  function handleChangeDuracao(_, values) {
    setDuracao(parseInt(values));
  }

  return (
    <>
      <ValidarAutenticacaoAdvogado />
      <Header />
      <Container maxWidth="lg">
        <TitlePage internal="Configuração da Agenda" />

        <form onSubmit={ handleSubmit }>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Alert severity="info">
                Alterações nas configurações irão valer apenas para novos agendamentos. Agendamentos já existentes não serão afetados.
              </Alert>
            </Grid>

            <Grid item xs={12} sm container spacing={1}>
              <Grid item sm={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Perído da semana em que realiza atendimentos:
                </Typography> 
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={dias}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  onChange={ (_, v) => { setDiaInicio(v); } }
                  renderInput={(params) => <TextField {...params} required variant="outlined" margin="normal" label="De:" />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={dias}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  onChange={ (_, v) => { setDiaFim(v); } }
                  renderInput={(params) => <TextField {...params} required variant="outlined" margin="normal" label="Até:" />}
                />
              </Grid>

              <Grid item sm={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Horário inicial e final de atendimento:
                </Typography> 
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={horarios}
                  renderInput={(params) => <TextField {...params} required variant="outlined" margin="normal" label="Horário inicial dos atendimentos" />}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  onChange={ handleChangeHorarioInicio }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={horarios}
                  renderInput={(params) => <TextField {...params} required variant="outlined" margin="normal" label="Horário final dos atendimentos" />}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  onChange={ handleChangeHorarioFinal }
                />
              </Grid>

              <Grid item sm={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Tempo (minutos) de cada sessão de atendimento:
                </Typography> 
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={duracoes}
                  required
                  renderInput={(params) => {
                    return <TextField 
                      {...params} 
                      required 
                      variant="outlined" 
                      margin="normal" 
                      label="Duração do agendamento" 
                    />}}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  onChange={ handleChangeDuracao }
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  startIcon={<SaveIcon />}
                >
                  Salvar configuração
                </Button>
              </Grid>
            </Grid>
          </Grid>              
        </form>
      </Container>
      <Footer />
    </>
  );
}
