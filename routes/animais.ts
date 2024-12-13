import { Generos, Especies, Portes , PrismaClient } from "@prisma/client";
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
  const { nome, genero, especie, peso, porte, castrado, foto } = req.body;

  if (!nome || !genero || !especie || !peso || !porte || !castrado || !foto) {
    res.status(400).json({
      erro: "Informe nome, nascimento_aproximado, genero, especie, peso, porte, castrado, foto",
    });
    return;
  }

  try {
    const animal = await prisma.animal.create({
      data: {
        nome,
        genero,
        especie,
        peso,
        porte,
        castrado,
        foto,
      },
    });
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
  const { nome, genero, especie, peso, porte, castrado, foto } = req.body;

  if (!nome || !genero || !especie || !peso || !porte || !castrado || !foto) {
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


router.get("/pesquisa", async (req, res) => {
  const { genero, especie, porte } = req.query;

  try {
    const filters: {
      genero?: Generos;
      especie?: Especies;
      porte?: Portes;
    } = {};

    if (genero && Object.values(Generos).includes(genero as Generos)) {
      filters.genero = genero as Generos;
    }
    if (especie && Object.values(Especies).includes(especie as Especies)) {
      filters.especie = especie as Especies;
    }
    if (porte && Object.values(Portes).includes(porte as Portes)) {
      filters.porte = porte as Portes;
    }

    const animals = await prisma.animal.findMany({
      where: filters,
    });

    if (animals.length === 0) {
      return res.status(404).json({ message: "Nenhum animal encontrado com esses filtros" });
    }

    res.status(200).json(animals);
  } catch (error: any) {
    res.status(500).json({ error: "Erro no servidor", details: error.message });
  }
});





export default router;
