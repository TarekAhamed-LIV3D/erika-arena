// src/components/HistoryPanel.js
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  Box,
  Chip,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';

const HistoryPanel = ({ open, onClose, history, setPrompt }) => {
  const theme = useTheme();
  
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100%', sm: 400 } } }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <HistoryIcon sx={{ mr: 1 }} /> Prompt History
        </Typography>
        <IconButton onClick={onClose} aria-label="close history">
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      
      {history.length === 0 ? (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="textSecondary">
            No history yet. Submit a prompt to start comparing AI responses.
          </Typography>
        </Box>
      ) : (
        <List sx={{ overflowY: 'auto' }}>
          {history.map((entry) => (
            <React.Fragment key={entry.id}>
              <ListItem 
                button 
                onClick={() => {
                  setPrompt(entry.prompt);
                  onClose();
                }}
                sx={{
                  '&:hover': { backgroundColor: theme.palette.action.hover }
                }}
              >
                <ListItemText
                  primary={entry.prompt}
                  secondary={new Date(entry.timestamp).toLocaleString()}
                  primaryTypographyProps={{ 
                    noWrap: true,
                    sx: { 
                      fontWeight: 'medium',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }
                  }}
                  secondaryTypographyProps={{ noWrap: true }}
                />
                <Box sx={{ ml: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {Object.keys(entry.responses).map(modelId => (
                    <Chip 
                      key={modelId} 
                      label={modelId} 
                      size="small" 
                      variant="outlined"
                      sx={{ fontSize: '0.6rem' }}
                    />
                  ))}
                </Box>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
    </Drawer>
  );
};

export default HistoryPanel;