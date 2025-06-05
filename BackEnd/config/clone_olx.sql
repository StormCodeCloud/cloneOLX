-- Criação do schema e seleção do mesmo
CREATE SCHEMA clone_OLX;
USE clone_OLX;

-- Tabelas sem dependências externas
CREATE TABLE localizacao (
  id_localizacao INT AUTO_INCREMENT PRIMARY KEY,
  distrito VARCHAR(45) NOT NULL,
  concelho VARCHAR(45) NOT NULL,
  freguesia VARCHAR(45) NOT NULL
);

CREATE TABLE administrador (
  id_administrador INT AUTO_INCREMENT PRIMARY KEY,
  nome_administrador VARCHAR(45) NOT NULL,
  email_administrador VARCHAR(100) NOT NULL UNIQUE,
  password_administrador CHAR(60) NOT NULL
);

CREATE TABLE categoria (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nome_categoria VARCHAR(45) NOT NULL
);

-- Tabela que depende de localizacao
CREATE TABLE utilizador (
  id_utilizador INT AUTO_INCREMENT PRIMARY KEY,
  nome_utilizador VARCHAR(45) NOT NULL,
  email_utilizador VARCHAR(100) NOT NULL UNIQUE,
  password_utilizador CHAR(60) NOT NULL,
  telefone VARCHAR(20),
  data_registo DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  estado_conta ENUM('ativo', 'suspenso', 'eliminado') DEFAULT 'ativo',
  id_localizacao INT NOT NULL,
  FOREIGN KEY (id_localizacao) REFERENCES localizacao(id_localizacao)
);

-- Tabela que depende de utilizador, categoria e localizacao
CREATE TABLE anuncio (
  id_anuncio INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descricao TEXT NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  data_publicacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  estado ENUM('ativo', 'inativo', 'vendido') DEFAULT 'ativo',
  id_utilizador INT NOT NULL,
  id_categoria INT NOT NULL,
  id_localizacao INT NOT NULL,
  FOREIGN KEY (id_utilizador) REFERENCES utilizador(id_utilizador),
  FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria),
  FOREIGN KEY (id_localizacao) REFERENCES localizacao(id_localizacao)
);

-- Tabela que depende de anuncio
CREATE TABLE imagem (
  id_imagem INT AUTO_INCREMENT PRIMARY KEY,
  caminho_ficheiro VARCHAR(255) NOT NULL,
  id_anuncio INT NOT NULL,
  FOREIGN KEY (id_anuncio) REFERENCES anuncio(id_anuncio)
);

-- Tabela que depende de utilizador e anuncio
CREATE TABLE mensagem (
  id_mensagem INT AUTO_INCREMENT PRIMARY KEY,
  id_remetente INT NOT NULL,
  id_destinatario INT NOT NULL,
  id_anuncio INT NOT NULL,
  conteudo TEXT NOT NULL,
  data_envio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_remetente) REFERENCES utilizador(id_utilizador),
  FOREIGN KEY (id_destinatario) REFERENCES utilizador(id_utilizador),
  FOREIGN KEY (id_anuncio) REFERENCES anuncio(id_anuncio)
);

CREATE TABLE anuncio_favorito (
  id_utilizador INT NOT NULL,
  id_anuncio INT NOT NULL,
  data_adicao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_utilizador, id_anuncio),
  FOREIGN KEY (id_utilizador) REFERENCES utilizador(id_utilizador),
  FOREIGN KEY (id_anuncio) REFERENCES anuncio(id_anuncio)
);

CREATE TABLE historico_visualizacao (
  id_visualizacao INT AUTO_INCREMENT PRIMARY KEY,
  id_utilizador INT NOT NULL,
  id_anuncio INT NOT NULL,
  data_visualizacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_utilizador) REFERENCES utilizador(id_utilizador),
  FOREIGN KEY (id_anuncio) REFERENCES anuncio(id_anuncio)
);

CREATE TABLE pesquisa_guardada (
  id_pesquisa INT AUTO_INCREMENT PRIMARY KEY,
  id_utilizador INT NOT NULL,
  termo_pesquisa VARCHAR(100) NOT NULL,
  filtros JSON, 
  data_pesquisa DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_localizacao INT,
  FOREIGN KEY (id_utilizador) REFERENCES utilizador(id_utilizador),
  FOREIGN KEY (id_localizacao) REFERENCES localizacao(id_localizacao)
);

ALTER TABLE anuncio
DROP FOREIGN KEY anuncio_ibfk_1;

ALTER TABLE anuncio
ADD CONSTRAINT anuncio_ibfk_1
FOREIGN KEY (id_utilizador)
REFERENCES utilizador (id_utilizador)
ON DELETE CASCADE;