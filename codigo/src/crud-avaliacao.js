import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

// Avaliacao tem campos id, avaliacao, fk_id_turma, fk_id_user

export async function getAvaliacoes() {
    const [rows] = await pool.query(`SELECT * FROM Avaliacoes`);
    return rows
}

export async function getAvaliacao(id) {
    const [rows] = await pool.query(`
    SELECT Avaliacoes.*, Usuarios.nome AS nome_estudante
    FROM Avaliacoes
    JOIN Usuarios ON Avaliacoes.fk_id_user = Usuarios.id
    WHERE Avaliacoes.id = ?
    `, [id]);
    return rows.length === 0 ? 'Avaliacao não encontrada' : rows;
}

export async function getAvaliacaoFromTurma(id_turma) {
    const [rows] = await pool.query(`
    SELECT Avaliacoes.*, Usuarios.nome AS nome_estudante
    FROM Avaliacoes
    JOIN Usuarios ON Avaliacoes.fk_id_user = Usuarios.id
    WHERE fk_id_turma = ?
    `,[id_turma]);
    return rows.length === 0 ? 'Avaliacao não encontrada' : rows;
}

export async function createAvaliacao(avaliacao) {

    // Recuperar id do usuario a partir do seu nome:
    const [id_usuario] = await pool.query(`
    SELECT id FROM Usuarios WHERE nome = ?`, [avaliacao.nome_estudante]);
    console.log(id_usuario[0].id)
    const [result] = await pool.query(`
    INSERT INTO Avaliacoes (fk_id_user, avaliacao, fk_id_turma, nota)
    VALUES (?, ?, ?, ?)
    `, [id_usuario[0].id, avaliacao.avaliacao, avaliacao.id_turma, avaliacao.Nota]);
    return ;
}

export async function deleteAvaliacao(id) {
    const [result] = await pool.query("DELETE FROM Avaliacoes WHERE id = ?", [id]);
    return result.affectedRows === 1 ? 'Turma deletada com sucesso' : 'Turma não encontrada';
}



