import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function TextFieldPassword({ onChange }) {
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function handleClickMostrarSenha()
  {
    setMostrarSenha(!mostrarSenha);
  }

  function handleChangeSenha(e)
  {
    setSenha(e.target.value);
    onChange(e);
  }

  return (
    <>
      <FormControl required fullWidth variant="outlined" margin="normal">
        <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={mostrarSenha ? "text" : "password"}
          value={senha}
          onChange={ handleChangeSenha }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={ handleClickMostrarSenha }
                edge="end"
              >
                {mostrarSenha ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Senha"
        />
      </FormControl>
    </>
  );
}