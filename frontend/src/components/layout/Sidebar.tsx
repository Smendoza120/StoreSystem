import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from '@mui/icons-material/Logout';
import StorefrontIcon from '@mui/icons-material/Storefront';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({open, onClose}) =>{
  return (
    <Drawer open={open} onClose={onClose} variant="permanent">
      <List>
        <ListItem>
          <ListItemIcon>
            <StorefrontIcon />
          </ListItemIcon>
          <ListItemText primary="StoreSystem" />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </ListItem>
      </List>
    </Drawer>
  )
}

export default Sidebar;