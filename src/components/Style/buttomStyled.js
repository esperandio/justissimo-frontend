import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import styled_components, { css } from 'styled-components';

const ButtonStyled = styled_components.button`
display: inline-block;
border-radius: 3px;
padding: 0.7rem 0;
width: 100%;
text-align: center;
font-weight: 700;
background: transparent;
color: #1976D2;
border: 1px solid #1976D2;

    /* The GitHub button is a primary button
    * edit this to target it specifically! */
    ${props => props.primary && css`
    background: white;
    color: black;
    `}
`

const ButtonBootstrapCustom = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    // fontSize: 13,
    color: '#0062cc',
    margin: '2em 0',
    padding: '8px 12px',
    width: '100%',
    textAlign: 'center',
    fontWeight: 700,
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: 'transparent',
    borderColor: '#0062cc',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#E5EAF8',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#E5EAF8',
      borderColor: '#1976D2',
    }
  });

export { ButtonBootstrapCustom };
