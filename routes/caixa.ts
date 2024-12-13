import { PrismaClient } from "@prisma/client";
import { Router } from "express";

// const prisma = new PrismaClient()
const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});

prisma.$on("query", (e) => {
  console.log("Query: " + e.query);
  console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
});

const router = Router();

router.get("/", async (req, res) => {
  try {
    const lancamentos = await prisma.lancamento.findMany();
    res.status(200).json(lancamentos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const { dia, mes, ano, tipo, descricao, valor, origem, isEntrada } = req.body;

  if (
    !dia ||
    !mes ||
    !ano ||
    !tipo ||
    !descricao ||
    !valor ||
    !origem ||
    !isEntrada
  ) {
    res.status(400).json({
      erro: "Informe dia, mes, ano, tipo, descricao, valor, origem e isEntrada",
    });
    return;
  }

  try {
    const lancamento = await prisma.lancamento.create({
      data: { dia, mes, ano, tipo, descricao, valor, origem, isEntrada },
    });
    res.status(201).json(lancamento);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const lancamento = await prisma.lancamento.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(lancamento);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { dia, mes, ano, tipo, descricao, valor, origem, isEntrada } = req.body;

  if (
    !dia ||
    !mes ||
    !ano ||
    !tipo ||
    !descricao ||
    !valor ||
    !origem ||
    !isEntrada
  ) {
    res.status(400).json({
      erro: "Informe dia, mes, ano, tipo, descricao, valor, origem e isEntrada",
    });
    return;
  }

  try {
    const lancamento = await prisma.lancamento.update({
      where: { id: Number(id) },
      data: { dia, mes, ano, tipo, descricao, valor, origem, isEntrada },
    });
    res.status(200).json(lancamento);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
