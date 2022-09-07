import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../Main/Header';
import Footer from '../Main/Footer';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import WatsonComponent from '../../components/watson/watson_component';

export default function Home() {
    return (
        <React.Fragment>
            <WatsonComponent />
            <CssBaseline />
            <Header />
            <Container>
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{ height: '60vh' }}
                >
                    <Typography variant="h2" gutterBottom align='center' style={{ fontWeight: 600 }}>
                        The Progressive <br/>JavaScript Framework
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom align='center' style={{ fontStyle: 'italic' }}>
                        An approachable, performant and versatile framework for building web user interfaces. 
                    </Typography>
                </Stack>

                <Stack
                    direction={{ xs: "column", md: "row" }} 
                    justifyContent="center"
                    spacing={2}
                >
                    <Stack
                        direction="column"
                        justifyContent="center"
                        spacing={2}
                    >
                        <Typography variant="h6" style={{ fontWeight: 600 }}>
                            Approachable
                        </Typography>

                        <Typography variant="subtitle1" gutterBottom>
                            Builds on top of standard HTML, CSS and JavaScript with intuitive API and world-class documentation. 
                        </Typography>
                    </Stack>

                    <Stack
                        direction="column"
                        justifyContent="center"
                        spacing={2}
                    >
                        <Typography variant="h6" style={{ fontWeight: 600 }}>
                            Performant
                        </Typography>

                        <Typography variant="subtitle1" gutterBottom>
                            Truly reactive, compiler-optimized rendering system that rarely requires manual optimization. 
                        </Typography>
                    </Stack>

                    <Stack
                        direction="column"
                        justifyContent="center"
                        spacing={2}
                    >
                        <Typography variant="h6" style={{ fontWeight: 600 }}>
                            Versatile
                        </Typography>

                        <Typography variant="subtitle1" gutterBottom>
                            A rich, incrementally adoptable ecosystem that scales between a library and a full-featured framework. 
                        </Typography>
                    </Stack>
                </Stack>
            </Container>
            <Footer />
        </React.Fragment>  
    );
}