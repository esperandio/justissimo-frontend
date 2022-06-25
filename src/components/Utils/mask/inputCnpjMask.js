import TextField from '@material-ui/core/TextField';
import React from "react";
import InputMask from "react-input-mask";

const InputCNPJMask = ({value, onChange, required = false}) => (
  <InputMask mask="99.999.999/9999-99" value={value} onChange={onChange} >{() => <TextField required={required} label="CNPJ" margin="normal" defaultValue="CNPJ" variant="outlined"/>}</InputMask>
);

export default InputCNPJMask;