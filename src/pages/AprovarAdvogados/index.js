import React, { useState, useEffect } from "react";
import Header from "../Main/Header";
import { ValidarAutenticacaoAdmin } from "../../components/ValidarAutenticacao";
import { Container, Link, Grid, FormControl, Tooltip } from "@material-ui/core/";
import { TitlePage } from "../../components/Utils/title";
import { 
  Typography,
  Chip,
  Divider,
  Stack,
  Button,
  Dialog, 
  DialogTitle,
  DialogContent,
  TextField,
  ButtonGroup,
  IconButton,
  Avatar
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { LawyerService } from "../../services";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1C1C1C",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name,
  calories,
  fat,
  carbs,
  protein,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("David Jesus", 159, "SC"),
  createData("Matheus Felipe", 237, "PR"),
  createData("Gabriel Ratke", 262, "PA"),
  createData("Jonathas Rocha", 305, "SC"),
];

export default function AprovarAdvogados() {
  const [divulgacoes, setDivulgacoes] = useState([]); 
  const [isOpenDialogFiltrarDivulgacoes, setOpenDialogFiltrarDivulgacoes] = useState(false);
  const [dataDivulgacaoDe, setDataDivulgacaoDe] = useState(new Date());
  const [dataDivulgacaoAte, setDataDivulgacaoAte] = useState(new Date());

  useEffect(() => {
    async function buscarDivulgacoes() {
      const resultado = await LawyerService.getAllDivulgations();

      setDivulgacoes(resultado.data);
    }

    buscarDivulgacoes();
  }, []);

  function formatDate(date) {
    date = new Date(date);

    return `${date.getUTCDate()}`.padStart(2, 0)
      + "/"
      + `${date.getUTCMonth() + 1}`.padStart(2, 0)
      + "/"
      + `${date.getUTCFullYear()}`;
  }

  function handleClickFiltroDivulgacao() {
    setOpenDialogFiltrarDivulgacoes(true);
  }

  async function handleClickLimparFiltroDivulgacao() {
    const resultado = await LawyerService.getAllDivulgations();

    setDivulgacoes(resultado.data);
  }

  function handleCloseDialogFiltrarDivulgacoes() {
    setOpenDialogFiltrarDivulgacoes(false);
  }

  function handleChangeDataDivulgacaoDe(newValue) {
    setDataDivulgacaoDe(newValue);
  }

  function handleChangeDataDivulgacaoAte(newValue) {
    setDataDivulgacaoAte(newValue);
  }

  async function handleClickBuscarDivulgacao() {
    const dataDivulgacaoDeFormatada = `${dataDivulgacaoDe.getUTCFullYear()}` 
      + "-"
      + `${dataDivulgacaoDe.getUTCMonth() + 1}`.padStart(2, 0)
      + "-"
      + `${dataDivulgacaoDe.getDate()}`.padStart(2, 0);

    const dataDivulgacaoAteFormatada = `${dataDivulgacaoAte.getUTCFullYear()}` 
      + "-"
      + `${dataDivulgacaoAte.getUTCMonth() + 1}`.padStart(2, 0)
      + "-"
      + `${dataDivulgacaoAte.getDate()}`.padStart(2, 0);

    try {
      const resultado = await LawyerService.getAllDivulgations(
        dataDivulgacaoDeFormatada, 
        dataDivulgacaoAteFormatada
      );
      setDivulgacoes(resultado.data)
      setOpenDialogFiltrarDivulgacoes(false);
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
      <ValidarAutenticacaoAdmin />
      <Header />
      <Container maxWidth="lg">
        <TitlePage internal="Aprovar Advogados" />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Imagem</StyledTableCell>
                <StyledTableCell align="left">Nome</StyledTableCell>
                <StyledTableCell align="left">Número CNA</StyledTableCell>
                <StyledTableCell align="left">UF CNA</StyledTableCell>
                <StyledTableCell align="center">Ação</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center">
                    {sessionStorage.getItem("token") === null
                      ? <>
                        <Button color="inherit" href="/login">Login</Button>
                      </>
                      : <>
                        <Tooltip title="Foto">
                          <IconButton  sx={{ p: 0 }}>
                            <Avatar alt="Avatar" src="https://justissimo-s3.s3.amazonaws.com/3fff7ff6ba00b96ed7779c184db3ac0206b561114abdc9ecf6a5975cb7196ff4-David_FotoPerfil.jpg" />
                          </IconButton>
                        </Tooltip>
                      </>}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.calories}</StyledTableCell>
                  <StyledTableCell align="left">{row.fat}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button variant="contained" color="success">Aprovar</Button>
                    
                    <Button variant="contained" color="error" style={{ marginLeft: 10 }}>Reprovar</Button>
                  </StyledTableCell >
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}