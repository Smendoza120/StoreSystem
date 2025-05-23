import React from "react";
import { Box, Typography, Button } from "@mui/material";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

interface SalesSummaryProps {
  totalSale: number;
  onMakeSale: () => void;
}

const SalesSummary: React.FC<SalesSummaryProps> = ({
  totalSale,
  onMakeSale,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        mt: 3,
        p: 2,
        borderTop: "1px solid #eee",
      }}
    >
      <Typography variant="h5" sx={{ mr: 4 }}>
        Total:{" "}
        <Box component="span" sx={{ fontWeight: "bold" }}>
          ${totalSale.toLocaleString()}
        </Box>
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<PointOfSaleIcon />}
        onClick={onMakeSale}
        size="large"
      >
        Realizar Venta
      </Button>
    </Box>
  );
};

export default SalesSummary;
