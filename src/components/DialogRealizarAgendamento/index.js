import React, { useState } from "react";
import { 
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { 
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { ptBR } from "date-fns/locale";
import api from "../../services/api";
import ButtonWithLoader from "../ButtonWithLoader";

export default function RealizarAgendamento({ open, advogado, areas, onClose }) {
  const [id_area_atuacao, setAreaAtuacao] = useState("");
  const [dataAgendamento, setDataAgendamento] = useState(new Date());
  const [exibirHorariosDisponiveis, setExibirHorariosDisponiveis] = useState(false);
  const [horarios, setHorarios] = useState([]);
  const [horarioAgendamento, setHorarioAgendamento] = useState("");
  const [observacao, setObservacao] = useState("");

  function handleClickFecharModalAgendamento() {
    setDataAgendamento(new Date());
    setAreaAtuacao("");
    setHorarioAgendamento("");
    setObservacao("");
    setExibirHorariosDisponiveis(false);

    onClose();
  }

  async function handleClickConfirmarAgendamento() {
    try {
      const fk_advogado = advogado?.id_advogado;
      const fk_cliente = parseInt(sessionStorage.getItem("id_cliente"));
      const fk_advogado_area = id_area_atuacao;
      const data_agendamento = `${dataAgendamento.getUTCFullYear()}` 
        + "-"
        + `${dataAgendamento.getUTCMonth() + 1}`.padStart(2, 0)
        + "-"
        + `${dataAgendamento.getDate()}`.padStart(2, 0);
      const horario = horarioAgendamento; 

      const dados = {
        fk_advogado,
        fk_cliente,
        fk_advogado_area,
        data_agendamento,
        horario,
        observacao
      }

      await api.post("clients/scheduling", dados);

      alert("Agendamento confirmado!!!");

      setDataAgendamento(new Date());
      setAreaAtuacao("");
      setHorarioAgendamento("");
      setObservacao("");
      setExibirHorariosDisponiveis(false);

      onClose();
    } catch (error) {
      const mensagem_retorno_api = error?.response?.data?.message;

      if (mensagem_retorno_api == null) {
        alert("🤨 Algo deu errado! Tente novamente mais tarde");
        return ;
      }

      alert(mensagem_retorno_api);
    }
  }

  function handleChangeDataAgendamento(newValue) {
    setDataAgendamento(newValue);

    setHorarios([]);
    setExibirHorariosDisponiveis(false);
  }

  async function handleClickBuscarHorarios() {
    if (id_area_atuacao === "") {
      return;
    }

    setExibirHorariosDisponiveis(false);

    const dataAgendamentoFormatada = `${dataAgendamento.getUTCFullYear()}` 
      + "-"
      + `${dataAgendamento.getUTCMonth() + 1}`.padStart(2, 0)
      + "-"
      + `${dataAgendamento.getDate()}`.padStart(2, 0);

    try {
      const horarios = await api.get(`hour-schedulings/${advogado?.id_advogado}?data_para_agendamento=${dataAgendamentoFormatada}`);

      setHorarios(horarios.data?.horarios_disponiveis ?? []);

      setExibirHorariosDisponiveis(true);
    } catch (error) {
      const mensagem_retorno_api = error?.response?.data?.message;

      if (mensagem_retorno_api == null) {
        alert("🤨 Algo deu errado! Tente novamente mais tarde");
        return ;
      }

      alert(mensagem_retorno_api);
    }
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Realizar agendamento</DialogTitle>

        <DialogContent>
          <DialogContentText>
            1° Passo - Selecionar a data do agendamento e área de atuação
          </DialogContentText>

          <br />

          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
              <DatePicker
                label="Data do agendamento"
                value={dataAgendamento}
                onChange={(newValue) => { handleChangeDataAgendamento(newValue) }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="Area">Área de atuação</InputLabel>
            <Select
              required
              labelId="Área de atuação"
              id="AreaSelect"
              multiline
              variant="outlined"
              value={id_area_atuacao}
              onChange={e => setAreaAtuacao(e.target.value)}
              label="Tipo de Usuario"
            >
              {areas.map((area)=>{
                return <MenuItem key={area.areaAtuacao.id_area_atuacao} value={area.areaAtuacao.id_area_atuacao}>{area.areaAtuacao.titulo}</MenuItem>
              })}
            </Select>
          </FormControl>

          <br />
          <br />

          <Button 
            variant="contained"
            color="primary"
            onClick={ handleClickBuscarHorarios }
          >
            Buscar horários
          </Button>

          <br/>
          <br/>

          {exibirHorariosDisponiveis === true && (
            <>
              <DialogContentText>
                2° Passo - Selecionar o horário do agendamento
              </DialogContentText>

              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  {horarios.map((x) => {
                    return <FormControlLabel 
                      key={x} 
                      value={x} 
                      checked={x === horarioAgendamento}
                      control={<Radio />} label={x} onChange={() => setHorarioAgendamento(x)} 
                    />
                  })}
                </RadioGroup>
              </FormControl>

              <br />
              <br />

              <DialogContentText>
                3° Passo - Adicione uma observação
              </DialogContentText>

              <FormControl fullWidth>
                <TextField
                  required
                  id="Nome"
                  label="Observação"
                  placeholder="Observação"
                  multiline
                  minRows={5}
                  variant="outlined"
                  value={observacao}
                  inputProps={{ maxLength: 200 }}
                  onChange={e => setObservacao(e.target.value)}
                  margin="normal"
                />
              </FormControl>
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClickFecharModalAgendamento}>Cancelar</Button>
          <ButtonWithLoader 
            disabled={horarioAgendamento === "" || observacao === ""}
            onClick={handleClickConfirmarAgendamento} 
          >
            Confirmar
          </ButtonWithLoader>
        </DialogActions>
      </Dialog>
    </>
  );
}