//src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar>
        <Box sx={{ 
          width: 40, 
          height: 40, 
          bgcolor: 'background.paper', 
          borderRadius: '50%', 
          mr: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            AI
          </Typography>
        </Box>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Model Comparison Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;