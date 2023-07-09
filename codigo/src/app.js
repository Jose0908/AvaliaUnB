import express from "express";
import sessions from "express-session";
import cookieParser from "cookie-parser";


import login from "./controllers/login.js";
import register from "./controllers/register.js";
import turmaController from "./controllers/turmaController.js";
import adminController from "./controllers/adminController.js";

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

app.use("/login", login);
app.use("/register", register);
app.use("/turmas", turmaController);
app.use("/admin", adminController);


app.get("/", (req, res) => {
  const nomeUsuario = req.session.nome;
  const isAdmin = req.session.isAdmin;
  const contexto = {
    nomeUsuario: nomeUsuario,
    isAdmin: isAdmin,
  };
  res.render("index.ejs", {contexto});
});

app.get("/ranking", (req, res) => {
  res.render("ranking.ejs");
});

app.listen(3000, () => {
  console.log(`Servidor rodando em localhost:3000`);
});
