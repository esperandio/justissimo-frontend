import TextField from '@mui/material/TextField';
import React from "react";
import InputMask from "react-input-mask";

const InputCPFMask = ({value, onChange, required = false}) => (
  <InputMask mask="999.999.999-99" value={value} onChange={onChange} >{() => <TextField value={value} required={required} label="CPF" margin="normal" variant="outlined"/>}</InputMask>
);

export default InputCPFMask;