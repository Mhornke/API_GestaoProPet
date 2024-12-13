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
  const {
    nome,
    codigo,
    estoque,
    marca,
    estq_min,
    descricao,
    unidade,
    categoriaId,
  } = req.body;
console.log(req.body);

  // Verifica campos obrigatórios
  if (!nome || !codigo || !categoriaId || !estoque || !unidade || !estq_min) {
    return res.status(400).json({
      erro: "Informe nome, codigo, categoriaId, estoque, unidade e quantidade minima",
    });
  }

  try {
    const suprimento = await prisma.suprimento.create({
      data: {
        nome,
        codigo,
        estoque,
        marca: marca || null, // Define como null se não for fornecido
        estq_min,
        descricao: descricao || null, // Define como null se não for fornecido
        categoriaId,
        unidade,
      },
    });

    return res.status(201).json(suprimento);
  } catch (error) {
    console.error("Erro ao criar suprimento:", error);
    res.status(400).json(error);
    }
  
});

router.post('/categoria', async (req, res) => {
const {nome, descricao} = req.body

if (!nome || !descricao) {
  return res.status(404).json({
    error:"informe o nome e descrição da categoria"
  })
}

try{
  const categoria = await prisma.categoria.create({
    data: {nome, descricao}
  })
return res.status(201).json(categoria)
}catch(error){
  console.error("Erro ao criar a categoria", error)
  res.status(400).json(error);
  }


})

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
  const {
    nome,
    codigo,
    estoque,
    marca,
    estq_min,
    descricao,
    unidade,
    categoriaId,
  } = req.body;

  if (!nome || !codigo || !categoriaId || !estoque || !unidade || !estq_min) {
    return res.status(400).json({
      erro: "Informe nome, codigo, categoriaId, estoque, unidade e quantidade minima",
    });
  }

  try {
    
      const suprimento = await prisma.suprimento.update({
        where: { id: Number(id) },
        data: {
          nome,
          codigo,
          estoque,
          marca: marca || null, // Define como null se não for fornecido
          estq_min,
          descricao: descricao || null, // Define como null se não for fornecido
          categoriaId,
          unidade,
        },
    });
    res.status(200).json(suprimento);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
