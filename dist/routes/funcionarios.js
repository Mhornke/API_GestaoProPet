"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const admins = await prisma.funcionario.findMany();
        res.status(200).json(admins);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
router.post("/", async (req, res) => {
    const { nome, cpf, telefone, estadoCivil, dataNascimento, email, acessaSistema, observacoes, senha, } = req.body;
    if (acessaSistema) {
        if (!nome || email) {
            res.status(400).json({ erro: "Informe nome, email e senha" });
            return;
        }
        try {
            const admin = await prisma.funcionario.create({
                data: {
                    nome,
                    cpf,
                    telefone,
                    estadoCivil,
                    dataNascimento,
                    email,
                    acessaSistema,
                    observacoes,
                    senha,
                },
            });
            res.status(201).json(admin);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
    else {
        const admin = await prisma.funcionario.create({
            data: {
                nome,
                cpf,
                telefone,
                estadoCivil,
                dataNascimento,
                acessaSistema,
                observacoes,
                senha,
            },
        });
        res.status(201).json(admin);
        if (!nome) {
            res.status(400).json({ erro: "Informe nome" });
            return;
        }
    }
});
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, cpf, telefone, estadoCivil, dataNascimento, email, acessaSistema, observacoes, senha, } = req.body;
    if (acessaSistema) {
        if (!nome || !email || !senha) {
            res.status(400).json({ erro: "Informe nome, email e senha" });
            return;
        }
        try {
            const admin = await prisma.funcionario.update({
                where: { id: id },
                data: {
                    nome,
                    estadoCivil,
                    email,
                    acessaSistema,
                    ...(cpf && { cpf }),
                    ...(telefone && { telefone }),
                    ...(dataNascimento && { dataNascimento }),
                    ...(acessaSistema && { acessaSistema }),
                    ...(observacoes && { observacoes }),
                    ...(senha && { senha }),
                },
            });
            res.status(201).json(admin);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
    else {
        const admin = await prisma.funcionario.update({
            where: { id: id },
            data: {
                nome,
                ...(cpf && { cpf }),
                ...(telefone && { telefone }),
                ...(dataNascimento && { dataNascimento }),
                ...(acessaSistema && { acessaSistema }),
                ...(observacoes && { observacoes }),
                ...(senha && { senha }),
            },
        });
        res.status(201).json(admin);
        if (!nome) {
            res.status(400).json({ erro: "Informe nome" });
            return;
        }
    }
});
exports.default = router;
