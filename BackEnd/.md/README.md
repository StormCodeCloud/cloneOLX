## Dependencias presentes no código

package.json
_npm init -y_

package-lock.json
_npm i_

express
_npm i express_

mysql2 & sequelize
_npm i sequelize mysql2_

Multer para uploading de imagens
_npm install --save multer_

Json webToken:
_npm install jsonwebtoken_

Web Sockets Clietn
_npm install socket.io-client_

---

## Resumo dos Requisitos Implementados

**Registo de utilizadores**

- Endpoint: `POST /api/utilizador/registar`
- Recebe: nome, email, password e telefone
- Verifica se o email já existe
- Faz hash da password com bcrypt
- Cria o utilizador na base de dados

**Login de utilizadores**

- Endpoint: `POST /api/utilizador/login`
- Recebe: email e password
- Verifica a password com bcrypt
- Se correto, retorna um token JWT para autenticação
- Utilizador usa esse token para acessar rotas protegidas

**Publicar Anúncio**

- Endpoint: `POST /api/anuncio/criar` (protegido por JWT)
- Só utilizadores autenticados podem criar anúncios
- Controller recebe dados do anúncio e salva na base de dados com o id do utilizador autenticado

**Home Page (Listar Anúncios)**

- Endpoint: `GET /api/anuncio/`
- Controller retorna todos os anúncios cadastrados para exibir na home page

**Chat entre utilizadores**

- Implementado com WebSockets usando socket.io no backend
- O frontend conecta ao WebSocket, envia e recebe mensagens em tempo real usando eventos personalizados

**Seguir anúncio**

- Endpoint: `POST /api/anuncio-favorito/seguir` para seguir um anúncio
- Endpoint: `DELETE /api/anuncio-favorito/desseguir` para desseguir
- Controller adiciona ou remove o favorito na tabela de favoritos

**Listar anúncios seguidos**

- Endpoint: `GET /api/anuncio-favorito/seguidos/:id_utilizador`
- Controller retorna todos os anúncios seguidos pelo utilizador

**Publicar Imagem**

- Endpoint: `POST /api/imagem/upload`
- Utiliza multer para upload de imagens
- Salva o caminho da imagem no banco de dados associado ao anúncio

**Backoffice (Admin)**

- Gestão de utilizadores: visualizar (`GET`), editar (`PUT`) e excluir (`DELETE`) utilizadores
- Gestão de anúncios: visualizar (`GET`), editar (`PUT`) e excluir (`DELETE`) anúncios de todos os utilizadores

---

> Para detalhes de cada rota, consultar a pasta `/routes` e os controllers correspondentes.

---

## Como funciona o Web sockets?

_Exemplo no Front (React, Vue ou js puro):_

import { io } from "socket.io-client";

// Conecte ao backend (ajuste a URL conforme necessário)
`const socket = io("http://localhost:3000");`

// Enviar mensagem
`function enviarMensagem(mensagem) {`
`socket.emit("chat:send", mensagem);`
`}`

// Receber mensagem (para o utilizador autenticado)
`socket.on(chat:receive:${id_utilizador}, (mensagem) => {`
/ Atualize o chat na tela
`console.log("Nova mensagem recebida:", mensagem);`
`});`

_No envio, enviamos um objeto como:_

{
`id_remetente: 1,`
`id_destinatario: 2,`
`id_anuncio: 5,`
`conteudo: "Olá, ainda está disponível?"`
}

## Como funciona o multer

> O Multer adiciona um objeto de corpo e um objeto de arquivo ou arquivos ao objeto de solicitação. O objeto de corpo contém os valores dos campos de texto do formulário, enquanto o objeto de arquivo ou arquivos contém os arquivos enviados por meio do formulário.

Exemplo:

EX:

<form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>
