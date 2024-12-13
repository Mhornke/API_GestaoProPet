import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const interessados = await prisma.adotante.findMany();
    res.status(200).json(interessados);
  } catch (error) {
    res.status(400).json(error);
  }
});


router.post("/", async (req, res) => {
  const { nome, telefone, jaNosAdotou } = req.body;

  if (!nome || !telefone || !jaNosAdotou) {
    res.status(400).json({
      erro: "Informe nome, telefone, jaNosAdotou",
    });
    return;
  }

  try {
    const interessado = await prisma.adotante.create({
      data: {
        nome,
        telefone,
        jaNosAdotou,
      },
    });
    res.status(201).json(interessado);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const interessado = await prisma.adotante.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(interessado);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, telefone, jaNosAdotou } = req.body;

  if (!nome || !telefone || !jaNosAdotou) {
    res.status(400).json({
      erro: "Informe nome, telefone, jaNosAdotou",
    });
    return;
  }

  try {
    const interessado = await prisma.adotante.update({
      where: { id: Number(id) },
      data: {
        nome,
        telefone,
        jaNosAdotou,
      },
    });
    res.status(200).json(interessado);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
