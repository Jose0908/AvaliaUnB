import express from "express";
import sessions from "express-session";
import cookieParser from "cookie-parser";

import landingPage from "./controllers/landingPage.js";
import login from "./controllers/login.js";
import register from "./controllers/register.js";
import turmaController from "./controllers/turmaController.js";
import adminController from "./controllers/adminController.js";
import denunciaController from "./controllers/denunciaController.js";
import rankingController from "./controllers/rankingController.js";
import profileController from "./controllers/profileController.js";

import fs from "fs";

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
  })
);

app.use("/", landingPage);
app.use("/login", login);
app.use("/register", register);
app.use("/turmas", turmaController);
app.use("/admin", adminController);
app.use("/denuncia", denunciaController);
app.use("/ranking", rankingController);
app.use("/perfil", profileController);


app.listen(3000, () => {
  console.log(`Servidor rodando em localhost:3000`);
});
