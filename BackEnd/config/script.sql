create schema cloneOLX;
use cloneolx;

create table utilizador (
  id_utilizador int auto_increment primary key,
  nome_utilizador varchar(45) not null,
  email_utilizador varchar(100) not null unique,
  password_utilizador varchar(255) not null,
  telefone varchar(20),
  data_registo datetime not null default current_timestamp,
  estado_conta enum('ativo', 'suspenso') default 'ativo'
);

create table administrador (
  id_administrador int auto_increment primary key,
  nome_administrador varchar(45) not null,
  email_administrador varchar(100) not null unique,
  password_administrador varchar(255) not null
);

create table categoria (
  id_categoria int auto_increment primary key,
  nome_categoria varchar(45) not null
);

create table localizacao (
  id_localizacao int auto_increment primary key,
  distrito varchar(45) not null,
  concelho varchar(45) not null
);

create table anuncio (
  id_anuncio int auto_increment primary key,
  titulo varchar(100) not null,
  descricao text not null,
  preco decimal(10,2) not null,
  data_publicacao datetime not null default current_timestamp,
  estado enum('ativo', 'inativo', 'vendido') default 'ativo',
  id_utilizador int not null,
  id_categoria int not null,
  id_localizacao int not null,
  foreign key (id_utilizador) references utilizador(id_utilizador),
  foreign key (id_categoria) references categoria(id_categoria),
  foreign key (id_localizacao) references localizacao(id_localizacao)
);
create table imagem (
  id_imagem int auto_increment primary key,
  caminho_ficheiro varchar(255) not null,
  id_anuncio int not null,
  foreign key (id_anuncio) references anuncio(id_anuncio)
);

create table mensagem (
  id_mensagem int auto_increment primary key,
  id_remetente int not null,
  id_destinatario int not null,
  id_anuncio int not null,
  conteudo text not null,
  data_envio datetime not null default current_timestamp,
  foreign key (id_remetente) references utilizador(id_utilizador),
  foreign key (id_destinatario) references utilizador(id_utilizador),
  foreign key (id_anuncio) references anuncio(id_anuncio)
);

create table anuncio_favorito (
  id_utilizador int not null,
  id_anuncio int not null,
  data_adicao datetime not null default current_timestamp,
  primary key (id_utilizador, id_anuncio),
  foreign key (id_utilizador) references utilizador(id_utilizador),
  foreign key (id_anuncio) references anuncio(id_anuncio)
);

create table historico_visualizacao (
  id_visualizacao int auto_increment primary key,
  id_utilizador int not null,
  id_anuncio int not null,
  data_visualizacao datetime not null default current_timestamp,
  foreign key (id_utilizador) references utilizador(id_utilizador),
  foreign key (id_anuncio) references anuncio(id_anuncio)
);