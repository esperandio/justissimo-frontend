import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from '../../Main/Header';
import Footer from '../../Main/Footer';
import { makeStyles } from '@material-ui/core/styles';
import TitleJustissimo from '../../../components/Utils/Title/title_justissimo';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    user: {
        width: '20vh',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function ListarAdvogado() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Cadastrar divulgação" />
                <div className={classes.paper}>
                    <TitleJustissimo/>

                    <h2>Busque advogados</h2>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth className={classes.margin}>
                                    <TextField
                                        id="Pesquisa"
                                        label="Pesquise aqui"
                                        placeholder="Pesquise aqui"
                                        multiline
                                        variant="outlined"
                                        margin="normal"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <Button className={classes.submit}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    startIcon={<FilterAltIcon />}
                                >
                                    Filtrar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <Footer />
            </Container>
        </React.Fragment>
    );
}