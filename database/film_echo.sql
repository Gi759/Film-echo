DROP DATABASE IF EXISTS `film_echo`;

CREATE DATABASE IF NOT EXISTS `film_echo` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `film_echo`;

-- --------------------------------------------------------

-- Estrutura para tabela `tb_avaliacoes`

CREATE TABLE `tb_avaliacoes` (
  `id_avaliacao` INT(10) NOT NULL AUTO_INCREMENT,
  `poster_filme` VARCHAR(255) NOT NULL,
  `nome_filme` VARCHAR(100) NOT NULL,
  `avaliacao_texto` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `avaliacao_estrelas` DECIMAL(2,1) DEFAULT 0 CHECK (`avaliacao_estrelas` BETWEEN 0 AND 5),
  PRIMARY KEY (`id_avaliacao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
