import React from 'react';
import { Typography } from '@mui/material';

const HeaderInventory: React.FC = () => {
  return (
    <div>
      <Typography variant='h4' gutterBottom>
        Inventario
      </Typography>

      <Typography variant='subtitle1' gutterBottom>
        Gestiona todos los productos de tu inventario
      </Typography>
    </div>
  )
}

export default HeaderInventory;