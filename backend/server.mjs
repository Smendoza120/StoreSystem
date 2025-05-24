import app from "./index.mjs";

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
