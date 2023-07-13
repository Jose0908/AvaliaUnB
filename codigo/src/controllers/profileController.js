import express, { Router } from "express";
import { getUserbyId, updateProfilePhoto, updateUser } from "../services/crud-usuario.js";
import { getAvaliacaoFromUser } from "../services/crud-avaliacao.js";
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
  const avaliacaoDoUsuario = await getAvaliacaoFromUser(req.session.userId);

  let blobUrl = "";

  const contexto = {
    isAdmin: req.session.isAdmin,
    nome: req.session.nome,
    avaliacaoDoUsuario,
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

router.get("/editarPerfil", async (req, res) => {
  const id = req.session.userId;
  const [user] = await getUserbyId(id);
  const contexto = {
    user: user,
    isAdmin: req.session.isAdmin,
    nome: req.session.nome,
  };
  res.render("editarPerfil.ejs", { contexto });
});

router.post("/editarPerfil", async (req, res) => {
  const id = req.session.userId;
  const user = req.body;
  const userUpdated = await updateUser(id, user);
  res.redirect("/perfil");
});

export default router;
