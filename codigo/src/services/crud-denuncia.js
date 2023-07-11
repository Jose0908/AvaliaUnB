import pool from "./initBd.js";

export async function getDenuncias() {
  const [rows] = await pool.query(`
  SELECT D.id, D.motivo, U1.nome AS nome_denunciante, U2.nome AS nome_denunciado, A.avaliacao, D.id_avaliacao
  FROM Denuncias D
  JOIN Usuarios U1 ON D.id_denunciante = U1.id
  JOIN Avaliacoes A ON D.id_avaliacao = A.id
  JOIN Usuarios U2 ON A.fk_id_user = U2.id;  
  `);
  return rows;
}

export async function createDenuncia(denuncia) {
  const [rows] = await pool.query(
    "INSERT INTO Denuncias (motivo, id_denunciante, id_avaliacao) VALUES (?, ?, ?)",
    [denuncia.motivo, denuncia.id_denunciante, denuncia.id_avaliacao]
  );
  return rows;
}

export async function getAvaliacaoFromTurma(id_turma) {
  const [rows] = await pool.query(
    `
    SELECT Avaliacoes.*, Usuarios.nome AS nome_estudante
    FROM Avaliacoes
    JOIN Usuarios ON Avaliacoes.fk_id_user = Usuarios.id
    WHERE fk_id_turma = ?
    `,
    [id_turma]
  );
  return rows.length === 0 ? "Avaliacao não encontrada" : rows;
}

export async function createAvaliacao(avaliacao) {
  const [id_usuario] = await pool.query(
    `
    SELECT id FROM Usuarios WHERE nome = ?`,
    [avaliacao.nome_estudante]
  );
  const [result] = await pool.query(
    `
    INSERT INTO Avaliacoes (fk_id_user, avaliacao, fk_id_turma, nota)
    VALUES (?, ?, ?, ?)
    `,
    [id_usuario[0].id, avaliacao.avaliacao, avaliacao.id_turma, avaliacao.Nota]
  );
  return;
}

export async function deleteDenuncia(id) {
  const [result] = await pool.query("DELETE FROM Denuncias WHERE id = ?", [id]);
  return result.affectedRows === 1
    ? "Denuncia deletada com sucesso"
    : "Denuncia não encontrada";
}

export async function updateAvaliacao(id, avaliacao) {
  const [result] = await pool.query(
    `
    UPDATE Avaliacoes SET avaliacao = ?, nota = ? WHERE id = ?
    `,
    [avaliacao.avaliacao, avaliacao.Nota, id]
  );
  return result.affectedRows === 1
    ? "Avaliacao atualizada com sucesso"
    : "Avaliacao não encontrada";
}

export async function handleDenuncia(id, acao) {
  const [result] = await pool.query(
    `
    call AvaliarDenunciaComentarioOfensivo(?, ?)
    `,
    [id, acao]
  );
}
