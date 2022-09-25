import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import api from "../../../../services/api";
import { TitlePage } from "../../../../components/Utils/title";
import TextArea from "../../../../components/Utils/input";
import { Rating } from "@mui/material";
import ButtonOutlined from "../../../../components/Utils/buttom";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Header from "../../../Main/Header";
import { ValidarAutenticacaoCliente } from "../../../../components/ValidarAutenticacao";

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

export default function AvaliacaoAdvogado() {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();

  const [id_advogado, setIdAdvogado] = useState({});
    
  // Carrega inicialmente
  useEffect(() => {
    setIdAdvogado(params.id);
  }, [params.id]);

  let id_cliente;

  const [nota, setNota] = useState(0.0);
  const [descricao, setDescricao] = useState("");

  /**
     * Converte os dados para o formato Number (formato correto que deverá chegar na API (backend))
     * @param {*} nota 
     * @param {*} id_cliente 
     * @param {*} id_advogado 
    */
  function convertDados(nota) {
    setNota(Number(nota));
  }

  /**
     * Handle
     * @param {*} e 
     */
  async function handleAvaliacaoAdvogado(e) {
    e.preventDefault();

    const dados = {
      id_cliente,
      nota,
      descricao
    };

    try {
      if (dados.nota !== "" && dados.nota > 0) {
        dados.id_cliente = Number(sessionStorage.getItem("id_cliente"));
        if(dados.descricao.length > 200) {
          alert("Por gentileza informe uma descrição de até 200 caracteres!")
          return
        }
        // Converte os dados necessários para o tipo Number
        convertDados(dados.nota);

        // Envia ao backend/api os dados inseridos
        // const lawyer_review = await api.post(`lawyers/${sessionStorage.getItem('id_advogado')}/review`, dados);
        const lawyer_review = await api.post(`lawyers/${id_advogado}/review`, dados);

        // Verifica o 'status code' recebido
        switch ((lawyer_review).status) {
        case 200:
          alert("Obrigado! Advogado avaliado com sucesso!");
          history.push(`/advogado/${id_advogado}`);
          break;
        default:
          alert("🤨 Algo deu errado! Tente novamente mais tarde");
          break;
        }

      } else {
        alert("Por favor, selecione as estrelas, para avaliar o advogado")
      }
    } catch (error) {
      alert("Algo deu errado!\n\n"
                + "Nota: " + dados.nota + "\n" 
                + "Descrição: " + dados.descricao + "\n" 
                + "ID Cliente: " + dados.id_cliente + "\n" 
                + "ID Advogado: " + id_advogado + "\n\n"
                + "Tipo da nota: " + typeof(dados.nota) + "\n" 
                + "Tipo do ID Cliente: " + typeof(dados.id_cliente) + "\n" 
                + "Tipo do ID Advogado: " + typeof(id_advogado) + "\n" 
                + "Tipo da Descrição: " + typeof(dados.descricao)); 
    }
  }

  return (
    <>
      <ValidarAutenticacaoCliente />
      <Header />
      <Container maxWidth="lg">
        <TitlePage internal="Avaliar Advogado" />

        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <form className={classes.form} /*onSubmit={handleLogin}*/>

              {/* Input Rating */}
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

              <div 
                style={{
                  "color": "#3B485E"
                }}
              >

                <br/><br/>
                <span>
                  <b>
                                        Deixe um comentário
                  </b>
                </span> <br/>

                <br/>
              </div>

              {/* Input TextArea 'Descrição' */}
              <TextArea
                id="descricao"
                name="descricao"
                autoComplete="descricao"
                
                margin="normal"
                variant="outlined"
                placeholder="Aqui vai uma descrição da sua avaliação"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
              />

              <ButtonOutlined 
                className={classes.submit}
                internal="AVALIAR" 
                type="submit"
                variant="outlined"
                onClick={handleAvaliacaoAdvogado}
              />

            </form>
          </div>
        </Container>
      </Container>
    </>
  );
}
