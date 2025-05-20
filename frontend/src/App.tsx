import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InventoryPage from "./pages/InventoryPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import LoginPage from "./pages/Login";
import UserPage from "./pages/UserPage";
import CreateUserPage from "./pages/CreateUser";
import MainLayout from "./components/layout/MainLayout";

const theme = createTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} /> {/* El login no usa el Layout */}
          <Route path="/" element={<MainLayout />}> {/* Usa el Layout como elemento de la ruta padre */}
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/users/create" element={<CreateUserPage />} />
            <Route index element={<InventoryPage />} /> {/* Ruta por defecto */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
