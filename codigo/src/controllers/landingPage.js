import express, { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    const nomeUsuario = req.session.nome;
    const isAdmin = req.session.isAdmin;
    const contexto = {
      nomeUsuario: nomeUsuario,
      isAdmin: isAdmin,
    };
    res.render("index.ejs", {contexto});
  });

  export default router;