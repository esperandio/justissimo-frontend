import TextField from '@mui/material/TextField';
import React from "react";
import InputMask from "react-input-mask";

const InputTelefoneMask = ({value, onChange, required = false}) => (
  <InputMask mask="(99) 9 9999-9999" value={value} onChange={onChange} >{() => <TextField value={value} required={required} label="Telefone" margin="normal" variant="outlined"/>}</InputMask>
);

export default InputTelefoneMask;