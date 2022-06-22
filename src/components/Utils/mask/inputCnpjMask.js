import TextField from '@material-ui/core/TextField';
import React from "react";
import InputMask from "react-input-mask";

const InputCNPJMask = ({value, onChange}) => (
  <InputMask mask="99.999.999/9999-99" value={value} onChange={onChange} >{() => <TextField  label="CNPJ" margin="normal" defaultValue="CNPJ" variant="outlined"/>}</InputMask>
);

export default InputCNPJMask;