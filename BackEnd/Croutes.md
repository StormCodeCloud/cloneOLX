**ROUTES A FUNCIONAR NESTE MOMENTO**

# GET /api/anuncio/

(Sem corpo, só GET) - 200 OK

# Post /api/utilizador/registar

Body:

```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "telefone": "912345678",
  "id_localizacao": 1
}
```

**localizaçao 1: Lisboa, Lisboa, Areeiro**

R: 200 OK -

```json
{
  "message": "Utilizador registado com sucesso!",
  "utilizador": {
    "data_registo": "2025-06-01T11:38:05.570Z",
    "estado_conta": "ativo",
    "id_utilizador": 2,
    "nome": "João Silva",
    "email": "joao@email.com",
    "password": "$2b$10$hJnR1Oj52/HCFzGm3lWhbez5EVTcUgRIK9CtOaSs7bbczRCSglrIO",
    "telefone": "912345678",
    "id_localizacao": 1
  }
}
```

# Post - /api/utilizador/login

Body:

```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

R: 200 OK -

```json
{
  "message": "Login efetuado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqb2FvQGVtYWlsLmNvbSIsImlhdCI6MTc0ODc3ODA1NywiZXhwIjoxNzQ4Nzg1MjU3fQ.KGVWvTFSsEi7pAJn9wmgLuIJBPys2Y4HTs8ZeH6AZlo",
  "utilizador": {
    "id": 2,
    "nome": "João Silva",
    "email": "joao@email.com"
  }
}
```

# Post - /api/localizacao/adicionar

Body:

```json
{
  "distrito": "Porto Santo",
  "concelho": "Porto Santo",
  "freguesia": "Zona do Tanque"
}
```

R: 200 OK -

```json
{
  "id_localizacao": 2,
  "distrito": "Porto Santo",
  "concelho": "Porto Santo",
  "freguesia": "Zona do Tanque"
}
```

# Post - /api/categoria/adicionar

body:

```json
{
  "nome_categoria": "Tecnologia"
}
```

R: 200 OK -

```json
{
  "id_categoria": 1,
  "nome_categoria": "Tecnologia"
}
```

# Get - /api/categoria

R: 200 OK

**Criar um anuncio**
body:

```json
{
  "titulo": "iPhone 13 Pro Max",
  "descricao": "iPhone 13 Pro Max 256GB, cor grafite, estado novo",
  "preco": 899.99,
  "id_categoria": 1,
  "id_localizacao": 1
}
```

R: 201 CREATED -

```json
{
  "data_publicacao": "2025-06-01T12:21:35.505Z",
  "id_anuncio": 1,
  "titulo": "iPhone 13 Pro Max",
  "descricao": "iPhone 13 Pro Max 256GB, cor grafite, estado novo",
  "preco": 899.99,
  "id_utilizador": 2,
  "id_categoria": 1,
  "id_localizacao": 1,
  "estado": "ativo"
}
```

**ROTAS DE ADMINISTRADOR**

# GET /api/admin/

(Lista todos os administradores)
R: 200 OK -

```json
[
  {
    "id_administrador": 1,
    "nome_administrador": "Admin Principal",
    "email_administrador": "admin@cloneolx.com",
    "password_administrador": "$2b$10$hJnR1Oj52/HCFzGm3lWhbez5EVTcUgRIK9CtOaSs7bbczRCSglrIO"
  }
]
```

# POST /api/admin/criar

(Criar novo administrador)
Body:

```json
{
  "nome_administrador": "Duarte Robinson",
  "email_administrador": "duarteadmin@cloneolx.com",
  "password_administrador": "senha456"
}
```

R: 201 CREATED -

```json
{
  "message": "Administrador criado com sucesso",
  "administrador": {
    "id_administrador": 1,
    "nome_administrador": "Duarte Robinson",
    "email_administrador": "duarteadmin@cloneolx.com"
  }
}
```

# DELETE /api/admin/eliminar-nao-admin

(Eliminar todos os utilizadores não administradores)
R: 200 OK -

```json
{
  "message": "3 utilizadores eliminados com sucesso."
}
```

**Notas importantes:**

1. Todas as rotas de administrador devem ser protegidas e só acessíveis por utilizadores com privilégios de administrador
2. As passwords são sempre armazenadas de forma **encriptada**
3. A eliminação de utilizadores é uma operação irreversível e deve ser usada com cautela
