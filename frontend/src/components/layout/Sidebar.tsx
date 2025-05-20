import React from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemButton,
  ListItem,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import type { SidebarProps } from "../../interfaces/Sidebar";
import { useLocation, Link } from "react-router-dom";

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, width }) => {
  const location = useLocation();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      variant="permanent"
      sx={{ width: width, "& .MuiDrawer-paper": { width: width } }}
    >
      <List sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div>
          <ListItem key="store" disablePadding>
            <ListItemText primary="StoreSystem" sx={{ pl: 2 }} />
          </ListItem>

          <Divider />

          <ListItem key="users" disablePadding>
            <Link
              to="/users"
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
              }}
            >
              <ListItemButton selected={location.pathname.startsWith("/users")}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Usuarios" />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem key="inventory" disablePadding>
            <Link
              to="/inventory"
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
              }}
            >
              <ListItemButton selected={location.pathname === "/inventory"}>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Inventario" />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem key="daily-sales" disablePadding>
            <Link
              to="/daily-sales"
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
              }}
            >
              <ListItemButton selected={location.pathname === "/daily-sales"}>
                <ListItemIcon>
                  <LocalGroceryStoreIcon />
                </ListItemIcon>
                <ListItemText primary="Ventas Diarias" />
              </ListItemButton>
            </Link>
          </ListItem>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <Divider />

          <ListItem key="logout" disablePadding>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
              }}
            >
              <ListItemButton selected={location.pathname === "/login"}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Cerrar sesión" />
              </ListItemButton>
            </Link>
          </ListItem>
        </div>
      </List>
    </Drawer>
  );
};

export default Sidebar;