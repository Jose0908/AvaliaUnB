import express, { Router } from "express";
import { getUserbyId, updateProfilePhoto } from "../services/crud-usuario.js";
import fileUpload from "express-fileupload";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

router.use(fileUpload());
router.use(express.static("public"));

router.get("/", async (req, res) => {
  const [user] = await getUserbyId(req.session.userId);
  let blobUrl = "";

  // Ler o arquivo e obter o conteúdo como um Buffer
  //const fileContent = readFileSync(user.foto_de_perfil);

  // Converter o conteúdo em uma string base64
  //const base64Image = fileContent.toString('base64');

  // Criar a URL de dados
  // blobUrl = `data:${user.foto_de_perfil.mimetype};base64,${base64Image}`;

  const contexto = {
    isAdmin: req.session.isAdmin,
    nome: req.session.nome,
    user,
    blobUrl, // Passar o URL de dados para o contexto
  };

  res.render("perfil.ejs", { contexto });
});

router.post("/", async (req, res) => {
  if (!req.files || !req.files.imagem) {
    return res.status(400).send("Nenhum arquivo foi enviado.");
  }

  const file = req.files.imagem;
  const blob = new Blob([file.data], { type: file.mimetype });
  // Salvar o objeto blob no banco de dados aqui
  updateProfilePhoto(req.session.userId, file.data);

  console.log("Arquivo salvo com sucesso!");
  req.session.fileName = file.name; // Armazenar o nome do arquivo na sessão

  res.redirect("/perfil");
});

export default router;
