import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router';
import api from '../../../../service/api';
import {TitleJustissimo} from '../../../../style/Utils/title_style';
import { Rating } from '@mui/material';
import { TextareaAutosize } from '@material-ui/core';

// Style
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function RedefinirSenha_Codigo() {

    const classes = useStyles();

    // const id_cliente = sessionStorage.getItem('id_cliente');
    // const id_advogado = sessionStorage.getItem('id_advogado');
    
    // const [id_cliente, setIDCliente] = useState('');
    // const [id_advogado, setIDAdvogado] = useState('');

    // Digite aqui o id do cliente e advogado
    // const id_cliente = Number(1);
    // const id_advogado = Number(1);
    let id_cliente;
    let id_advogado;

    const [nota, setNota] = useState('');
    const [descricao, setDescricao] = useState('');
    const [redirect, setState] = useState(false);

    /**
     * Handle
     * @param {*} e 
     */
    async function handleAvaliacaoAdvogado(e) {
        e.preventDefault();

        const dados = {
            id_cliente,
            nota,
            descricao
        };

        // let id_cliente_cache = prompt("Digite o id, do cliente:", "1");
        // let id_advogado_cache = prompt("Digite o id do advogado:", "1");
        // setIDCliente(id_cliente_cache);
        // setIDAdvogado(id_advogado_cache);

        /**
         * Converte os dados para o formato Number (formato correto que deverá chegar na API (backend))
         * @param {*} nota 
         * @param {*} id_cliente 
         * @param {*} id_advogado 
         */
        function convertDados(nota/*, id_cliente, id_advogado*/) {
            setNota(Number(nota))
            // setIDCliente(Number(id_cliente))
            // setIDAdvogado(Number(id_advogado))
        };

        try {
            if (/*dados.id_cliente !== "" &&*/ dados.nota !== "") {
                alert('Como não existe as telas de consulta, não há como puxar os ids do cliente ou do advogado, no momento, o mesmo deve ser setado brasalmente');
                dados.id_cliente = Number(prompt("Digite o id, do cliente:", "1"));
                id_advogado = Number(prompt("Digite o id do advogado:", "1"));

                // Converte os dados necessários para o tipo Number
                convertDados(dados.nota/*, dados.id_cliente, id_advogado*/)

                // Envia ao backend/api os dados inseridos
                // const lawyer_review = await api.post(`lawyers/${sessionStorage.getItem('id_advogado')}/review`, dados);
                const lawyer_review = await api.post(`lawyers/${id_advogado}/review`, dados);

                // Verifica o 'status code' recebido
                switch ((lawyer_review).status) {
                    case 200:
                        alert('Obrigado! Advogado avaliado com sucesso!');
                        setState({ redirect: true });
                        break;
                    default:
                        alert(`🤨 Algo deu errado! Tente novamente mais tarde`);
                        break;
                }

            } else {
                alert(`Por favor, selecione as estrelas, para avaliar o advogado`)
            }
        } catch (error) {
            alert(`Algo deu errado!` + `\n\n`
                + `Nota: ` + dados.nota + `\n` 
                + `Descrição: ` + dados.descricao + `\n` 
                + `ID Cliente: ` + dados.id_cliente + `\n` 
                + `ID Advogado: ` + id_advogado + `\n\n`
                + `Tipo da nota: ` + typeof(dados.nota) + `\n` 
                + `Tipo do ID Cliente: ` + typeof(dados.id_cliente) + `\n` 
                + `Tipo do ID Advogado: ` + typeof(id_advogado) + `\n` 
                + `Tipo da Descrição: ` + typeof(dados.descricao)); 
        }
    }

    // Se o 'login' for aceito, redireciona para a tela da criação da nova senha
    // if (redirect) {
    //     return <Redirect to='novasenha' />;
    // }

    return (
        
        // Form
        <Container component="main" maxWidth="xs">
            <TitleJustissimo>
                JUSTÍSSIMO
            </TitleJustissimo>

            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} /*onSubmit={handleLogin}*/>

                    {/* Input Rating */}
                    <Rating 
                        id="nota"
                        name="nota" 
                        defaultValue={3} 
                        precision={0.5}
                        size='large'
                        
                        required 
                        autoFocus
                        value={nota}
                        onChange={e => setNota(e.target.value)}
                    />

                    <br/>
                    <br/>
                    <span>
                        <b>
                            Descrição
                        </b>
                    </span> <br/>
                    <span>
                        Descreva sua avaliação
                    </span>
                    <br/>

                    {/* Input TextArea 'Descrição' */}
                    <TextareaAutosize
                        id="descricao"
                        name="descricao"
                        autoComplete="descricao"
                        
                        autoFocus
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        // label="Aqui vai uma descrição da sua avaliação"
                        placeholder="Aqui vai uma descrição da sua avaliação"
                        aria-label="minimum height"
                        
                        minRows={3}
                        value={descricao}
                        style={{ width: '100%' }}
                        
                        onChange={e => setDescricao(e.target.value)}
                    />

                    {/* Button 'Avaliar' */}
                    <Button className={classes.submit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleAvaliacaoAdvogado}
                    >
                    AVALIAR
                    </Button>

                </form>
            </div>
        </Container>
    );
}

