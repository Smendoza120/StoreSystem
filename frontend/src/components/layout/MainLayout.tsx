import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  const drawerWidth = 200;

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      <CssBaseline />
      <Sidebar open={true} onClose={() => {}} width={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
        className="fles items-center justify-center gap-2 overflow-x-hidden"
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;