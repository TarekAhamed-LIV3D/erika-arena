//src/components/modelcard.js
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardActions, 
  Avatar, 
  Typography, 
  LinearProgress,
  Chip,
  useTheme,
  IconButton,
  Tooltip
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TokenIcon from '@mui/icons-material/Token';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const modelcard = ({ model, response, isLoading }) => {
  const theme = useTheme();
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = () => {
    if (response?.content) {
      navigator.clipboard.writeText(response.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      borderLeft: `4px solid ${model.color}`,
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[6]
      }
    }}>
      <CardHeader
        avatar={
          <Avatar 
            sx={{ 
              bgcolor: model.color,
              color: theme.palette.getContrastText(model.color)
            }}
          >
            {model.name.charAt(0)}
          </Avatar>
        }
        title={model.name}
        subheader={model.provider}
        action={
          response ? (
            <Chip 
              label="Responded" 
              size="small" 
              color="success" 
              variant="outlined"
            />
          ) : (
            <Chip 
              label="Waiting..." 
              size="small" 
              color="default" 
              variant="outlined"
            />
          )
        }
        sx={{ 
          pb: 0,
          '& .MuiCardHeader-content': {
            overflow: 'hidden'
          }
        }}
      />
      
      <CardContent sx={{ flexGrow: 1, pt: 1 }}>
        {isLoading && !response ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <LinearProgress sx={{ mb: 2 }} />
            <Typography variant="body2" color="textSecondary">
              Processing with {model.name}...
            </Typography>
          </Box>
        ) : response ? (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {response.content}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 'auto' }}>
              <Chip
                icon={<AccessTimeIcon fontSize="small" />}
                label={`${response.latency}s`}
                size="small"
                variant="outlined"
              />
              <Chip
                icon={<TokenIcon fontSize="small" />}
                label={`${response.tokens} tokens`}
                size="small"
                variant="outlined"
              />
            </Box>
          </>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: 150,
            textAlign: 'center',
            color: 'text.secondary'
          }}>
            <Typography variant="body2">
              Submit a prompt to see the response from {model.name}
            </Typography>
          </Box>
        )}
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
        {response && (
          <Tooltip title={copied ? "Copied!" : "Copy response"}>
            <IconButton 
              size="small" 
              onClick={handleCopy}
              aria-label="Copy response"
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
};

export default modelcard;