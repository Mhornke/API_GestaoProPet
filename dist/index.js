"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const especies_1 = __importDefault(require("./routes/especies"));
const animais_1 = __importDefault(require("./routes/animais"));
// import fotoAnimaisRoutes from "./routes/fotoAnimais";
// import fotoFuncionariosRoutes from "./routes/fotoFuncionarios";
// import fotoInteressadosRoutes from "./routes/fotoInteressados";
const interessados_1 = __importDefault(require("./routes/interessados"));
const funcionarios_1 = __importDefault(require("./routes/funcionarios"));
const enderecos_1 = __importDefault(require("./routes/enderecos"));
const caixa_1 = __importDefault(require("./routes/caixa"));
const suprimentos_1 = __importDefault(require("./routes/suprimentos"));
const app = (0, express_1.default)();
const port = 3004;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/especies", especies_1.default);
app.use("/animais", animais_1.default);
// app.use("/fotoAnimais", fotoAnimaisRoutes);
// app.use("/fotoFuncionarios", fotoFuncionariosRoutes);
// app.use("/fotosInteressado", fotoInteressadosRoutes);
app.use("/interessados", interessados_1.default);
app.use("/funcionarios", funcionarios_1.default);
app.use("/enderecos", enderecos_1.default);
app.use("/suprimentos", suprimentos_1.default);
app.use("/caixa", caixa_1.default);
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
