
import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InventarioPage from './pages/Inventory';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/inventario" element={<InventarioPage />} />
          <Route path="/" element={<InventarioPage />} /> 
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
