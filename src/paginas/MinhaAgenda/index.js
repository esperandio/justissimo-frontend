import * as React from 'react';
import'./index.css';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Header from '../Main/Header';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@material-ui/core/Container';
import { TitleJustissimo, TitlePage } from '../../components/Utils/title';
import { useState } from 'react';
import api from '../../service/api';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";


export default function MinhaAgenda() {
  const params = useParams();
 /* const classes = useStyles();
    let id_cliente;
    let id_advogado;*/

  const [agendas, setAgendas] = useState([]);  

  const [id_cliente, setId_cliente] = useState("");
  const [id_advogado, setId_advogado] = useState("");
  const [causa, setCausa] = useState("");
  const [data_agendamento, setData_agendamento] = useState("");
  const [duracao, setDuracao] = useState("");
  const [horario, setHorario] = useState("");
  const [observacao, setObservacao] = useState("");
  const [contato_cliente, setContato_cliente] = useState("");

  useEffect(() => {
    async function buscarInformacoesAgendaAdvogado() {
        const id = sessionStorage.getItem('id_advogado');
        const resultado = await api.get(`schedulings/lawyer/${id}`);
        
        setAgendas(resultado.data)
        console.log(resultado);
    }
    buscarInformacoesAgendaAdvogado();
  }, []);

  //async function handleMinhaAgenda {}


    function deleteRow(r) {
        var i = r.parentNode.parentNode.rowIndex;
        document.getElementById("myTable").deleteRow(i);
      }

    const dados = {
      id_advogado,
      id_cliente,
      causa,
      data_agendamento,
      duracao,
      horario,
      observacao,
      contato_cliente
    }

   /* try {
      if (dados.id_advogado !== "") {
          

          // Converte os dados necessários para o tipo Number
          convertDados(dados.nota);

          // Envia ao backend/api os dados inseridos
          // const lawyer_review = await api.post(`lawyers/${sessionStorage.getItem('id_advogado')}/review`, dados);
          const lawyer_review = await api.post(`lawyer/${id_cliente}/`, dados);

          // Verifica o 'status code' recebido
          switch ((lawyer_review).status) {
              case 200:
                  alert('Tudo certo');
                  // setState({ redirect: true });
                  break;
              default:
                  alert(`🤨 Algo deu errado! Tente novamente mais tarde`);
                  break;
              
          }

      }
    }*/
      
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <div>
          <TitleJustissimo/>

          <h2>Minha Agenda</h2>

          {agendas.map((agenda) => {
            return (
              <Card key={agenda.id_agenda} id="myTable" sx={{ maxWidth: 500 }}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                  {agenda.cliente.nome}
                  {' | '}
                  Causa: Trabalhista
                  </Typography>

                  
                  
                  <Typography gutterBottom variant="h6" component="div">
                  Causa: Trabalhista
                  </Typography>

                  <Typography gutterBottom variant="h7" component="div">
                  {agenda.data_agendamento}
                  </Typography>

                  <Typography gutterBottom variant="h8" component="div">
                  Sexta-Feira
                  </Typography>

                  <Typography gutterBottom variant="h8" component="div">
                  15:00h{agenda.horario}
                  </Typography>

                  <Typography gutterBottom variant="h7" component="div">
                  Contato em {agenda.contato_cliente}
                  </Typography>
                </CardContent>
                <CardActions>
                      <Button>
                          ENCERRAR
                      </Button>
                </CardActions>
              </Card>
            )
          })}
        </div>
      </Container>
    </React.Fragment>
                    

  );
}
