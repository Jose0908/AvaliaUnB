import express, { Router } from "express";
import { getUserbyEmail } from "../services/crud-usuario.js";

const router = Router();

router.use(express.static("public"));

router.get("/", (req, res) => {
  res.render("login.ejs", { error: "" });
});

router.post("/", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  try {
    const usuario = await getUserbyEmail(email);
    if (usuario === "Usuarios não encontrado") throw new Error("Email incorreto");
    if (usuario?.senha !== senha) throw new Error("Senha incorreta");

    req.session.nome = usuario.nome;
    req.session.email = email;
    req.session.isAdmin = usuario.isAdmin;
    req.session.userId = usuario.id;
    res.redirect("/");
  } catch (error) {
    res.render("login.ejs", { error: "Email ou senha incorretos" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

export default router;
