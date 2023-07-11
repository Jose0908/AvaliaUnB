INSERT INTO Usuarios (matricula, isAdmin, nome, email, curso, senha)
VALUES
  (190130008, 1, 'Jose Roberto Soares', 'jose@gmail.com', 'Engenharia de Computacao', '1234'),
  (170007561, 1, 'Camila Frealdo Fraga', 'camila@gmail.com', 'Ciencia de Computacao', '123'),
  (789, 0, 'Pedro', 'pedro@gmail.com', 'Analise e Desenvolvimento de Sistemas', '123');

INSERT INTO Departamentos (cod_depto, nome)
VALUES
  (1, 'Departamento de Ciencia da Computacao'),
  (2, 'Departamento de Engenharia ELetrica'),
  (3, 'Departamento de Historia');

INSERT INTO Professores (nome, fk_cod_depto)
VALUES
  ('Pedro Garcia', 1),
  ('Fulano da Silva', 2),
  ('Flavio Leonardo Cavalcanti Moura', 3);

INSERT INTO Disciplinas (cod_disciplina, nome, fk_cod_depto)
VALUES
  ('D001', 'Banco de dados', 1),
  ('D002', 'Projeto de Analise de Algoritmos', 2),
  ('D003', 'Historia da arte', 3);

INSERT INTO Turmas (nome_turma, periodo, horario, fk_id_disciplina, fk_id_prof)
VALUES
  ('1', '2023/01', '35M12', 1, 1),
  ('1', '2022/02', '24T45', 2, 3),
  ('3', '2022/01', '35M12', 3, 3);

INSERT INTO Avaliacoes (fk_id_user, avaliacao, fk_id_turma, nota)
VALUES
  (1, 'Achei muito legal! Muito boa essa materia nossa', 1, 5),
  (2, 'Mais ou menos mais pra mais do que pra menos', 2, 4),
  (3, 'Achei essa materia uma ****** odeio todos aaaaaaa', 3, 5);

INSERT INTO Denuncias (motivo, id_denunciante, id_avaliacao)
VALUES
  ('Que comentario otimista!', 3, 1),
  ('Que comentario sem sentido!', 3, 2),
  ('Falou pouco mas falou besteira', 3, 3);