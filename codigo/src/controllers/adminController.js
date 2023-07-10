import express, { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser, getUserbyId }  from "../services/crud-usuario.js";
import { getDenuncias, deleteDenuncia } from "../services/crud-denuncia.js";
import { deleteAvaliacao, getAvaliacoes } from "../services/crud-avaliacao.js";
const router = Router();

router.use(express.static("public"));

router.get("/", async (req, res) => {
  const usuarios = await getUsers()
  const nomeUsuario = req.session.nome;
  const isAdmin = req.session.isAdmin;
  const reports = await getDenuncias()
  const avaliacoes = await getAvaliacoes()
    const contexto = {
      nomeUsuario: nomeUsuario,
      isAdmin: isAdmin,
      usuarios: usuarios,
      denuncias: reports,
      avaliacoes: avaliacoes
    };
    res.render("admin.ejs", {contexto});
  });
  
  router.post("/deleteUser/:id", async (req, res) => {
    const id = req.params.id;
    const userDeleted = await deleteUser(id)
    console.log(userDeleted)
    res.redirect("/admin")
  })
  
  router.get("/editUser/:id", async (req, res) => {
    const id = req.params.id;
    const [user] = await getUserbyId(id)
    res.render("editUsuario.ejs", {user})
  })
  
  router.post("/editUser/:id", async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    console.log(user)
    const userUpdated = await updateUser(id, user)
    console.log(userUpdated)
    res.redirect("/admin")
  })

  router.post("/createUser", async (req, res) => {
    const user = req.body;
    console.log(user)
    const userCreated = await createUser(user)
    console.log(userCreated)
    res.redirect("/admin")
  })

  router.post ("/ignoreDenuncia/:id", async (req, res) => {
    const id = req.params.id;
    const denunciaIgnorada = await deleteDenuncia(id)
    console.log(denunciaIgnorada)
    res.redirect("/admin")
  })

  router.post("/acceptDenuncia/:id", async (req, res) => {
    const idDenuncia = req.params.id;
    const idAvaliacao = req.body.id_avaliacao;
    const avaliacaoDeletada = await deleteAvaliacao(idAvaliacao)
    const denunciaDeletada= await deleteDenuncia(idDenuncia)
    res.redirect("/admin")
  })
export default router;
