import pool from './initBd.js';
import Turma from '../models/turmaModel.js';

  export async function getTurmas() {
    const [rows] = await pool.query(`
    SELECT Turmas.*, Disciplinas.nome AS nome_disciplina, Professores.nome AS nome_professor
    FROM Turmas
    JOIN Disciplinas ON Turmas.fk_id_disciplina = Disciplinas.id
    JOIN Professores ON Turmas.fk_id_prof = Professores.id
  `);
    return rows
  }

export async function getTurma(id) {
  const [rows] = await pool.query(`SELECT Turmas.*, Disciplinas.nome AS nome_disciplina, Professores.nome AS nome_professor
    FROM Turmas
    JOIN Disciplinas ON Turmas.fk_id_disciplina = Disciplinas.id
    JOIN Professores ON Turmas.fk_id_prof = Professores.id
    WHERE Turmas.id = ?`, [id]
);
    return rows.length === 0 ? 'Turma não encontrada' : rows;
  }

export async function createTurma(turma, periodo, horario, fk_id_disciplina, fk_id_prof) {
    const [rows] = await pool.query("INSERT INTO Turmas (turma, periodo, horario, fk_id_disciplina, fk_id_prof) VALUES (?, ?, ?, ?, ?)", [turma, periodo, horario, fk_id_disciplina, fk_id_prof]);
    return rows;
}

export async function deleteTurma(id) {
    const [result] = await pool.query("DELETE FROM Turmas WHERE id = ?", [id]);
    return result.affectedRows === 1 ? 'Turma deletada com sucesso' : 'Turma não encontrada';
  }

export async function updateTurma(id, turma, periodo, horario, fk_id_disciplina, fk_id_prof) {
  const [result] = await pool.query(
    "UPDATE Turmas SET turma = ?, periodo = ?, horario = ?,  = = ? = ?, fk_id_disciplina = ?, fk_id_prof = ? WHERE id = ?",
    [turma, periodo, horario, fk_id_disciplina, fk_id_prof, id]
  );
  return result.affectedRows === 1 ? 'Turma atualizada com sucesso' : 'Turma não encontrada';
}


export async function getAvaliacoes() {
  const [rows] = await pool.query(`SELECT * FROM Avaliacoes`);
  return rows
}


