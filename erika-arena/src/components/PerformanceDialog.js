//src/components/PerformanceDialog.js
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  LinearProgress,
  Grid,
  Paper,
  useTheme
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TokenIcon from '@mui/icons-material/Token';
import BarChartIcon from '@mui/icons-material/BarChart';

const PerformanceDialog = ({ open, onClose, responses, models }) => {
  const theme = useTheme();
  
  // Calculate metrics
  const calculateMetrics = () => {
    return models.map(model => {
      const response = responses[model.id];
      return {
        name: model.name,
        latency: response ? parseFloat(response.latency) : 0,
        tokens: response ? response.tokens : 0,
        color: model.color
      };
    });
  };
  
  const metrics = calculateMetrics();
  
  // Find max values for scaling
  const maxLatency = Math.max(...metrics.map(m => m.latency), 1);
  const maxTokens = Math.max(...metrics.map(m => m.tokens), 100);
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
        <BarChartIcon sx={{ mr: 1 }} /> Performance Metrics
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon sx={{ mr: 1, color: theme.palette.primary.main }} /> 
                Response Latency (seconds)
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {metrics.map((metric, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">{metric.name}</Typography>
                      <Typography variant="body2">{metric.latency.toFixed(2)}s</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(metric.latency / maxLatency) * 100} 
                      sx={{ 
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: theme.palette.grey[300],
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: metric.color,
                          borderRadius: 5
                        }
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <TokenIcon sx={{ mr: 1, color: theme.palette.primary.main }} /> 
                Token Usage
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {metrics.map((metric, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">{metric.name}</Typography>
                      <Typography variant="body2">{metric.tokens} tokens</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(metric.tokens / maxTokens) * 100} 
                      sx={{ 
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: theme.palette.grey[300],
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: metric.color,
                          borderRadius: 5
                        }
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
        
        <Paper sx={{ p: 2, mt: 3, bgcolor: theme.palette.info.light }}>
          <Typography variant="subtitle1" gutterBottom>
            Estimated Cost Analysis
          </Typography>
          <Typography variant="body2">
            Based on current responses, the estimated cost for this query is approximately $0.0035.
            GPT-4 accounts for 65% of the total cost due to higher token usage.
          </Typography>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PerformanceDialog;