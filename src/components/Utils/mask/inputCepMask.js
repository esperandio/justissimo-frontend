import TextField from "@mui/material/TextField";
import React from "react";
import InputMask from "react-input-mask";

const InputCEPMask = ({value, onChange, required = false}) => (
  <InputMask mask="99999-999" value={value} onChange={onChange} >{() => <TextField  required={required} label="CEP" margin="normal" variant="outlined"/>}</InputMask>
);

export default InputCEPMask;