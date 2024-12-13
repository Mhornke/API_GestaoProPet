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

router.get("/:tipoPessoa", async (req, res) => {
  const { tipoPessoa } = req.params;

  if (tipoPessoa == "Interessado") {
    try {
      const endereco = await prisma.endereco.findMany({
        where: { tipoPessoa: tipoPessoa },
      });
      res.status(200).json(endereco);
    } catch (error) {
      res.status(400).json(error);
    }
    return;
  }

  if (tipoPessoa == "Funcionario") {
    try {
      const endereco = await prisma.endereco.findMany({
        where: { tipoPessoa: tipoPessoa },
      });
      res.status(200).json(endereco);
    } catch (error) {
      res.status(400).json(error);
    }
    return;
  }
  if (tipoPessoa == "Interessado") {
    try {
      const endereco = await prisma.endereco.findMany({
        where: { tipoPessoa: tipoPessoa },
      });
      res.status(200).json(endereco);
    } catch (error) {
      res.status(400).json(error);
    }
    return;
  }
});

router.get("/", async (req, res) => {
  try {
    const endereco = await prisma.endereco.findMany();
    res.status(200).json(endereco);
  } catch (error) {
    res.status(400).json(error);
  }
  return;
});

router.get("/:pessoaId", async (req, res) => {
  const { pessoaId } = req.params;
  const { tipoPessoa } = req.query;

  if (tipoPessoa == "Interessado") {
    try {
      const endereco = await prisma.endereco.findMany({
        where: { interessadoId: Number(pessoaId) },
      });
      res.status(200).json(endereco);
    } catch (error) {
      res.status(400).json(error);
    }
    return;
  }

  if (tipoPessoa == "Funcionario") {
    try {
      const endereco = await prisma.endereco.findMany({
        where: { funcionarioId: pessoaId },
      });
      res.status(200).json(endereco);
    } catch (error) {
      res.status(400).json(error);
    }
    return;
  }
});

router.post("/", async (req, res) => {
  const {
    cep,
    cidade,
    bairro,
    estado,
    logradouro,
    numero,
    complemento,
    referencia,
    tipoPessoa,
    interessadoId,
    funcionarioId,
  } = req.body;

  if (!tipoPessoa) {
    if (!cidade || !estado || !logradouro || !numero) {
      res
        .status(400)
        .json({ erro: "Informe cidade, estado, endereco, e numero" });
      return;
    }
    res.status(400).json({ erro: "sdf" });
    return;
  }

  if (tipoPessoa == "Interessado") {
    try {
      const endereco = await prisma.endereco.create({
        data: {
          tipoPessoa,
          cidade,
          estado,
          logradouro,
          numero,
          ...(cep && { cep }),
          ...(logradouro && { logradouro }),
          ...(bairro && { bairro }),
          ...(complemento && { complemento }),
          ...(referencia && { referencia }),
          ...(bairro && { bairro }),
          ...(interessadoId && { interessadoId }),
        },
      });
      res.status(201).json(endereco);
    } catch (error) {
      res.status(400).json(error);
    }
    return;
  }

  if (tipoPessoa == "Funcionario") {
    try {
      const endereco = await prisma.endereco.create({
        data: {
          tipoPessoa,
          cidade,
          estado,
          logradouro,
          numero,
          ...(cep && { cep }),
          ...(logradouro && { logradouro }),
          ...(bairro && { bairro }),
          ...(complemento && { complemento }),
          ...(referencia && { referencia }),
          ...(bairro && { bairro }),
          ...(funcionarioId && { funcionarioId }),
        },
      });
      res.status(201).json(endereco);
    } catch (error) {
      res.status(400).json(error);
    }
    return;
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const endereco = await prisma.endereco.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(endereco);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/", async (req, res) => {
  const {
    cep,
    cidade,
    bairro,
    estado,
    logradouro,
    numero,
    complemento,
    referencia,
    tipoPessoa,
    interessadoId,
    funcionarioId,
  } = req.body;

  if (!tipoPessoa) {
    if (!cidade || !estado || !logradouro || !numero) {
      res
        .status(400)
        .json({ erro: "Informe cidade, estado, endereco, e numero" });
      return;
    }
    res.status(400).json({ erro: "sdf" });
    return;
  }

  if (tipoPessoa == "Interessado") {
    try {
      const endereco = await prisma.endereco.create({
        data: {
          tipoPessoa,
          cidade,
          estado,
          logradouro,
          numero,
          ...(cep && { cep }),
          ...(logradouro && { logradouro }),
          ...(bairro && { bairro }),
          ...(complemento && { complemento }),
          ...(referencia && { referencia }),
          ...(bairro && { bairro }),
          ...(interessadoId && { interessadoId }),
        },
      });
      res.status(201).json(endereco);
    } catch (error) {
      res.status(400).json(error);
    }
    return;
  }

  if (tipoPessoa == "Funcionario") {
    try {
      const endereco = await prisma.endereco.create({
        data: {
          tipoPessoa,
          cidade,
          estado,
          logradouro,
          numero,
          ...(cep && { cep }),
          ...(logradouro && { logradouro }),
          ...(bairro && { bairro }),
          ...(complemento && { complemento }),
          ...(referencia && { referencia }),
          ...(bairro && { bairro }),
          ...(funcionarioId && { funcionarioId }),
        },
      });
      res.status(201).json(endereco);
    } catch (error) {
      res.status(400).json(error);
    }
    return;
  }
});

// router.get("/lista/animais", async (req, res) => {
//   try {
//     const especies = await prisma.especie.findMany({
//       include: {
//         animais: true,
//       },
//     });
//     res.status(200).json(especies);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

export default router;
