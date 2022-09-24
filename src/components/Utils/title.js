import React from "react";
import { TitleJustissimoStyled, TitlePageStyled } from "../Style/titleStyled";

function TitleJustissimo() {
  return(
    <TitleJustissimoStyled>
            JUSTÍSSIMO
    </TitleJustissimoStyled>
  );
}

function TitlePage(props) {
  return(
    <TitlePageStyled>
      {props.internal}
    </TitlePageStyled>
  )
}


export { TitleJustissimo, TitlePage } ;
