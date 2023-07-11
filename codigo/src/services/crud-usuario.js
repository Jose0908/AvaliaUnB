import pool from './initBd.js';

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

  return user[0]
}

export async function getUserbyId(id) {
  const [rows] = await pool.query("SELECT * FROM Usuarios WHERE id = ?", [id]);
  return rows.length === 0 ? "Usuario não encontrado" : rows;
}

export async function createUser(dados) {
  const matricula = dados.matricula;
  let isAdmin = dados.admin;
  if (typeof isAdmin == 'undefined' || isAdmin === 'Não') {
    isAdmin = 0;
  }
  if (isAdmin === 'Sim') {
    isAdmin = 1;
  }
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

export async function updateProfilePhoto(userId, photoBlob) {
  const query = "UPDATE Usuarios SET foto_de_perfil = ? WHERE id = ?";
  const params = [photoBlob, userId];
  
  try {
    const [result] = await pool.query(query, params);
    return result.affectedRows === 1
      ? "Foto de perfil atualizada com sucesso"
      : "Usuário não encontrado";
  } catch (error) {
    console.error("Erro ao atualizar a foto de perfil:", error);
    return "Erro ao atualizar a foto de perfil";
  }
}