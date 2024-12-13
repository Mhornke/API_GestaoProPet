import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const animais = await prisma.animal.findMany({
      include: {
        fotos: { take: 1 },
      },
    });
    res.status(200).json(animais);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const {
    nome,
    nascimento_aproximado,
    genero,
    especie,
    peso,
    porte,
    castrado,
    foto,
  } = req.body;

  if (
    !nome ||
    !nascimento_aproximado ||
    !genero ||
    !especie ||
    !peso ||
    !porte ||
    !castrado ||
    !foto
  ) {
    res.status(400).json({
      erro: "Informe nome, nascimento_aproximado, genero, especie, peso, porte, castrado, foto",
    });
    return;
  }

  try {
    const nascimento = new Date(nascimento_aproximado);
    const animal = await prisma.animal.create({
      data: {
        nome,
        nascimento_aproximado: nascimento,
        genero,
        especie,
        peso,
        porte,
        castrado,
        foto,
      },
    });
    console.log(animal);
    res.status(201).json(animal);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const animal = await prisma.animal.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(animal);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    nascimento_aproximado,
    genero,
    especie,
    peso,
    porte,
    castrado,
    foto,
  } = req.body;

  if (
    !nome ||
    !nascimento_aproximado ||
    !genero ||
    !especie ||
    !peso ||
    !porte ||
    !castrado ||
    !foto
  ) {
    res.status(400).json({
      erro: "Informe nome, nascimento_aproximado, genero, especie, peso, porte, castrado, foto",
    });
    return;
  }

  try {
    const animal = await prisma.animal.update({
      where: { id: Number(id) },
      data: {
        nome,
        nascimento_aproximado,
        genero,
        especie,
        peso,
        porte,
        castrado,
        foto,
      },
    });
    res.status(200).json(animal);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
