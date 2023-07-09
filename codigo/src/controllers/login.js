import express, { Router } from "express";
import { login, logout } from "../services/autenticacao.js";

const router = Router();

router.use(express.static("public"));

router.get("/", (req, res) => {
  res.render("login.ejs", { error: "" });
});

router.post("/", login);

router.get("/logout", logout);

export default router;
