import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const suprimentos = await prisma.suprimento.findMany({
      include: {
        categoria: true,
      },
    });
    res.status(200).json(suprimentos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const { item, categoriaId, estoque, unidade } = req.body;

  if (!item || !categoriaId || !estoque || !unidade) {
    res.status(400).json({
      erro: "Informe item, categoriaId, estoque, e unidade",
    });
    return;
  }

  try {
    const suprimento = await prisma.suprimento.create({
      data: {
        item,
        categoriaId,
        estoque,
        unidade,
      },
    });
    res.status(201).json(suprimento);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const suprimento = await prisma.suprimento.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(suprimento);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { item, categoriaId, estoque, unidade } = req.body;

  if (!item || !categoriaId || !estoque || !unidade) {
    res.status(400).json({
      erro: "Informe item, categoriaId, estoque, e unidade",
    });
    return;
  }

  try {
    const suprimento = await prisma.suprimento.update({
      where: { id: Number(id) },
      data: {
        item,
        categoriaId,
        estoque,
        unidade,
      },
    });
    res.status(200).json(suprimento);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
