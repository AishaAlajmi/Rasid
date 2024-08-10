import React, { useContext } from 'react';
import { Box, IconButton, Badge, InputBase, Typography, useTheme, styled, Avatar } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchIcon from "@mui/icons-material/Search";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: '#ffffff',
    color: 'red',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    position: 'absolute',
    top: 12,
    right: 12,
    width: '23px',
    height: '23px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.0rem',
  }
}));

// Defining StyledAvatar
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(5), // Reduced size
  height: theme.spacing(5), // Reduced size
  marginRight: theme.spacing(1), // Adjusted margin
}));

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2} alignItems="center">
      {/* SEARCH BAR AND NOTIFICATIONS */}
      <Box display="flex" alignItems="center">
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          sx={{ mr: 2 }}  // Add margin to separate from notifications
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
        
        {/* CUSTOMIZED NOTIFICATION ICON */}
        <Box display="flex" alignItems="center">
          <IconButton>
            <StyledBadge badgeContent={3} color="secondary">
              <NotificationsOutlinedIcon sx={{ fontSize: '2.5rem', color: theme.palette.error.main }} />
            </StyledBadge>
          </IconButton>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>Triggered alerts</Typography>
        </Box>
      </Box>

      {/* OTHER ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <Box display="flex" alignItems="center">
          <StyledAvatar src="../../assets/images.jpeg" alt="Edward Lore" />
          <Box>
            <Typography variant="h6" component="div">
           Ahmed Ali
            </Typography>
            <Typography variant="subtitle2" component="div">
              Production Manager
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
