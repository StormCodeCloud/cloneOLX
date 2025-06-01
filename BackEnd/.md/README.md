## Dependencias presentes no Projeto

package.json
_npm init -y_

package-lock.json
_npm i_

express: Framework para criar APIs RESTful.
_npm i express_

mysql2 & sequelize: biblioteca para conectar ao MySQL e ORM para manipulação de banco de dados.
_npm i sequelize mysql2_

Multer: middleware para upload de arquivos.
_npm install --save multer_

Json webToken: para autenticação baseada em tokens.
_npm install jsonwebtoken_

Web Sockets Client: para comunicação em tempo real via WebSockets.
_npm install socket.io-client_

Swagger: para documentação da API.
_npm install swagger-ui-express swagger-autogen_

Dot env: para gerenciar variáveis de ambiente.
_npm i dotenv_

---

## Como funciona o multer

> O Multer adiciona um objeto de corpo e um objeto de arquivo ou arquivos ao objeto de solicitação. O objeto de corpo contém os valores dos campos de texto do formulário, enquanto o objeto de arquivo ou arquivos contém os arquivos enviados por meio do formulário.

Exemplo:

EX:

<form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>
