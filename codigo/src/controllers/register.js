import express, { Router } from "express";
import { register } from "../services/autenticacao.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("register.ejs", { error: "" });
});

router.post("/", register);

export default router