import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Rating
} from "@mui/material";
import { FormControl } from "@material-ui/core/";
import api from "../../services/api";

// Style
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function DialogAvaliacaoAdvogado({ open, advogado, onClose }) {
  const classes = useStyles();

  const [nota, setNota] = useState(0.0);
  const [descricao, setDescricao] = useState("");

  function handleClickFecharDialogAvaliacaoAdvogado() {
    beforeClose();
    onClose();
  }

  async function handleClickConfirmarAvaliacaoAdvogado() {
    try {
      const fk_advogado = advogado?.id_advogado;
      const id_cliente = parseInt(sessionStorage.getItem("id_cliente"));

      const dados = {
        id_cliente,
        nota,
        descricao
      }

      await api.post(`lawyers/${fk_advogado}/review`, dados);

      alert("Avaliação registrada!!!");

      beforeClose();
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

  function beforeClose() {
    setNota(0.0);
    setDescricao("");
  }

  function convertDados(nota) {
    setNota(Number(nota));
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Avaliar advogado</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Utilize esse espaço para fazer uma avaliação do atendimento do advogado.
          </DialogContentText>

          <div className={classes.paper}>
            <Rating 
              style={{
                color: "#FFCB45"
              }}
              id="nota"
              name="nota" 
              defaultValue={3} 
              precision={0.5}
              size='large'
              required 
              
              value={nota}
              onChange={e => convertDados(e.target.value)}
            />
          </div>

          <br />

          <FormControl fullWidth>
            <TextField
              required
              id="mensagem"
              label="Mensagem"
              multiline
              minRows={4}
              placeholder="Aqui vai uma descrição da sua avaliação"
              variant="outlined"
              value={descricao}
              inputProps={{ maxLength: 200 }}
              onChange={e => setDescricao(e.target.value)}
              margin="normal"
            />
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={ handleClickFecharDialogAvaliacaoAdvogado }>Cancelar</Button>
          <Button onClick={ handleClickConfirmarAvaliacaoAdvogado }>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}