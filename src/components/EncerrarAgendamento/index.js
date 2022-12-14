import React, { useState } from "react";
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack, IconButton } from "@mui/material";
import { InputLabel, Select, MenuItem, FormControl } from "@material-ui/core/";
import { UserService } from "../../services";
import ButtonWithLoader from "../ButtonWithLoader";
import ButtonWithTooltip from "../ButtonWithTooltip";
import AlertSuccess from "../alerts/AlertSuccess";
import AlertError from "../alerts/AlertError";
import MessageIcon from "@mui/icons-material/Message";
import DialogDetalhesEncerramento from "../DialogDetalhesEncerramento";

export default function EncerrarAgendamento({ id_agenda, encerrado, motivo_encerramento, justificativa_encerramento, afterSubmit }) {
  const [motivosEncerramento] = useState(["Cancelamento", "Atendimento encerrado"]);
  const [isOpenDialogEncerrarAgendamento, setOpenDialogEncerrarAgendamento] = useState(false);
  const [openDetalhesEncerramento, setOpenDetalhesEncerramento] = useState(false);

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

      await AlertSuccess("Agendamento encerrado!");

      fecharDialogEncerrarAgendamento();

      afterSubmit(id_agenda);
    } catch (error) {
      let retorno = "Erro ao encerrar agendamento!";

      if (error.response.status === 400) {
        retorno += "\n\n" + error.response.data.message;
      } else {
        retorno += "\n" + error.message;
      }

      await AlertError(retorno);
    }
  }

  function handleClickAbrirModalDetalhesEncerramento() {
    setOpenDetalhesEncerramento(true);
  }

  function handleClickFecharModalDetalhesEncerramento() {
    setOpenDetalhesEncerramento(false);
  }

  return (
    <>
      {encerrado == true && motivo_encerramento != ""
        ? <>
          <Stack
            direction={{ sm: "row" }} 
            spacing={1}
          >
            <ButtonWithTooltip
              tooltip={motivo_encerramento}
              disabled={true}
            >
              Já encerrado
            </ButtonWithTooltip>

            <IconButton color="primary" onClick={ handleClickAbrirModalDetalhesEncerramento }>
              <MessageIcon />
            </IconButton>
          </Stack>
        </>
        : <>
          <Button
            type="submit"
            color="error"
            onClick={ () => handleClickEncerrarAgendamento() }
          >
            Encerrar
          </Button> 
        </>
      }

      <DialogDetalhesEncerramento 
        open={openDetalhesEncerramento} 
        motivo={motivo_encerramento}
        justificativa={justificativa_encerramento}
        onClose={handleClickFecharModalDetalhesEncerramento}
      />

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
          <ButtonWithLoader 
            onClick={ handleClickConfirmarDialogEncerrarAgendamento } 
            disabled={motivoEncerramento === "" || justificativa === "" || justificativa.length < 10}
          >
            Confirmar
          </ButtonWithLoader>
        </DialogActions>
      </Dialog>
    </>
  );
}
