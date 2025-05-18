
import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InventoryPage from './pages/InventoryPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/inventario" element={<InventoryPage />} />
          <Route path="/" element={<InventoryPage />} /> 
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
