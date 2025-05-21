import React from 'react';
import { Box, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

interface NoDataDisplayProps {
  message?: string;
}

const NoDataDisplay: React.FC<NoDataDisplayProps> = ({ message = 'No hay datos para mostrar.' }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4,
      color: 'text.secondary',
      textAlign: 'center',
      border: '1px dashed #ccc',
      borderRadius: '4px'
    }}>
      <InfoIcon sx={{ fontSize: 40, mb: 1 }} />
      <Typography variant="body1">{message}</Typography>
    </Box>
  );
};

export default NoDataDisplay;