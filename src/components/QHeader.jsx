import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const QHeader = ({ title, subtitle, handleClose }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4B23B6",
        color: "white",
        px: 2,
        py: 1,
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img
          src="../../assets/LogoLight.png"
          alt="Mosand Logo"
          style={{ width: 704, height: 40, marginRight: 16 }}
        />
      </Box>
      <Typography variant="h5" sx={{ flexGrow: 1, textAlign: "center" }}>
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#6C7CF7",
            color: "white",
            textTransform: "none",
            mr: 2,
            "&:hover": {
              backgroundColor: "#5B6AD1",
            },
          }}
        >
          Options
        </Button>
        <IconButton sx={{ color: "white" }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default QHeader;
