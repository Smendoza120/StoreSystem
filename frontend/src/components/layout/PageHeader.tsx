import React from 'react';
import { Typography, Box } from '@mui/material';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" color="textSecondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default PageHeader;