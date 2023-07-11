import express, { Router } from "express";
import { getUserbyId} from "../services/crud-usuario.js";
import fs from "fs";
import { get } from "http";

const file = fs.readFileSync("/home/jose/killua.jpg");
const blob = Buffer.from(file);

const router = Router();

router.use(express.static("public"));

router.get("/", (req, res) => {
  //usuario = getUserbyId(req.session.id);
  // const blob = Buffer.from(usuario.foto);
  //fs.writeFileSync('/caminho/do/arquivo/nova_imagem.jpg', blob);
  const base64Image = blob.toString("base64");
  const contexto = {
    isAdmin: req.session.isAdmin,
    nome: req.session.nome,
    blob: base64Image
  };

  res.render("perfil.ejs", { contexto });
});

router.post("/", async (req, res) => {});

export default router;
