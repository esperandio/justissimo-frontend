import TextField from "@mui/material/TextField";
import React from "react";
import InputMask from "react-input-mask";

const InputCNPJMask = ({value, onChange, required = false}) => (
  <InputMask mask="99.999.999/9999-99" value={value} onChange={onChange} >{() => <TextField value={value} required={required} label="CNPJ" margin="normal" variant="outlined"/>}</InputMask>
);

export default InputCNPJMask;