import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import BalanceIcon from "@mui/icons-material/Balance";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useHistory } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const Header = () => {
  const history = useHistory();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [pages, setPages] = useState([]);
  const [settings] = useState(["Editar perfil", "Logout"]);

  useEffect(() => {
    let pages = ["Home", "Pesquisar Advogado", "Cadastrar Cliente", "Cadastrar Advogado"];

    if (sessionStorage.getItem("tipo_usuario") === "Advogado") {
      pages = ["Home", "Meus agendamentos", "Buscar Divulgações", "Configuração da agenda"];
    } else if (sessionStorage.getItem("tipo_usuario") === "Cliente") {
      pages = ["Home", "Meus agendamentos", "Minhas Divulgações", "Pesquisar Advogado", "Cadastrar Divulgação"];
    } else if (sessionStorage.getItem("tipo_usuario") === "Administrador") {
      pages = ["Home", "Pesquisar Advogado", "Aprovar Advogados"];
    }

    setPages(pages);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getPageUrl = (page) => {
    switch (page) {
    case "Home":
      return "/home";
    case "Meus agendamentos":
      if (sessionStorage.getItem("tipo_usuario") === "Cliente") {
        return "/cliente/minha-agenda";
      }
      return "/advogado/minha-agenda";
    case "Pesquisar Advogado":
      return "/advogado/listar";
    case "Minhas Divulgações":
      return "/cliente/minhas-divulgacoes";
    case "Buscar Divulgações":
      return "/advogado/buscar-divulgacoes";
    case "Cadastrar Divulgação":
      return "/cliente/divulgacao/cad";
    case "Cadastrar Cliente":
      return "/cliente/cad";
    case "Cadastrar Advogado":
      return "/advogado/cad";
    case "Aprovar Advogados":
      return "/admin/aprovar-advogados";
    case "Configuração da agenda":
      return "/configuracao/agenda";
    default:
      return "/home";
    }
  }

  const handleClickPageMenuItem = (page) => {
    history.push(getPageUrl(page));
  }

  const handleClickSettingsMenuItem = (setting) => {
    switch (setting) {
    case "Editar perfil":
      handleEditarPerfil();
      break;
    case "Logout":
      handleLogout();
      break;
    default:
      handleCloseUserMenu();
    }
  }

  const handleLogout = () => {
    sessionStorage.clear();
    history.push("/login");
  }

  const handleEditarPerfil = () => {
    history.push("/editar-perfil");
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky" >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <BalanceIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Inter",
                fontWeight: 900,
                background: "-webkit-linear-gradient(45deg, #B28C09, #E2D04A)", 
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textDecoration: "none",
              }}
            >
              JUSTÍSSIMO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleClickPageMenuItem(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <BalanceIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "Inter",
                fontWeight: 900,
                background: "-webkit-linear-gradient(45deg, #B28C09, #E2D04A)", 
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textDecoration: "none",
              }}
            >
              JUSTÍSSIMO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  color="inherit"
                  key={page}
                  onClick={() => handleClickPageMenuItem(page)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {sessionStorage.getItem("token") === null
                ? <>
                  <Button color="inherit" href="/login">Login</Button>
                </>
                : <>
                  <Tooltip title="Abrir configurações">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Avatar" src={sessionStorage.getItem("url_foto_perfil") ?? ""} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      //caso for administrador não deve aparecer a opção de editar perfil 
                      (setting === "Editar perfil" && sessionStorage.getItem("tipo_usuario") === "Administrador") ? null : (
                        <MenuItem key={setting} onClick={() => handleClickSettingsMenuItem(setting)}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      )))}
                  </Menu>
                </>
              }
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
