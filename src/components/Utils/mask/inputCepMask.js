import TextField from '@material-ui/core/TextField';
import React from "react";
import InputMask from "react-input-mask";

const InputCEPMask = ({value, onChange}) => (
  <InputMask mask="99999-999" value={value} onChange={onChange} >{() => <TextField  label="CEP" margin="normal" defaultValue="CEP" variant="outlined"/>}</InputMask>
);

export default InputCEPMask;