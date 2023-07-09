import express, { Router } from "express";
import { getUsers, updateUser, deleteUser }  from "../services/crud-usuario.js";
const router = Router();

router.use(express.static("public"));

router.get("/", async (req, res) => {
  const usuarios = await getUsers()
  const nomeUsuario = req.session.nome;
  const isAdmin = req.session.isAdmin;

    const contexto = {
      nomeUsuario: nomeUsuario,
      isAdmin: isAdmin,
      usuarios: usuarios,
    };
    res.render("admin.ejs", {contexto});
  });

router.post("/editUser/:id", async (req, res) => {
  
  res.send("editUser")
})

router.post("/deleteUser/:id", async (req, res) => {
  const id = req.params.id;
  const userDeleted = await deleteUser(id)
  console.log(userDeleted)
  res.redirect("/admin")
})

export default router;
