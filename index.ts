import express from "express";
import cors from "cors";

import animaisRoutes from "./routes/animais";
import caixaRoutes from "./routes/caixa";
import categoriaSupRoutes from "./routes/categoriaSup";
import fotosRoutes from "./routes/fotos";
import funcionariosRoutes from "./routes/funcionarios";
import funcoesRoutes from "./routes/funcoes";
import interessadosRoutes from "./routes/interessados";
import suprimentosRoutes from "./routes/suprimentos";

const app = express();
const port = 3004;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/animais", animaisRoutes);
app.use("/caixa", caixaRoutes);
app.use("/categoriaSup", categoriaSupRoutes);
app.use("/fotos", fotosRoutes);
app.use("/funcionarios", funcionariosRoutes);
app.use("/funcoes", funcoesRoutes);
app.use("/interessados", interessadosRoutes);
app.use("/suprimentos", suprimentosRoutes);

app.get("/", (req, res) => {
  res.send("API: Sistema de Controle de Veículos");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
