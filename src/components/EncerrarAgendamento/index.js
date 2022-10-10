import React, { useState } from "react";
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { InputLabel, Select, MenuItem, FormControl } from "@material-ui/core/";
import { UserService } from "../../services";

export default function EncerrarAgendamentoButton({ id_agenda, onSubmit }) {
  const [motivosEncerramento] = useState(["Cancelamento", "Atendimento encerrado"]);
  const [isOpenDialogEncerrarAgendamento, setOpenDialogEncerrarAgendamento] = useState(false);

  const [motivoEncerramento, setMotivoEncerramento] = useState("");
  const [justificativa, setJustificativa] = useState("");

  async function handleClickEncerrarAgendamento() {
    setOpenDialogEncerrarAgendamento(true);
  }

  function handleCloseDialogEncerrarAgendamento() {
    fecharDialogEncerrarAgendamento();
  }

  function fecharDialogEncerrarAgendamento() {
    setOpenDialogEncerrarAgendamento(false);
    setMotivoEncerramento("");
    setJustificativa("");
  }

  function handleClickFecharDialogEncerrarAgendamento() {
    fecharDialogEncerrarAgendamento();
  }

  async function handleClickConfirmarDialogEncerrarAgendamento() {
    try {
      const id_usuario = parseInt(sessionStorage.getItem("id_usuario"));

      await UserService.closeScheduling(id_usuario, id_agenda, justificativa, motivoEncerramento);

      alert("Agendamento encerrado com sucesso!");

      fecharDialogEncerrarAgendamento();

      onSubmit(id_agenda);
    } catch (error) {
      let retorno = "Erro ao encerrar agendamento!";

      if (error.response.status === 400) {
        retorno += "\n\n" + error.response.data.message;
      } else {
        retorno += "\n" + error.message;
      }

      alert(retorno);
    }
  }


  return (
    <>
      <Button
        type="submit"
        color="error"
        onClick={ () => handleClickEncerrarAgendamento() }
      >
        <b>ENCERRAR</b>
      </Button>

      {/* Encerramento de agendamento */}
      <Dialog open={isOpenDialogEncerrarAgendamento} onClose={ handleCloseDialogEncerrarAgendamento }>
        <DialogTitle>Encerrar agendamento</DialogTitle>
        <DialogContent>
          {/* Motivo */}
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="Area">Motivo</InputLabel>
            <Select
              required
              variant="outlined"
              label="Motivo"
              value={motivoEncerramento}
              onChange={e => setMotivoEncerramento(e.target.value)}
            >
              {motivosEncerramento.map((motivo, index)=>{
                return <MenuItem key={index} value={motivo}>{motivo}</MenuItem>
              })}
            </Select>
          </FormControl>

          {/* Justificativa */}
          <FormControl fullWidth>
            <TextField
              required
              id="Justificativa"
              label="Justificativa"
              placeholder="A justificativa deve ter pelo menos 10 caracteres"
              multiline
              minRows={4}
              variant="outlined"
              value={justificativa}
              inputProps={{ maxLength: 200 }}
              onChange={e => setJustificativa(e.target.value)}
              margin="normal"
            />
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={ handleClickFecharDialogEncerrarAgendamento }>Cancelar</Button>
          <Button 
            onClick={ handleClickConfirmarDialogEncerrarAgendamento } 
            disabled={motivoEncerramento === "" || justificativa === "" || justificativa.length < 10}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
