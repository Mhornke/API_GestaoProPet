import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { verificaToken } from "../middewares/verificaToken";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const interessados = await prisma.interessado.findMany();
    res.status(200).json(interessados);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const {
    nome,
    cpf,
    telefone,
    isAtivo,
    estadoCivil,
    dataNascimento,
    jaAdotouConosco,
    observacoes,
  } = req.body;

  if (!nome) {
    res.status(400).json({
      erro: "Informe nome",
    });
    return;
  }

  try {
    const interessado = await prisma.interessado.create({
      data: {
        nome,
        ...(cpf && { cpf }),
        ...(telefone && { telefone }),
        ...(isAtivo && { isAtivo }),
        ...(estadoCivil && { estadoCivil }),
        ...(dataNascimento && { dataNascimento }),
        ...(jaAdotouConosco && { jaAdotouConosco }),
        ...(observacoes && { observacoes }),
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
    isAtivo,
    peso,
    porte,
    nascimentoApx,
    castracao,
    castracaoApx,
    status,
    especieId,
    sexo,
    observacoes,
    foto,
  } = req.body;

  if (
    !nome ||
    !isAtivo ||
    !peso ||
    !porte ||
    !nascimentoApx ||
    !castracao ||
    !status ||
    !especieId ||
    !sexo
  ) {
    res.status(400).json({
      erro: "Informe nome, isAtivo, peso, porte, nascimentoApx, castracao, status, especieId, sexo",
    });
    return;
  }

  try {
    const animal = await prisma.animal.update({
      where: { id: Number(id) },
      data: {
        nome,
        isAtivo,
        peso,
        porte,
        nascimentoApx,
        ...(castracaoApx && { castracaoApx }),
        castracao,
        status,
        especieId,
        sexo,
        castracaoApx,
        ...(observacoes && { observacoes }),
        ...(foto && { foto }),
      },
    });
    res.status(200).json(animal);
  } catch (error) {
    res.status(400).json(error);
  }
});

// router.get("/pesquisa/:termo", async (req, res) => {
//   const { termo } = req.params;

//   // Tenta converter o termo em número
//   const termoNumero = Number(termo);

//   // Se a conversao gerou um NaN (Nota a Number)
//   if (isNaN(termoNumero)) {
//     try {
//       let termoCorrigido: string | undefined;

//       // Verifica se o termo é "macho" ou "fêmea" (em qualquer formato)
//       if (termo.toLowerCase() === "macho") {
//         termoCorrigido = "Macho";
//       } else if (
//         termo.toLowerCase() === "femea" ||
//         termo.toLowerCase() === "fêmea"
//       ) {
//         termoCorrigido = "Femea";
//       } else {
//         termoCorrigido = undefined;
//       }

//       const animais = await prisma.animal.findMany({
//         include: {
//           especie: true,
//         },
//         where: {
//           OR: [
//             { nome: { contains: termo } },
//             { especie: { nome: { contains: termo } } },
//             // Se o termo for "Macho" ou "Femea", faz a busca por sexo
//             ...(termoCorrigido
//               ? [{ sexo: termoCorrigido as "Macho" | "Femea" }]
//               : []),
//           ],
//         },
//       });

//       res.status(200).json(animais);
//     } catch (error) {
//       res.status(400).json(error);
//     }
//   } else {
//     try {
//       const animais = await prisma.animal.findMany({
//         include: {
//           especie: true,
//         },
//         where: {
//           OR: [{ idade: termoNumero }],
//         },
//       });
//       res.status(200).json(animais);
//     } catch (error) {
//       res.status(400).json(error);
//     }
//   }
// });

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const animal = await prisma.animal.findUnique({
      where: { id: Number(id) },
      include: {
        especie: true,
      },
    });
    res.status(200).json(animal);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
