import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { verificaToken } from "../middewares/verificaToken";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const caixa = await prisma.caixa.findMany();
    res.status(200).json(caixa);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const { dia, mes, ano, tipo, valor, origem, descricao } = req.body;

  if (!dia || !mes || !ano || !tipo || !valor || !origem || !descricao) {
    res.status(400).json({
      erro: "Informe dia, mes, ano, tipo, valor, origem, descricao",
    });
    return;
  }

  try {
    const movimentacao = await prisma.caixa.create({
      data: {
        dia: Number(dia),
        mes,
        ano: Number(ano),
        tipo,
        valor: Number(valor),
        origem,
        descricao,
      },
    });

    res.status(201).json(movimentacao);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const animal = await prisma.caixa.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(animal);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { dia, mes, ano, tipo, valor, origem, descricao } = req.body;

  try {
    const movimentacao = await prisma.caixa.update({
      where: { id: Number(id) },
      data: {
        ...(dia && { dia }),
        ...(mes && { mes }),
        ...(ano && { ano }),
        ...(tipo && { tipo }),
        ...(valor && { valor }),
        ...(origem && { origem }),
        ...(descricao && { descricao }),
      },
    });

    res.status(201).json(movimentacao);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
