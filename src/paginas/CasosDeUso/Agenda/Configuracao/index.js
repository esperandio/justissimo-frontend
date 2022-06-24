import React, { useState } from 'react';
import { Container, TextField } from '@material-ui/core';
import { Autocomplete } from '@mui/material';
import { TitleJustissimo, TitlePage } from '../../../../components/Utils/title';
import ButtonOutlined from '../../../../components/Utils/buttom';
import api from '../../../../service/api';

export default function ConfiguracaoAgenda() {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [redirect, setState] = useState(false);
    const [helperText, setHelperText] = useState('Choose wisely');

    const [horarioInicio, setHorarioInicio] = useState("");
    const [horarioFinal, setHorarioFinal] = useState("");
    const [horarios] = useState([
        '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', 
        '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30',
        '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', 
        '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', 
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', 
        '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', 
        '21:00', '21:30', '22:00', '22:30', '23:00', '23:30']);

    const [dia, setDia] = useState("");
    const [dias] = useState(['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']);
    const [dias_api_format] = useState(['segunda', 'terca', 'quarta', 'quinta', 'sexta']);

    const [duracao, setDuracao] = useState("");
    const [duracoes] = useState([
        '30', '45', '60', '75', '90',
        '105', '120', '135', '150', '165']);

    const fk_advogado = parseInt(sessionStorage.getItem('id_advogado'))
    
    async function handleConfiguracao(e) {
        
        e.preventDefault();
        
        const arrayObject = [];
        
        dias_api_format.forEach(dia => {
            setDia(dia);
            
            arrayObject.push("{" + 
                horarioInicio,
                horarioFinal,
                fk_advogado,
                duracao,
                dia + "}"
            );

        });

        
        try {
            
            // Verifica se todos os campos foram preenchidos
            if (true) {


                // const objectJson = {
                //     "dados":
                //     {
                //         "dias_inserir":[
                //         { 
                //             "fk_advogado": 1,
                //             "dia": "terca",
                //             "hora_inicio": "07:30",
                //             "hora_final": "18:00",
                //             "duracao":40
                //         }
                //     ],
                //         "dias_remover": [
                        
                //         ]   
                //     }
                // };


                alert(arrayObject);

                const objectJson = {
                    "dados":
                    {
                        "dias_inserir":[
                            arrayObject
                    ],
                        "dias_remover": [
                        
                        ]   
                    }
                };

                alert(objectJson);

                // Envia ao backend/api os dados inseridos na configuração da agenda
                const configuracaoAgenda = await api.post('lawyers/config-schedule', objectJson);
    
                // Verifica o 'status code' recebido
                switch ((configuracaoAgenda).status) {
                    case 200:
                        setState({ redirect: true });
                        alert(`SUCESSO`);
                        break;
                    default:
                        alert(`🤨 Algo deu errado! Tente novamente mais tarde`);
                        break;
                }

            } else {
                alert('Preencha todos os campos!')
            }
        } catch (error) {
            alert("Inválido! " + error.message);
        }
    }

    const handleRadioChange = (event) => {
        setValue((event.target).value);
        setHelperText(' ');
        setError(false);

        if (value === 'best') {
        setHelperText('You got it!');
        setError(false);
        } else if (value === 'worst') {
        setHelperText('Sorry, wrong answer!');
        setError(true);
        } else {
        setHelperText('Please select an option.');
        setError(true);
        }
    };

    function handleHorarioInicioChange(event, values) {
        setHorarioInicio(values);
    }
    
    function handleHorarioFinalChange(event, values) {
        setHorarioFinal(values);
    }

    function handleDuracaoChange(event, values) {
        setDuracao(values);
    }

    return (
        <Container component="main" maxWidth="xs">

            <TitleJustissimo/>
            <TitlePage internal="Configuração da Agenda" />

            <br/>
            <br/>

            <span> <b>
                Segunda-feira à Sexta-feira
            </b> </span>

            <p>
                Digite suas informações de atendimento
            </p>

            <Autocomplete
                options={horarios}
                renderInput={(params) => <TextField {...params} label="Horário inicial dos atendimentos" />}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={ handleHorarioInicioChange }
            />

            <Autocomplete
                options={horarios}
                renderInput={(params) => <TextField {...params} label="Horário final dos atendimentos" />}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={ handleHorarioFinalChange }
            />

            <br/>
            <br/>

            <Autocomplete
                options={duracoes}
                renderInput={(params) => <TextField {...params} label="Duração do Agendamento (formato em minutos)" />}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={ handleDuracaoChange }
            />

            <br/>
            <br/>

            <ButtonOutlined
                internal="SALVAR CONFIGURAÇÃO" 
                type="submit"
                variant="outlined"
                onClick={handleConfiguracao}
            />

        </Container>
    );

}
