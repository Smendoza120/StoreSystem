import React from "react";
import { Typography, Box, Divider } from "@mui/material";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actionButton,
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
        {actionButton && <Box sx={{ ml: 2 }}>{actionButton}</Box>}{" "}
        {/* <-- Renderizamos el botón si existe */}
      </Box>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default PageHeader;
