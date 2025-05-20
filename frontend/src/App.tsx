import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import InventoryPage from "./pages/InventoryPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import LoginPage from "./pages/Login";
import UserPage from "./pages/UserPage";
import CreateUserPage from "./pages/CreateUser";
import Sidebar from "./components/layout/Sidebar";
import { Box } from "@mui/material";
import MainLayout from "./components/layout/MainLayout";

const theme = createTheme();
// const drawerWidth = 240;

// const Layout = () => {
//   return (
//     <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
//       <CssBaseline />
//       <Sidebar open={true} onClose={() => {}} width={drawerWidth} /> {/* Asegúrate de pasar el ancho */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           ml: `${drawerWidth}px`,
//           p: 3,
//           width: `calc(100% - ${drawerWidth}px)`,
//         }}
//       >
//         <Outlet /> {/* Aquí se renderizarán las páginas */}
//       </Box>
//     </Box>
//   );
// };

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
