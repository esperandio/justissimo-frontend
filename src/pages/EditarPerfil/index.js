import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Header from '../Main/Header';
import Footer from '../Main/Footer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TitlePage } from '../../components/Utils/title';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@material-ui/core/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SaveIcon from '@material-ui/icons/Save';
import UserDefaultIcon from '../../user.svg';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from "date-fns/locale";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@material-ui/core/InputLabel';
import InputCpfMask from '../../components/Utils/mask/inputCpfMask';
import InputCnpjMask from '../../components/Utils/mask/inputCnpjMask';
import InputCepMask from '../../components/Utils/mask/inputCepMask';
import Autocomplete from '@mui/material/Autocomplete';

export default function EditarPerfil() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dt_nascimento, setNascimento] = useState(null);
  const [cpf, setCPF] = useState('');
  const [cnpj, setCNPJ] = useState('');
  const [cep, setCEP] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [imagemPreview, setImagemPreview] = useState(null);

  const [estados] = useState(['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
  'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']);

  const onImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImagemPreview(URL.createObjectURL(file));
  }

  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <TitlePage internal="Editar perfil" />

        <form onSubmit={() => { console.log('Submit'); }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container spacing={1}>
              {/* Imagem */}
              <Grid item xs={12} sm={12}>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <img 
                    src={imagemPreview == null ? UserDefaultIcon : imagemPreview} 
                    alt="preview" 
                    width={'180px'}
                  />

                  <FormControl>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="raised-button-file"
                      multiple
                      type="file"
                      onChange={onImageChange}
                    />
                    <label htmlFor="raised-button-file">
                      <Button 
                        component="span"
                        variant="contained"
                        color="primary"
                        startIcon={<FileUploadIcon />}
                      >
                        Imagem de perfil
                      </Button>
                    </label> 
                  </FormControl>
                </Stack>
              </Grid>

              {/* Home */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <TextField
                    required
                    id="Nome"
                    label="Nome"
                    placeholder="Digite o nome completo"
                    multiline
                    variant="outlined"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    margin="normal"
                  />
                </FormControl>
              </Grid>

              {/* Data de nascimento */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                    <DatePicker
                      label="Data de nascimento"
                      value={dt_nascimento}
                      onChange={newValue => setNascimento(newValue)}
                      renderInput={(params) => <TextField {...params} required variant="outlined" margin="normal" />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              {/* CPF */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="Tipo"></InputLabel>
                  <InputCpfMask value={cpf} required onChange={e => setCPF(e.target.value)} />
                </FormControl>
              </Grid>

              {/* CNPJ */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="Tipo"></InputLabel>
                  <InputCnpjMask value={cnpj} required onChange={e => setCNPJ(e.target.value)} />
                </FormControl>
              </Grid>

              {/* CEP */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="Tipo"></InputLabel>
                  <InputCepMask  
                    value={cep}
                    onChange={e => setCEP(e.target.value)}
                    required
                  />
                </FormControl>
              </Grid>

              {/* Estado */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <Autocomplete
                    options={estados}
                    value={estado}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    onChange={ (_, v) => { setEstado(v); } }
                    renderInput={(params) => <TextField {...params} required variant="outlined" margin="normal" label="Estado" />}
                  />
                </FormControl>
              </Grid>

              {/* Cidade */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <TextField
                    required
                    id="Cidade"
                    label="Cidade"
                    placeholder="Nome da Cidade"
                    multiline
                    variant="outlined"
                    value={cidade}
                    onChange={e => setCidade(e.target.value)}
                    margin="normal"
                  />
                </FormControl>
              </Grid>

              {/* E-mail */}
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    id="email"
                    label="E-mail"
                    placeholder="meuemail@email.com"
                    multiline
                    variant="outlined"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    margin="normal"
                  />
                </FormControl>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<SaveIcon />}
              >
                Alterar dados
              </Button>              
            </Grid>
          </Grid>
        </form>
      </Container>
      <Footer />
    </>
  )
}