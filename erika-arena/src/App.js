//src/App.js
import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  History as HistoryIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

import Header from './components/header';
import PromptInput from './components/promptinput';
import ModelCard from './components/ModelCard';
import HistoryPanel from './components/HistoryPanel';
import PerformanceDialog from './components/PerformanceDialog';
import SettingsDialog from './components/SettingsDialog';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [performanceOpen, setPerformanceOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedModels, setSelectedModels] = useState([
    'gpt-4', 'claude-3', 'llama-3', 'gemini', 'mixtral'
  ]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });

  // Sample AI models
  const aiModels = [
    { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', color: '#9c27b0' },
    { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic', color: '#2196f3' },
    { id: 'llama-3', name: 'Llama 3', provider: 'Meta', color: '#ff9800' },
    { id: 'gemini', name: 'Gemini Pro', provider: 'Google', color: '#4caf50' },
    { id: 'mixtral', name: 'Mixtral', provider: 'Mistral', color: '#f44336' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResponses({});
    
    // Simulate API call - in a real app, this would connect to your backend
    const newResponses = {};
    const modelsToFetch = aiModels.filter(model => selectedModels.includes(model.id));
    
    modelsToFetch.forEach(model => {
      setTimeout(() => {
        const simulatedResponse = {
          content: `This is a simulated response from ${model.name}. The user asked: "${prompt}". In a real implementation, this would connect to the actual ${model.provider} API.`,
          latency: (Math.random() * 2 + 0.5).toFixed(2),
          tokens: Math.floor(Math.random() * 300 + 100),
          timestamp: new Date().toISOString(),
        };
        
        newResponses[model.id] = simulatedResponse;
        setResponses({...newResponses});
        
        // When all responses are in
        if (Object.keys(newResponses).length === modelsToFetch.length) {
          setIsLoading(false);
          addToHistory(prompt, newResponses);
        }
      }, Math.random() * 3000);
    });
  };

  const addToHistory = (prompt, responses) => {
    const historyEntry = {
      id: Date.now(),
      prompt,
      responses,
      timestamp: new Date().toISOString()
    };
    
    setHistory(prev => [historyEntry, ...prev.slice(0, 9)]); // Keep last 10 entries
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleErrorClose = () => {
    setError(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container" style={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
            <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Grid item xs={12} md={8}>
                <Typography variant="h4" component="h1" gutterBottom>
                  AI Model Comparison Dashboard
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Compare responses from multiple AI models in real-time
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Tooltip title="View history">
                  <IconButton 
                    color="primary" 
                    onClick={() => setHistoryOpen(true)}
                    aria-label="View history"
                  >
                    <HistoryIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Performance metrics">
                  <IconButton 
                    color="primary" 
                    onClick={() => setPerformanceOpen(true)}
                    aria-label="Performance metrics"
                  >
                    <BarChartIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Settings">
                  <IconButton 
                    color="primary" 
                    onClick={() => setSettingsOpen(true)}
                    aria-label="Settings"
                  >
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
                  <IconButton 
                    color="primary" 
                    onClick={toggleDarkMode}
                    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            
            <PromptInput 
              prompt={prompt} 
              setPrompt={setPrompt} 
              handleSubmit={handleSubmit} 
              isLoading={isLoading} 
            />
          </Paper>
          
          {isLoading && (
            <Grid container justifyContent="center" sx={{ my: 4 }}>
              <CircularProgress size={60} />
            </Grid>
          )}
          
          <Grid container spacing={3}>
            {aiModels
              .filter(model => selectedModels.includes(model.id))
              .map((model) => (
                <Grid item xs={12} sm={6} md={4} key={model.id}>
                  <ModelCard 
                    model={model} 
                    response={responses[model.id]} 
                    isLoading={isLoading}
                  />
                </Grid>
              ))}
          </Grid>
          
          {!isLoading && Object.keys(responses).length === 0 && (
            <Paper sx={{ p: 4, mt: 4, textAlign: 'center' }} elevation={0}>
              <Typography variant="h6" color="textSecondary">
                Submit a prompt to see responses from AI models
              </Typography>
            </Paper>
          )}
        </Container>
        
        <HistoryPanel 
          open={historyOpen} 
          onClose={() => setHistoryOpen(false)} 
          history={history} 
          setPrompt={setPrompt}
        />
        
        <PerformanceDialog 
          open={performanceOpen} 
          onClose={() => setPerformanceOpen(false)} 
          responses={responses} 
          models={aiModels.filter(model => selectedModels.includes(model.id))}
        />
        
        <SettingsDialog 
          open={settingsOpen} 
          onClose={() => setSettingsOpen(false)} 
          models={aiModels} 
          selectedModels={selectedModels}
          setSelectedModels={setSelectedModels}
        />
        
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleErrorClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
};

export default App;