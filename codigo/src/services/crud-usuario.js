import pool from './initBd.js';
import Usuario from '../models/usuario.js';

export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM Usuarios");
  return rows;
}

export async function getUserbyMatricula(matricula) {
  const [rows] = await pool.query(
    "SELECT * FROM Usuarios WHERE matricula = ?",
    [matricula]
  );
  return rows.length === 0 ? "Usuarios não encontrado" : rows;
}

export async function getUserbyEmail(email) {
  const [user] = await pool.query("SELECT * FROM Usuarios WHERE email = ?", [
    email,
  ]);

  if (user.length === 0) {
    return ("Usuarios não encontrado")
  }

  return new Usuario(
    user[0].id,
    user[0].matricula,
    user[0].isAdmin,
    user[0].nome,
    user[0].email,
    user[0].curso,
    user[0].senha
  );
}

export async function getUserbyId(id) {
  const [rows] = await pool.query("SELECT * FROM Usuarios WHERE id = ?", [id]);
  return rows.length === 0 ? "Usuario não encontrado" : rows;
}

export async function createUser(dados) {
  const matricula = dados.matricula;
  const isAdmin = 0;
  const nome = dados.nome;
  const email = dados.email;
  const curso = dados.curso;
  const senha = dados.senha;

  if ((await getUserbyMatricula(matricula)) !== "Usuarios não encontrado") {
    return "Matrícula já cadastrada";
  }

  if ((await getUserbyEmail(email)) !== "Usuarios não encontrado") {
    return "Email já cadastrado";
  }

  const [rows] = await pool.query(
    "INSERT INTO Usuarios (matricula, isADmin, nome, email, curso, senha) VALUES (?, ?, ?, ?, ?, ?)",
    [matricula, isAdmin, nome, email, curso, senha]
  );
  if (rows.affectedRows === 1) {
    return "Usuário criado com sucesso";
  }
  return "Erro ao criar usuário";
}

export async function deleteUser(id) {
  const [result] = await pool.query(
    "DELETE FROM Usuarios WHERE id = ?",
    [id]
  );
  return result.affectedRows === 1
    ? "Usuário deletado com sucesso"
    : "Usuário não encontrado";
}

export async function updateUser(
  id, user
) {
  const [result] = await pool.query(
    "UPDATE Usuarios SET nome = ?, email = ?, senha = ?, curso = ?, matricula = ?, isAdmin = ? WHERE id = ?",
    [user.nome, user.email, user.senha, user.curso, user.matricula, user.isAdmin, id]
  );
  return result.affectedRows === 1
    ? "Usuário atualizado com sucesso"
    : "Usuário não encontrado";
}
