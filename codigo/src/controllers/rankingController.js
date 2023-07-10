import express, { Router } from "express";
import { getRanking } from "../services/rankingView.js";

const router = Router();

router.use(express.static("public"));

router.get("/", async (req, res) => {
  const ranking = await getRanking();
  const contexto = {
    ranking: ranking,
    isAdmin: req.session.isAdmin,
    nome: req.session.nome,
  };

  res.render("ranking.ejs", {contexto});
});

export default router