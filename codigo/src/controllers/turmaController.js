import express, { Router } from "express";
import {
  getTurma,
  getTurmas,
  createTurma,
  deleteTurma,
  updateTurma,
} from "../services/crud-turmas.js";
import {
    getAvaliacao,
    updateAvaliacao,
    getAvaliacaoFromTurma,
    getAvaliacoes,
    createAvaliacao,
    deleteAvaliacao,
  } from "../services/crud-avaliacao.js";

const router = Router();

router.use(express.static("public"));

router.get("/", async (req, res) => {
  const turmas = await getTurmas();
  res.render("turmas.ejs", { turmas });
});

router.get("/:id", async (req, res) => {
  const [turma] = await getTurma(req.params.id);
  const avaliacoes = await getAvaliacaoFromTurma(req.params.id);
  const contexto = {
    turma: turma,
    avaliacoes: avaliacoes,
    isAdmin: req.session.isAdmin,
    email: req.session.email,
    nome: req.session.nome,
  };
  res.render("turma.ejs", { contexto });
});

router.post("/create", async (req, res) => {
  const avaliacao = req.body;
  avaliacao.nome_estudante = req.session.nome;
  const result = await createAvaliacao(avaliacao);
  res.redirect("/turmas/" + avaliacao.id_turma);
});

router.post("/:idTurma/delete/:idAvaliacao", async (req, res) => {
  const idTurma = req.params.idTurma;
  const idAvaliacao = req.params.idAvaliacao;
  const result = await deleteAvaliacao(idAvaliacao);
  res.redirect("/turmas/" + idTurma);
});

router.post("/:idTurma/edit/:idAvaliacao", async (req, res) => {
  const idTurma = req.params.idTurma;
  const idAvaliacao = req.params.idAvaliacao;
  res.redirect("/turmas/" + idTurma + "/edit/" + idAvaliacao);
});

router.get("/:idTurma/edit/:idAvaliacao", async (req, res) => {
  const idAvaliacao = req.params.idAvaliacao;
  const [avaliacao] = await getAvaliacao(idAvaliacao);
  res.render("editAvaliacao.ejs", { avaliacao });
});

router.post("/edit/:idAvaliacao", async (req, res) => {
  const idAvaliacao = req.params.idAvaliacao;
  const avaliacao = req.body;
  const result = await updateAvaliacao(idAvaliacao, avaliacao);
  res.redirect("/turmas/" + avaliacao.id_turma);
});

export default router;
