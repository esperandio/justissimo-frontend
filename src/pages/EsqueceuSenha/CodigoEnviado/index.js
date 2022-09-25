import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router";
import api from "../../../services/api";
import { TitleJustissimo, TitlePage } from "../../../components/Utils/title";

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

// 
export default function RedefinirSenha_Codigo() {

  const classes = useStyles();

  const [codigo_recuperacao, setCodigo] = useState("");
  const [redirect, setState] = useState(false);

  // Handle
  async function handleRecuperacaoSenha(e) {
    e.preventDefault();

    const dados = {
      codigo_recuperacao
    };

    try {
      if (codigo_recuperacao !== "") {
        // Envia ao backend/api os dados inseridos
        const password_recovery = await api.get(`login/recovery/${dados.codigo_recuperacao}`, {});
    
                
        // Verifica o 'status code' recebido
        switch ((password_recovery).status) {
        case 200:
          setState({ redirect: true });

          // Seta o codigo de recuperação na sessionStorage
          sessionStorage.setItem("codigo_recuperacao", dados.codigo_recuperacao);
                        
          break;
        default:
          alert("🤨 Algo deu errado! Tente novamente mais tarde");
          break;
        }

      } else {
        alert("Preencha todos os campos!")
      }
    } catch (error) {
      alert("Código incorreto");
    }
  }

  // Se o 'login' for aceito, redireciona para a tela da criação da nova senha
  if (redirect) {
    return <Redirect to='novasenha' />;
  }

  return (
  // Form
    <Container component="main" maxWidth="xs">
      <TitleJustissimo/>
      <TitlePage internal="Redefinir Senha" />
      <div className={classes.paper}>
        <form className={classes.form} /*onSubmit={handleLogin}*/>

          <span>
                        Digite o código recebido em seu email
          </span>

          {/* Input 'Código de recuperação' */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="codigo_recuperacao"
            label="Código enviado"
            name="codigo_recuperacao"
            autoComplete="codigo_recuperacao"
            
            value={codigo_recuperacao}
            onChange={e => setCodigo(e.target.value)}
          />

          {/* Button 'Verificar' */}
          <Button className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRecuperacaoSenha}
          >
                    VERIFICAR
          </Button>

        </form>
      </div>
    </Container>
  );
}

