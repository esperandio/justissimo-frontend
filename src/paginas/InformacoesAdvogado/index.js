import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { TitleJustissimo, TitlePage }  from '../../components/Utils/title';
import { Rating } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Main/Header';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
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
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router-dom';
import Footer from '../Main/Footer';


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
    const history = useHistory();

    const [advogado, setAdvogado] = useState({});
    const [advogadoAreas, setAdvogadoAreas] = useState([]);
    const [dataAgendamento, setDataAgendamento] = useState(new Date());
    const [id_area_atuacao, setAreaAtuacao] = useState("");
    const [horarioAgendamento, setHorarioAgendamento] = useState("");
    const [observacao, setObservacao] = useState("");

    const [horarios, setHorarios] = useState([]);
    const [exibirHorariosDisponiveis, setExibirHorariosDisponiveis] = useState(false);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function buscarInformacoesAdvogado() {
            const resultado = await api.get(`lawyers/${params.id}`);
            setAdvogado(resultado.data);
            setAdvogadoAreas(resultado.data.areas)
        }

        buscarInformacoesAdvogado();
    }, [params.id]);

    function handleAbrirModalAgendamento() {
        if (sessionStorage.getItem('token') === null || sessionStorage.getItem('tipo_usuario') !== 'Cliente') {
            alert('Você precisa estar conectado como cliente para acessar essa tela!');
            return;
        }

        setOpen(true);
    }

    function handleClickFecharModalAgendamento() {
        setOpen(false);
        setDataAgendamento(new Date());
        setAreaAtuacao("");
        setHorarioAgendamento("");
        setObservacao("");

        setExibirHorariosDisponiveis(false);
    }

    async function handleClickConfirmarAgendamento() {
        try {
            const fk_advogado = advogado?.id_advogado;
            const fk_cliente = parseInt(sessionStorage.getItem('id_cliente'));
            const fk_advogado_area = id_area_atuacao;
            const data_agendamento = `${dataAgendamento.getUTCFullYear()}` 
                + "-"
                + `${dataAgendamento.getUTCMonth() + 1}`.padStart(2, 0)
                + "-"
                + `${dataAgendamento.getDate()}`.padStart(2, 0);
            const horario = horarioAgendamento; 
    
            const dados = {
                fk_advogado,
                fk_cliente,
                fk_advogado_area,
                data_agendamento,
                horario,
                observacao
            }
    
            await api.post(`clients/scheduling`, dados);
    
            setOpen(false);
    
            alert("Agendamento confirmado!!!");
    
            setDataAgendamento(new Date());
            setAreaAtuacao("");
            setHorarioAgendamento("");
            setObservacao("");
    
            setExibirHorariosDisponiveis(false);
        } catch (error) {
            const mensagem_retorno_api = error?.response?.data?.message;

            if (mensagem_retorno_api == null) {
                alert(`🤨 Algo deu errado! Tente novamente mais tarde`);
                return ;
            }

            alert(mensagem_retorno_api);
        }
    }

    async function handleClickBuscarHorarios() {
        if (id_area_atuacao === "") {
            return;
        }

        setExibirHorariosDisponiveis(false);

        const dataAgendamentoFormatada = `${dataAgendamento.getUTCFullYear()}` 
            + "-"
            + `${dataAgendamento.getUTCMonth() + 1}`.padStart(2, 0)
            + "-"
            + `${dataAgendamento.getDate()}`.padStart(2, 0);

        try {
            const horarios = await api.get(`hour-schedulings/${advogado?.id_advogado}?data_para_agendamento=${dataAgendamentoFormatada}`);

            setHorarios(horarios.data?.horarios_disponiveis ?? []);

            setExibirHorariosDisponiveis(true);
        } catch (error) {
            const mensagem_retorno_api = error?.response?.data?.message;

            if (mensagem_retorno_api == null) {
                alert(`🤨 Algo deu errado! Tente novamente mais tarde`);
                return ;
            }

            alert(mensagem_retorno_api);
        }
    }

    function handleChangeDataAgendamento(newValue) {
        setDataAgendamento(newValue);

        setHorarios([]);
        setExibirHorariosDisponiveis(false);
    }

    function handleClickAvaliarAdvogado() {
        if (sessionStorage.getItem('token') === null || sessionStorage.getItem('tipo_usuario') !== 'Cliente') {
            alert('Você precisa estar conectado como cliente para acessar essa tela!');
            return;
        }

        history.push(`/avaliacao/advogado/${advogado?.id_advogado}`);
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Informações do advogado" />
                <div className={classes.paper}>
                    <TitleJustissimo/>
                    <img src={logo} className={classes.user} alt="logo" />
                    <TitlePage internal={advogado.nome} />
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

                <Grid item sx={3} md={9}>
                    {advogado.tel_celular != null 
                        ? (
                            <Button className={classes.submit}
                                variant="contained"
                                color="primary"
                                startIcon={<WhatsAppIcon/>}
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
                        startIcon={<CalendarMonthIcon/>}
                        onClick={ handleAbrirModalAgendamento }
                    >
                        Agendar uma consulta
                    </Button>

                    {' '}

                    <Button className={classes.submit}
                        variant="contained"
                        color="primary"
                        type="submit"
                        startIcon={<StarHalfIcon/>}
                        onClick={ () => handleClickAvaliarAdvogado() }
                    >
                        Avaliar advogado
                    </Button>
                </Grid>

                <Dialog open={open} onClose={handleClickFecharModalAgendamento}>
                    <DialogTitle>Realizar agendamento</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            1° Passo - Selecionar a data do agendamento e área de atuação
                        </DialogContentText>

                        <br />

                        <FormControl fullWidth className={classes.margin}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                                <DatePicker
                                    label="Data do agendamento"
                                    value={dataAgendamento}
                                    onChange={(newValue) => { handleChangeDataAgendamento(newValue) }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>

                        <FormControl fullWidth variant="outlined" margin="normal" className={classes.margin}>
                            <InputLabel id="Area">Área de atuação</InputLabel>
                            <Select
                                required
                                labelId="Área de atuação"
                                id="AreaSelect"
                                multiline
                                variant="outlined"
                                value={id_area_atuacao}
                                onChange={e => setAreaAtuacao(e.target.value)}
                                label="Tipo de Usuario"
                            >
                                {advogadoAreas.map((area)=>{
                                    return <MenuItem key={area.areaAtuacao.id_area_atuacao} value={area.areaAtuacao.id_area_atuacao}>{area.areaAtuacao.titulo}</MenuItem>
                                })}
                            </Select>
                        </FormControl>

                        <br />
                        <br />

                        <Button 
                            variant="contained"
                            color="primary"
                            onClick={ handleClickBuscarHorarios }
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

                                    <br />
                                    <br />

                                    <DialogContentText>
                                        3° Passo - Adicione uma observação
                                    </DialogContentText>

                                    <FormControl fullWidth className={classes.margin}>
                                        <TextField
                                            required
                                            id="Nome"
                                            label="Observação"
                                            placeholder="Observação"
                                            multiline
                                            minRows={5}
                                            variant="outlined"
                                            value={observacao}
                                            inputProps={{ maxLength: 200 }}
                                            onChange={e => setObservacao(e.target.value)}
                                            margin="normal"
                                        />
                                    </FormControl>
                                </>
                            )
                            : ""
                        }
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClickFecharModalAgendamento}>Cancelar</Button>
                        <Button onClick={handleClickConfirmarAgendamento} disabled={horarioAgendamento === "" || observacao === ""}>Confirmar</Button>
                    </DialogActions>
                </Dialog>
            </Container>
            <Footer />
        </React.Fragment>
    );
}

