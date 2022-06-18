import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { TitleJustissimo }  from '../../components/Utils/title';
import { Rating } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Main/Header';
import logo from '../../user.svg';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import api from '../../service/api';
import TextField from '@mui/material/TextField';    
import FormControl from '@material-ui/core/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ptBR } from "date-fns/locale";


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

export default function InformacoesAdvogado() {
    const classes = useStyles();
    const params = useParams();

    const [advogado, setAdvogado] = useState({});
    const [dataAgendamento, setDataAgendamento] = useState(new Date());
    const [horarioAgendamento, setHorarioAgendamento] = useState("");

    const [horarios, setHorarios] = useState([]);
    const [exibirHorariosDisponiveis, setExibirHorariosDisponiveis] = useState(false);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function buscarInformacoesAdvogado() {
            const resultado = await api.get(`lawyers/${params.id}`);
            setAdvogado(resultado.data);
        }

        buscarInformacoesAdvogado();
    }, [params.id]);

    function handleAbrirModalAgendamento() {
        setOpen(true);
    }

    function handleFecharModalAgendamento() {
        setOpen(false);
    }

    function handleConfirmarAgendamento() {
        console.log(dataAgendamento);
        console.log(horarioAgendamento);

        setOpen(false);

        alert("Agendamento confirmado!!!");

        setDataAgendamento(new Date());
        setHorarioAgendamento("");
        setExibirHorariosDisponiveis(false);
    }

    function handleBuscarHorarios() {
        setExibirHorariosDisponiveis(false);

        // TODO: chamar a API aqui
        setHorarios(["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"]);

        setExibirHorariosDisponiveis(true);
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Informações do advogado" />
                <div className={classes.paper}>
                    <TitleJustissimo/>
                    <img src={logo} className={classes.user} alt="logo" />
                    <h1>{advogado.nome}</h1>
                    <Rating 
                        id="nota"
                        name="nota" 
                        size='large'
                        autoFocus
                        readOnly
                        value={advogado.nota ?? 0}
                    />
                    <p>{advogado._count?.avaliacoes} avaliações</p>
                </div>

                <Divider/>

                <div>
                    <h2>Descrição</h2>
                    <p>{advogado.info}</p>
                    <p>E-mail: {advogado.usuario?.email}</p>
                </div>

                <Grid item xs={12} sm={6}>
                    {advogado.tel_celular != null 
                        ? (
                            <Button className={classes.submit}
                                variant="contained"
                                color="primary"
                                onClick={ () => { window.open(`https://api.whatsapp.com/send?phone=${advogado.tel_celular.replace(/\+/g, "")}`, '_blank'); } }
                            >
                                Entrar em contato
                            </Button>
                        )
                        : ""
                    }

                    {' '}

                    <Button className={classes.submit}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={ handleAbrirModalAgendamento }
                    >
                        Agendar uma consulta
                    </Button>
                </Grid>

                <Dialog open={open} onClose={handleFecharModalAgendamento}>
                    <DialogTitle>Realizar agendamento</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            1° Passo - Selecionar a data do agendamento
                        </DialogContentText>

                        <br />

                        <FormControl fullWidth className={classes.margin}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                                <DatePicker
                                    label="Data do agendamento"
                                    value={dataAgendamento}
                                    onChange={(newValue) => { setDataAgendamento(newValue) }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>

                        <br />
                        <br />

                        <Button 
                            variant="contained"
                            color="primary"
                            onClick={ handleBuscarHorarios }
                        >
                            Buscar horários
                        </Button>

                        <br/>
                        <br/>

                        {exibirHorariosDisponiveis === true
                            ? (
                                <>
                                    <DialogContentText>
                                        2° Passo - Selecionar o horário do agendamento
                                    </DialogContentText>

                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            {horarios.map((x) => {
                                                return <FormControlLabel 
                                                    key={x} 
                                                    value={x} 
                                                    checked={x === horarioAgendamento}
                                                    control={<Radio />} label={x} onChange={() => setHorarioAgendamento(x)} 
                                                />
                                            })}
                                        </RadioGroup>
                                    </FormControl>
                                </>
                            )
                            : ""
                        }
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleFecharModalAgendamento}>Cancelar</Button>
                        <Button onClick={handleConfirmarAgendamento} disabled={horarioAgendamento === ""}>Confirmar</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </React.Fragment>
    );
}

