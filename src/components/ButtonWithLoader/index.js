import React, { useState } from "react";
import { 
  Button,
  Box,
  CircularProgress
} from "@mui/material";

export default function ButtonWithLoader({ children, disabled, onClick }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    await onClick();
    setLoading(false);
  }

  return (
    <>
      <Box sx={{ m: 1, position: "relative" }}>
        <Button
          variant="contained"
          disabled={loading || disabled}
          onClick={ handleClick }
        >
          {children}
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Box>
    </>
  );
}