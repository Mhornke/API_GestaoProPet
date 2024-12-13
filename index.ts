import express from "express";
import cors from "cors";
import especiesRoutes from "./routes/especies";
import animaisRoutes from "./routes/animais";
import fotoAnimaisRoutes from "./routes/fotoAnimais";
import fotoFuncionariosRoutes from "./routes/fotoFuncionarios";
// import fotoInteressadosRoutes from "./routes/fotoInteressados";
import interessadosRoutes from "./routes/interessados";
import dashboardRoutes from "./routes/dashboard";
import userSistemaRoutes from "./routes/usersistema";
import funcionariosRoutes from "./routes/funcionarios";
import enderecosRoutes from "./routes/enderecos";
import caixaRoutes from "./routes/caixa";
import suprimentoRoutes from "./routes/suprimentos";

const app = express();
const port = 3004;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/especies", especiesRoutes);
app.use("/animais", animaisRoutes);
app.use("/fotoAnimais", fotoAnimaisRoutes);
app.use("/fotoFuncionarios", fotoFuncionariosRoutes);
// app.use("/fotosInteressado", fotoInteressadosRoutes);

app.use("/interessados", interessadosRoutes);
app.use("/funcionarios", funcionariosRoutes);
app.use("/enderecos", enderecosRoutes);
app.use("/suprimentos", suprimentoRoutes);

app.use("/caixa", caixaRoutes);

app.get("/", (req, res) => {
  res.send("API GestaoProPet");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});

// "id": 1,
// "nome": "Rodrigo",
// "email": "rodrigo@propet.com",
// "senha": "$2b$12$50/qy50qmKvqcoF8Xo0RUuiJt4cNRHwOUyymnzcWYELSC9bj1FDkq",
