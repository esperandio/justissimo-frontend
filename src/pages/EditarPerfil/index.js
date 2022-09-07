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

export default function EditarPerfil() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [info, setInfo] = useState('');
  const [imagemPreview, setImagemPreview] = useState(null);

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
                    width={'200px'}
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

              {/* E-mail */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <TextField
                    required
                    id="email"
                    label="E-mail"
                    placeholder="meuemail@email.com"
                    variant="outlined"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    margin="normal"
                  />
                </FormControl>
              </Grid>

              {/* Nome */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <TextField 
                    required
                    id="Nome"
                    label="Nome"
                    placeholder="Digite o nome completo"
                    variant="outlined"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    margin="normal"
                  />
                </FormControl>
              </Grid>

              {/* Descrição */}
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    multiline
                    label="Descrição do perfil"
                    variant="outlined"
                    value={info}
                    onChange={e => setInfo(e.target.value)}
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