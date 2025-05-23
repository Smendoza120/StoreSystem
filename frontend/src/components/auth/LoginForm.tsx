import React, { useState } from "react";
import { TextField, Button, Box, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { loginUser } from "../../services/loginService";

interface ApiError {
  message: string;
  statusCode?: number;
}

const LoginForm: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleIdentifierChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIdentifier(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleCancelar = () => {
    setIdentifier("");
    setPassword("");
    setError(null);
  };

  const handleIngresar = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await loginUser({ identifier, password });
      localStorage.setItem("jwtToken", response.jwt);
      window.location.href = "/";
    } catch (err: unknown) {
      console.error("Error al iniciar sesión:", error);
      let errorMessage =
        "Error al iniciar sesión. Por favor, inténtalo de nuevo.";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "object" && err !== null && "message" in err) {
        errorMessage = (err as ApiError).message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="identifier"
        label="Usuario o Correo Electrónico"
        name="identifier"
        autoComplete="identifier"
        autoFocus
        value={identifier}
        onChange={handleIdentifierChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Contraseña"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          onClick={handleCancelar}
          startIcon={<CloseIcon />}
          sx={{ mr: 2 }}
        >
          Cancelar
        </Button>
        <Button
          type="button"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleIngresar}
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </Button>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default LoginForm;
