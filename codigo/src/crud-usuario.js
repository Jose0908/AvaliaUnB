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

export async function getUser(matricula) {
    const [rows] = await pool.query("SELECT * FROM Usuarios WHERE matricula = ?", [matricula]);
    return rows.length === 0 ? 'Usuarios não encontrado' : rows;
  }

export async function createUser(matricula, isADmin, nome, email, curso, senha) {
    if (await getUser(matricula) !== 'Usuarios não encontrado') {
        return 'Usuarios já cadastrado'
    }
    const [rows] = await pool.query("INSERT INTO Usuarios (matricula, isADmin, nome, email, curso, senha) VALUES (?, ?, ?, ?, ?, ?)", [matricula, isADmin, nome, email, curso, senha]);
    return rows;
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


