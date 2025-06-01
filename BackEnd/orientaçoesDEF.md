## Orientações para Defesa dos Requisitos

### 1. Registo de Utilizadores

- Explicar que o endpoint POST `/api/utilizador/registar` recebe os dados do utilizador, faz validação de email, aplica hash seguro na password e salva no banco.
- Mostrar o fluxo no código e, se possível, faça um teste ao vivo pelo Postman ou frontend.

### 2. Login de Utilizadores

- Demonstre o endpoint POST `/api/utilizador/login`, que valida a password com bcrypt e retorna um JWT.
- Mostrar como o token é usado para acessar rotas protegidas (exemplo: criar anúncio).

### 3. Publicar Anúncio

- Mostrar que só é possível criar anúncio autenticado (token JWT).
- Explicar o endpoint POST `/api/anuncio/criar` e mostrar o campo `id_utilizador` vindo do token.

### 4. Home Page (Listar Anúncios)

- Demonstre o endpoint GET `/api/anuncio/` retornando todos os anúncios para a página inicial.
- Mostrar a integração com o frontend (ex: HomePage.tsx).

### 5. Chat

- Explicar o uso do WebSocket (socket.io) para chat em tempo real.
- Mostrar o evento de envio/recebimento de mensagens e, se possível, simule uma conversa entre dois utilizadores.

### 6. Seguir Anúncio

- Demonstre os endpoints POST `/api/anuncio-favorito/seguir` e DELETE `/api/anuncio-favorito/ .
- Mostrar como o utilizador pode seguir/ anúncios e como isso é salvo no banco.

### 7. Listar Anúncios Seguidos

- Mostrar o endpoint GET `/api/anuncio-favorito/seguidos/:id_utilizador`.
- Explicar como o utilizador pode ver todos os anúncios que está a seguir.

### 8. Publicar Imagem

- Explicar o uso do Multer para upload de imagens no endpoint POST `/api/imagem/upload`.
- Mostrar que o caminho da imagem é salvo no banco e associado ao anúncio.

### 9. Backoffice (Admin)

- Demonstre as rotas de gestão de utilizadores e anúncios (GET, PUT, DELETE).
- Mostrar que o admin pode editar/excluir qualquer utilizador ou anúncio.
- Se possível, mostrar a interface de admin no frontend.
