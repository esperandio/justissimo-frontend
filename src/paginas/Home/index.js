import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from '../Main/Header';
import Footer from '../Main/Footer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'material-ui-image';
import ImagemHome from '../Imagens/pexels-photo-5668481.jpg';


export default function Blog() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Justíssimo"/>
      </Container>
      <Box sx={{mx: 'auto', width: {
        xs: 300,
        sm: 500,
        md: 700,
        lg: 1000,
        xl: 2000},
      }}>
        <Typography variant="h2" component="h2" color="inherit" align="center" noWrap>
          Justíssimo
        </Typography>
        <Typography variant="body1" gutterBottom align="justify">
          Justíssimo trata-se de uma fundamental ferramenta para democratizar o conhecimento jurídico, e de forma gratuita. 
          Além disso, auxilia muitos advogados em início de carreira, pelos serviços de correspondência.
          Tem, ainda os clientes procuram os advogados fácil.
        </Typography>
        <Typography variant="body1" gutterBottom align="justify">
          Somos uma starput que une Direito e Tecnologia para fazer com que a justiça dos tribunais e chegue às casas de 
          qualquer cidadão ou cidadã, suas decisões e por meio da informação.
        <Image
          src={ImagemHome}
        />
        </Typography>
      </Box>

      <Footer />
    </React.Fragment>
  );
}