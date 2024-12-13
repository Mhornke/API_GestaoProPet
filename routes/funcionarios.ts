import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const funcionarios = await prisma.funcionario.findMany({
      include: {
        funcaoPrincipal: true,
      },
    });
    res.status(200).json(funcionarios);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const { nome, telefone, funcaoPrincipalId } = req.body;

  if (!nome || !telefone || !funcaoPrincipalId) {
    res.status(400).json({
      erro: "Informe nome, telefone, funcaoPrincipalId",
    });
    return;
  }

  try {
    const funcionario = await prisma.funcionario.create({
      data: {
        nome,
        telefone,
        funcaoPrincipalId,
      },
    });
    res.status(201).json(funcionario);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const funcionario = await prisma.funcionario.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(funcionario);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, telefone, funcaoPrincipalId } = req.body;

  if (!nome || !telefone || !funcaoPrincipalId) {
    res.status(400).json({
      erro: "Informe nome, telefone, funcaoPrincipalId",
    });
    return;
  }

  try {
    const funcionario = await prisma.funcionario.update({
      where: { id: Number(id) },
      data: {
        nome,
        telefone,
        funcaoPrincipalId,
      },
    });
    res.status(200).json(funcionario);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
