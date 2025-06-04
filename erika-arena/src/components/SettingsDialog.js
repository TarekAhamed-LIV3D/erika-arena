// src/components/SettingsDialog.js
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  FormGroup,
  FormControlLabel,
  Divider,
  Typography
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const SettingsDialog = ({ open, onClose, models, selectedModels, setSelectedModels }) => {
  const handleToggleModel = (modelId) => {
    setSelectedModels(prev => 
      prev.includes(modelId)
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
        <SettingsIcon sx={{ mr: 1 }} /> Dashboard Settings
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6" gutterBottom>
          Enabled AI Models
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Select which models to include in comparisons
        </Typography>
        
        <List>
          {models.map((model) => (
            <ListItem key={model.id}>
              <ListItemText primary={model.name} secondary={model.provider} />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={selectedModels.includes(model.id)}
                  onChange={() => handleToggleModel(model.id)}
                  inputProps={{ 'aria-labelledby': `switch-${model.id}` }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Display Settings
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Show token counts"
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Show latency metrics"
          />
          <FormControlLabel
            control={<Switch />}
            label="Enable response caching"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Save Settings
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;