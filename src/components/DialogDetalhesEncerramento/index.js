import React from "react";
import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";

export default function DialogDetalhesEncerramento({ open, onClose, motivo = "", justificativa = "" }) {
  function handleClickFecharModalDetalhesEncerramento() {
    onClose();
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Detalhes do encerramento</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Motivo do encerramento: {motivo}
          </DialogContentText>

          <br />

          <DialogContentText>
            Justificativa: {justificativa}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={ handleClickFecharModalDetalhesEncerramento }>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}