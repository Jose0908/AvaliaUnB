CREATE TABLE `Usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `matricula` int NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `curso` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `foto_de_perfil` blob,
  PRIMARY KEY (`id`),
  UNIQUE KEY `matricula_UNIQUE` (`matricula`),
  UNIQUE KEY `nome_UNIQUE` (`nome`)
);

CREATE TABLE `Departamentos` (
  `cod_depto` int DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Professores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `fk_cod_depto` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `prof_depto_idx` (`fk_cod_depto`),
  CONSTRAINT `prof_depto` FOREIGN KEY (`fk_cod_depto`) REFERENCES `Departamentos` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE `Disciplinas` (
  `cod_disciplina` varchar(45) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `fk_cod_depto` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cod_disciplina_UNIQUE` (`cod_disciplina`),
  KEY `fk_cod_depto_idx` (`fk_cod_depto`),
  CONSTRAINT `fk_cod_depto` FOREIGN KEY (`fk_cod_depto`) REFERENCES `Departamentos` (`id`)
);

CREATE TABLE `Turmas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_turma` varchar(255) DEFAULT NULL,
  `periodo` varchar(255) DEFAULT NULL,
  `horario` varchar(255) DEFAULT NULL,
  `fk_id_disciplina` int DEFAULT NULL,
  `fk_id_prof` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cod_disciplina_idx` (`fk_id_disciplina`),
  KEY `fk_id_prof_idx` (`fk_id_prof`),
  CONSTRAINT `fk_cod_disc` FOREIGN KEY (`fk_id_disciplina`) REFERENCES `Disciplinas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_id_prof` FOREIGN KEY (`fk_id_prof`) REFERENCES `Professores` (`id`)
);

CREATE TABLE `Avaliacoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fk_id_user` int DEFAULT NULL,
  `avaliacao` longtext,
  `fk_id_turma` int DEFAULT NULL,
  `nota` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_usuario_idx` (`fk_id_user`),
  KEY `fk_id_turma_idx` (`fk_id_turma`),
  CONSTRAINT `fk_id_turma` FOREIGN KEY (`fk_id_turma`) REFERENCES `Turmas` (`id`),
  CONSTRAINT `fk_id_usuario` FOREIGN KEY (`fk_id_user`) REFERENCES `Usuarios` (`id`)
);

CREATE TABLE `Denuncias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `motivo` longtext NOT NULL,
  `id_denunciante` int NOT NULL,
  `id_avaliacao` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nome_denunciante_idx` (`id_denunciante`),
  KEY `fk_avaliacao_id_idx` (`id_avaliacao`),
  CONSTRAINT `fk_avaliacao_id` FOREIGN KEY (`id_avaliacao`) REFERENCES `Avaliacoes` (`id`),
  CONSTRAINT `fk_usuario_id` FOREIGN KEY (`id_denunciante`) REFERENCES `Usuarios` (`id`)
);

