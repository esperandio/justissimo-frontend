import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LogoutIcon from '@mui/icons-material/Logout';

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

export default function Header(props) {
  const classes = useStyles();
  const { title } = props;

  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem('tipo_usuario') === 'Advogado') {
      setSections([
        { title: 'Home', url: '/home' }
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
        { title: 'Cadastrar Cliente', url: '/cliente/cad' }
      ])
    }
  }, []);

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
            <Button variant="outlined" size="small" href="/login" >
              <LogoutIcon></LogoutIcon>
              Entrar
            </Button>
          </>
          : <>
            <Button variant="outlined" size="small" href="/login" onClick={() => sessionStorage.clear()} >
              <LogoutIcon></LogoutIcon>
              Sair
            </Button>
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

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};