//src/components/promptinput.js
import React from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Box, 
  CircularProgress,
  FormControl,
  InputAdornment,
  IconButton
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';

const promptinput = ({ prompt, setPrompt, handleSubmit, isLoading }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Enter your prompt"
              variant="outlined"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              multiline
              minRows={3}
              maxRows={6}
              fullWidth
              disabled={isLoading}
              InputProps={{
                endAdornment: prompt && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setPrompt('')}
                      edge="end"
                      aria-label="clear prompt"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              helperText="Press Shift+Enter for new line"
            />
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6} md={8}>
          <Typography variant="caption" color="textSecondary">
            Compare responses from multiple AI models simultaneously
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => setPrompt('')}
              disabled={isLoading || !prompt}
            >
              Clear
            </Button>
            
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading || !prompt.trim()}
              endIcon={isLoading ? <CircularProgress size={20} /> : <SendIcon />}
              sx={{ minWidth: 150 }}
            >
              {isLoading ? 'Processing...' : 'Submit'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default promptinput;