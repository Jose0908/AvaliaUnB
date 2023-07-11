CREATE VIEW ranking_turmas AS
SELECT 
  ROW_NUMBER() OVER (ORDER BY AVG(A.nota) DESC) AS contador,
  D.nome AS nome_disciplina,
  T.nome_turma,
  AVG(A.nota) AS media_avaliacao,
  COUNT(A.id) AS quantidade_avaliacoes
FROM Turmas T
JOIN Disciplinas D ON T.fk_id_disciplina = D.id
JOIN Avaliacoes A ON T.id = A.fk_id_turma
GROUP BY T.id, D.nome;