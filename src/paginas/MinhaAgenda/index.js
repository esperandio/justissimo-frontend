import * as React from 'react';
import'./index.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MinhaAgenda() {

    function deleteRow(r) {
        var i = r.parentNode.parentNode.rowIndex;
        document.getElementById("myTable").deleteRow(i);
      }
      
  return (
    
     <Card id="myTable" sx={{ maxWidth: 500 }}>
       <CardContent>
         <Typography gutterBottom variant="h5" component="div" class="nome">
         Matheus Esperandio
         </Typography>
         
         <Typography gutterBottom variant="h5" component="div" class="causa">
         Causa Trabalhista
         </Typography>

         <Typography gutterBottom variant="h6" component="div">
         08/04/2022
         </Typography>

         <Typography gutterBottom variant="h7" component="div">
         Sexta-Feira
         </Typography>

         <Typography gutterBottom variant="h8" component="div">
         15:00h
         </Typography>

         <Typography gutterBottom variant="h6" component="div">
         Contato em matheusesperandio@gmail.com
         </Typography>
       </CardContent>
       <CardActions>
            <Button size="small" color="primary">
                ENCERRAR
            </Button>
       </CardActions>
     </Card>
    

  );
}
