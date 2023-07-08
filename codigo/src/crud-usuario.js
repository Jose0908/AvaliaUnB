import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();


export async function getUsers() {
    const [rows] = await pool.query("SELECT * FROM Usuarios")
    return rows
}

export async function getUserbyMatricula(matricula) {
    const [rows] = await pool.query("SELECT * FROM Usuarios WHERE matricula = ?", [matricula]);
    return rows.length === 0 ? 'Usuarios não encontrado' : rows;
}

export async function getUserbyEmail(email) {
    const [rows] = await pool.query("SELECT * FROM Usuarios WHERE email = ?", [email]);
    return rows.length === 0 ? 'Usuarios não encontrado' : rows;
}

export async function createUser(dados) {
    const matricula = dados.matricula
    const isAdmin = 0
    const nome = dados.nome
    const email = dados.email
    const curso = dados.curso
    const senha = dados.senha

    if (await getUserbyMatricula(matricula) !== 'Usuarios não encontrado') { 
        return 'Matrícula já cadastrada'
    }

    if (await getUserbyEmail(email) !== 'Usuarios não encontrado') { 
        return 'Email já cadastrado' 
    }

    const [rows] = await pool.query("INSERT INTO Usuarios (matricula, isADmin, nome, email, curso, senha) VALUES (?, ?, ?, ?, ?, ?)", [matricula, isAdmin, nome, email, curso, senha]);
    if (rows.affectedRows === 1) {
        return 'Usuário criado com sucesso'
    }
    return 'Erro ao criar usuário'
}

export async function deleteUser(matricula) {
    const [result] = await pool.query("DELETE FROM Usuarios WHERE matricula = ?", [matricula]);
    return result.affectedRows === 1 ? 'Usuário deletado com sucesso' : 'Usuário não encontrado';
  }
  
  export async function updateUser(matricula, isADmin, nome, email, curso, senha) {
    const [result] = await pool.query(
        "UPDATE Usuarios SET nome = ?, email = ?, senha = ?, curso = ? WHERE matricula = ?",
        [nome, email, senha, curso, matricula]
    );
    return result.affectedRows === 1 ? 'Usuário atualizado com sucesso' : 'Usuário não encontrado';
  }


