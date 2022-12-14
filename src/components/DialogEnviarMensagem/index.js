import React, { useState } from "react";
import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@mui/material";
import { FormControl } from "@material-ui/core/";
import api from "../../services/api";
import ButtonWithLoader from "../ButtonWithLoader";
import AlertSuccess from "../alerts/AlertSuccess";
import AlertError from "../alerts/AlertError";

export default function DialogEnviarMensagem({ open, advogado, onClose }) {
  const [mensagem, setMensagem] = useState("");

  function handleClickFecharModalEnvioMensagem() {
    beforeClose();
    onClose();
  }

  async function handleClickConfirmarEnvioMensagem() {
    try {
      const fk_advogado = advogado?.id_advogado;
      const id_usuario = parseInt(sessionStorage.getItem("id_usuario"));

      const dados = {
        fk_advogado: fk_advogado,
        menssagem: mensagem
      }

      await api.post(`user/${id_usuario}/message`, dados);
      
      AlertSuccess("Mensagem enviada!");

      beforeClose();
      onClose();
    } catch (error) {
      const mensagem_retorno_api = error?.response?.data?.message;

      if (mensagem_retorno_api == null) {
        AlertError("🤨 Algo deu errado! Tente novamente mais tarde.");
        return ;
      }

      AlertError(mensagem_retorno_api);
    }
  }

  function beforeClose() {
    setMensagem("");
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Enviar mensagem</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Utilize esse espaço para enviar uma mensagem diretamente para o advogado.
          </DialogContentText>

          <FormControl fullWidth>
            <TextField
              required
              id="mensagem"
              label="Mensagem"
              multiline
              minRows={4}
              placeholder="A mensagem deve conter pelo menos 20 caracteres."
              variant="outlined"
              value={mensagem}
              inputProps={{ maxLength: 200 }}
              onChange={e => setMensagem(e.target.value)}
              margin="normal"
            />
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={ handleClickFecharModalEnvioMensagem }>Cancelar</Button>
          <ButtonWithLoader
            onClick={ handleClickConfirmarEnvioMensagem }
            disabled={mensagem.length < 20}
          >
            Confirmar
          </ButtonWithLoader>
        </DialogActions>
      </Dialog>
    </>
  );
}