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

EX:

<form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>

## Indice do projeto (REQUISITOS DO PROJETO)

**Registo de utilizadores: Os utilizadores devem ser capazes de se registar fornecendo um nome de utilizador, e-mail e password**
https://vscode.dev/github/StormCodeCloud/cloneOLX/blob/main/BackEnd/controllers/utilizadoresController.js#L18

**Login de utilizadores: Os utilizadores devem ser capazes de fazer login utilizando seu nome de utilizador e password**
https://vscode.dev/github/StormCodeCloud/cloneOLX/blob/main/BackEnd/controllers/utilizadoresController.js#L33

**Publicar Anúncio: Os utilizadores autenticados devem ser capazes de criar anúncios**
https://vscode.dev/github/StormCodeCloud/cloneOLX/blob/main/BackEnd/controllers/utilizadoresController.js#L51

**Home Page: A aplicação deve ter uma página inicial que mostre toda a lista de anúncios disponíveis**
(endpoint que mostra os anuncios) https://vscode.dev/github/StormCodeCloud/cloneOLX/blob/main/BackEnd/controllers/anuncioController.js#L5

**Chat: Os utilizadores devem ser capazes de enviar e receber mensagens a um vendedor**
Usando web sockets, emplementamos-o no server js (https://vscode.dev/github/StormCodeCloud/cloneOLX/blob/main/BackEnd/server.js#L32) onde foi deixado um evento de conexao e poder usar para o front end.

**Seguir anúncio: Os utilizadores devem poder “seguir” qualquer anúncio**
