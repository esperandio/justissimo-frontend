import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};

export default function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const { title } = props;

  const [sections, setSections] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem('tipo_usuario') === 'Advogado') {
      setSections([
        { title: 'Home', url: '/home' },
        { title: 'Minha Agenda', url: '/minha-agenda' }
      ])
    } else if (sessionStorage.getItem('tipo_usuario') === 'Cliente') {
      setSections([
        { title: 'Home', url: '/home' },
        { title: 'Pesquisar Advogado', url: '/advogado/listar' },
        { title: 'Cadastrar Divulgação', url: '/divulgacao/cad' }
      ])
    } else {
      setSections([
        { title: 'Home', url: '/home' },
        { title: 'Pesquisar Advogado', url: '/advogado/listar' },
        { title: 'Cadastrar Cliente', url: '/cliente/cad' },
        { title: 'Cadastrar Advogado', url: '/advogado/cad' }
      ])
    }
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditarPerfil = () => {
    history.push(`/editar-perfil`);
  }

  const handleLogout = () => {
    sessionStorage.clear();
    history.push(`/login`);
  }

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        {sessionStorage.getItem('token') === null
          ? <>
            <Button color="inherit" href="/login">Login</Button>
          </>
          : <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleEditarPerfil}>Editar perfil</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
          </>
        }
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}