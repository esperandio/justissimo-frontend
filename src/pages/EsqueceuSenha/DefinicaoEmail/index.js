import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router";
import api from "../../../services/api";
import { TitleJustissimo, TitlePage } from "../../../components/Utils/title";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import AlertError from "../../../components/alerts/AlertError";
import AlertWarning from "../../../components/alerts/AlertWarning";

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
export default function RedefinirSenha_Email() {

  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [redirect, setState] = useState(false);

  // Handle
  async function handleRecuperacaoSenha(e) {
    e.preventDefault();

    const dados = {
      email
    };

    try {
      if (email !== "") {
        // Envia ao backend/api os dados inseridos no login
        const password_recovery = await api.post("login/recovery", dados);
    
        // Seta o token na sessionStorage
        sessionStorage.setItem("email", dados.email);

        // Verifica o 'status code' recebido
        switch ((password_recovery).status) {
        case 200:
          setState({ redirect: true });
          break;
        default:
          await AlertError("🤨 Algo deu errado! Tente novamente mais tarde.");
          break;
        }

      } else {
        await AlertWarning("Preencha todos os campos!");
      }
    } catch (error) {
      const mensagem_retorno_api = error?.response?.data?.message;

      if (mensagem_retorno_api == null) {
        await AlertError("🤨 Algo deu errado! Tente novamente mais tarde.");
        return ;
      }

      await AlertError(mensagem_retorno_api);
    }
  }

  // Se o 'login' for aceito, redireciona para a tela de codigo da redefinição de senha
  if (redirect) {
    return <Redirect to='codigo' />;
  }

  return (
  // Form
    <Container component="main" maxWidth="xs">
      <TitleJustissimo/>
      <TitlePage internal="Redefinir Senha" />
      <div className={classes.paper}>
        <form className={classes.form} /*onSubmit={handleLogin}*/>

          <span>
            <b>Digite seu email</b>
          </span> <br/>
          <span>
                        Enviaremos o código para a redefinição de sua senha
          </span>
                    
          {/* Input 'Email' */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          {/* Button 'Login' */}
          <Button className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRecuperacaoSenha}
          >
                    ENVIAR
          </Button>

        </form>

        <br />

        <Grid container>
          <Grid item>
            <Link href="../home" variant="body2">
              Voltar para home
            </Link>
          </Grid>
        </Grid>

      </div>
    </Container>
  );
}

