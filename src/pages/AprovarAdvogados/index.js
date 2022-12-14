import React, { useState, useEffect } from "react";
import Header from "../Main/Header";
import { Container, Tooltip } from "@material-ui/core/";
import { TitlePage } from "../../components/Utils/title";
import { 
  Button,
  IconButton,
  Avatar,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import adminService from "../../services/admin.service";
import { Redirect } from "react-router-dom";
import AlertError from "../../components/alerts/AlertError";
import AlertSuccess from "../../components/alerts/AlertSuccess";

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

export default function AprovarAdvogados() {
  const [advogados, setAdvogados] = useState([]); 
  const [redirect, setState] = useState(false);

  useEffect(() => {
    async function buscarAdvogadosPendentes() {
      try {
        const id_usuario = parseInt(sessionStorage.getItem("id_usuario"));
        const resultado = await adminService.getAllLawyersPending(id_usuario);
        console.log(resultado.data);
        setAdvogados(resultado.data);
      } catch (error) {
        const mensagem_retorno_api = error?.response?.data?.message;

        if (mensagem_retorno_api == null) {
          AlertError("🤨 Algo deu errado! Tente novamente mais tarde");
          
          setState(true);
        }
      }
    }

    buscarAdvogadosPendentes();
  }, []);

  async function handleClickAprovarAdvogado(id_advogado) {
    try {
      const id_usuario = parseInt(sessionStorage.getItem("id_usuario"));
      const resultado = await adminService.approveLawyer(id_usuario, id_advogado);
      
      AlertSuccess(resultado.data.message);
      window.location.reload();
    } catch (error) {
      const mensagem_retorno_api = error?.response?.data?.message;

      if (mensagem_retorno_api == null) {
        AlertError("🤨 Algo deu errado! Tente novamente mais tarde.");
        setState(true);
        return ;
      }

      AlertError(mensagem_retorno_api);
    }
  }

  async function handleClickReprovarAdvogado(id_advogado) {
    try {
      const id_usuario = parseInt(sessionStorage.getItem("id_usuario"));
      const resultado = await adminService.rejectLawyer(id_usuario, id_advogado);
      
      AlertSuccess(resultado.data.message);
      window.location.reload();
    } catch (error) {
      const mensagem_retorno_api = error?.response?.data?.message;

      if (mensagem_retorno_api == null) {
        AlertError("🤨 Algo deu errado! Tente novamente mais tarde.");
        return ;
      }
      
      AlertError(mensagem_retorno_api);
    }
  }

  if (redirect) {
    return <Redirect to='../home' />;
  }

  return (
    <>
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
              {advogados.length === 0 && (
                <TableRow>
                  <StyledTableCell align="center" colSpan={5}>
                    <Typography variant="h6" component="h6">
                      Não há advogados pendentes para aprovação
                    </Typography>
                  </StyledTableCell>
                </TableRow>
              )}

              {advogados.map((row) => (
                <StyledTableRow key={row.id_advogado}>
                  <StyledTableCell align="center">
                    <Tooltip title="Foto">
                      <IconButton  sx={{ p: 0 }}>
                        <Avatar alt="Avatar" src={row.usuario.url_foto_perfil ?? ""} />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="left">{row.nome}</StyledTableCell>
                  <StyledTableCell align="left">{row.nr_cna}</StyledTableCell>
                  <StyledTableCell align="left">{row.uf_cna}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button variant="contained" color="success" onClick={() => handleClickAprovarAdvogado(row.id_advogado)}>Aprovar</Button>
                    <Button variant="contained" color="error" style={{ marginLeft: 10 }} onClick={() => handleClickReprovarAdvogado(row.id_advogado)}>Reprovar</Button>
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