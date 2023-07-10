import express, { Router } from "express";
import { createDenuncia } from "../services/crud-denuncia.js";
const router = Router();

router.use(express.static("public"));
  
  router.post("/", async (req, res) => {
    const denuncia = req.body;
    denuncia.id_denunciante = req.session.userId;
    const denunciaCreated = await createDenuncia(denuncia);
    res.redirect("/turmas/")
  })
  
export default router;
