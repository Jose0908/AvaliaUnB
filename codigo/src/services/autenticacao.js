import { getUserbyEmail } from "./crud-usuario.js";
import { createUser } from "./crud-usuario.js";

export async function login(req, res) {
  const email = req.body.email;
  const senha = req.body.senha;

  try {
    const usuario = await getUserbyEmail(email);
    if (usuario === "Usuarios não encontrado") throw new Error("Email incorreto");
    if (usuario?.senha !== senha) throw new Error("Senha incorreta");

    req.session.email = email;
    req.session.isAdmin = usuario.isAdmin;
    req.session.nome = usuario.nome;
    res.redirect("/");
  } catch (error) {
    res.render("login.ejs", { error: "Email ou senha incorretos" });
  }
}

export function logout(req, res) {
  req.session.destroy();
  res.redirect("/");
}

export async function register(req, res) {
  const dados = req.body;
  const create = await createUser(dados);
  if (create === "Usuário criado com sucesso") {
    res.redirect("/");
  } else if (create === "Matrícula já cadastrada") {
    res.render("register.ejs", { error: "Matrícula já cadastrada" });
  } else if (create === "Email já cadastrado") {
    res.render("register.ejs", { error: "E-mail já cadastrado" });
  }
}
