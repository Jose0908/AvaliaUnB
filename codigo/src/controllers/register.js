import express, { Router } from "express";
import { createUser } from "../services/crud-usuario.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("register.ejs", { error: "" });
});

router.post("/", async (req, res) => {
  const dados = req.body;
  const create = await createUser(dados);
  if (create === "Usuário criado com sucesso") {
    res.redirect("/");
  } else if (create === "Matrícula já cadastrada") {
    res.render("register.ejs", { error: "Matrícula já cadastrada" });
  } else if (create === "Email já cadastrado") {
    res.render("register.ejs", { error: "E-mail já cadastrado" });
  }
});

export default router

