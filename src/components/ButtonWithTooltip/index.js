import React from "react";
import { 
  Button,
  Tooltip
} from "@mui/material";

export default function ButtonWithTooltip({ children, startIcon, disabled, tooltip, onClick }) {
  return (
    <>
      {disabled === true && (
        <Tooltip title={tooltip}>
          <span>
            <Button 
              variant="contained"
              color="primary"
              type="submit"
              startIcon={ startIcon }
              disabled={ true }
              onClick={ onClick }
            >
              { children }
            </Button>
          </span>
        </Tooltip>
      )}

      {disabled === false && (
        <Button 
          variant="contained"
          color="primary"
          type="submit"
          startIcon={ startIcon }
          onClick={ onClick }
        >
          { children }
        </Button>
      )}
    </>
  );
}