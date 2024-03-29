import React from "react";
import { TextareaStyled } from "../Style/inputStyled";

function Textarea(props) {
  return(
    <TextareaStyled
      id={props.id}
      name={props.name}
      autoComplete={props.autoComplete}
      
      margin={props.margin}
      variant={props.variant}
      placeholder={props.placeholder}
      value={props.value}
            
      onChange={props.onChange}
    />
  );
}

export default Textarea;
