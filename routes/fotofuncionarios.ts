import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

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
    const fotos = await prisma.fotoFuncionario.findMany();
    res.status(200).json(fotos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:funcionarioId", async (req, res) => {
  const { funcionarioId } = req.params;
  try {
    const fotos = await prisma.fotoFuncionario.findMany({
      where: { funcionarioId: funcionarioId },
    });
    res.status(200).json(fotos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", upload.single("codigoFoto"), async (req, res) => {
  const { descricao, funcionarioId } = req.body;
  const codigo = req.file?.buffer.toString("base64");

  if (!descricao || !funcionarioId || !codigo) {
    res.status(400).json({ erro: "Informe descricao, animalId e codigoFoto!" });
    return;
  }

  try {
    const fotos = await prisma.fotoFuncionario.create({
      data: {
        descricao,
        funcionarioId: funcionarioId,
        codigoFoto: codigo as string,
      },
    });
    res.status(201).json(fotos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const fotos = await prisma.fotoFuncionario.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(fotos);
  } catch (error) {
    res.status(400).json(error);
  }
});

// router.put("/:id", async (req, res) => {
//   const { id } = req.params
//   const { nome } = req.body

//   if (!nome ) {
//     res.status(400).json({ "erro": "Informe a espécie!" })
//     return
//   }

//   try {
//     const fotos = await prisma.foto.update({
//       where: { id: Number(id) },
//       data: { nome }
//     })
//     res.status(200).json(fotos)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// router.get("/lista/animais", async (req, res) => {
//   try {
//     const fotos = await prisma.foto.findMany({
//       include: {
//         animais: true
//       }
//     })
//     res.status(200).json(fotos)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

export default router;
