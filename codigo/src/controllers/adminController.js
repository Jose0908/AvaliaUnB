import express, { Router } from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserbyId,
} from "../services/crud-usuario.js";
import {
  getDenuncias,
  deleteDenuncia,
  handleDenuncia,
} from "../services/crud-denuncia.js";
import { deleteAvaliacao, getAvaliacoes } from "../services/crud-avaliacao.js";
const router = Router();

router.use(express.static("public"));

router.get("/", async (req, res) => {
  const usuarios = await getUsers();
  const nomeUsuario = req.session.nome;
  const isAdmin = req.session.isAdmin;
  const reports = await getDenuncias();
  const avaliacoes = await getAvaliacoes();
  const contexto = {
    nome: nomeUsuario,
    isAdmin: isAdmin,
    usuarios: usuarios,
    denuncias: reports,
    avaliacoes: avaliacoes,
  };
  res.render("admin.ejs", { contexto });
});

router.post("/deleteUser/:id", async (req, res) => {
  const id = req.params.id;
  const userDeleted = await deleteUser(id);
  res.redirect("/admin");
});

router.get("/editUser/:id", async (req, res) => {
  const id = req.params.id;
  const [user] = await getUserbyId(id);
  const contexto = {
    user: user,
    isAdmin: req.session.isAdmin,
    nome: req.session.nome,
  };

  res.render("editUsuario.ejs", { contexto });
});

router.post("/editUser/:id", async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  const userUpdated = await updateUser(id, user);
  res.redirect("/admin");
});

router.post("/createUser", async (req, res) => {
  const user = req.body;
  const userCreated = await createUser(user);
  res.redirect("/admin");
});

router.post("/handleDenuncia/:id", async (req, res) => {
  const acao = req.body.acao;
  const id = req.params.id;
  const denunciaHandled = await handleDenuncia(id, acao);
  res.redirect("/admin");
});

export default router;
