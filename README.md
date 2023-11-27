# README
Esta é uma aplicaçao em Express.js para autenticação de usuários e recuperação de informações de usuário usando o MongoDB como banco de dados. O aplicativo utiliza tecnologias como Mongoose para interações com o MongoDB, Bcrypt para hash de senhas, JSON Web Tokens (JWT) para autenticação do usuário, e o pacote dotenv para gerenciar variáveis de ambiente.

## Configuração
Antes de executar o aplicativo, certifique-se de configurar as variáveis de ambiente em um arquivo .env na raiz do projeto. A variável de ambiente necessária é SECRET, que é usada como chave secreta para o JWT.


<!--**Exemplo: `SECRET=sua_chave_secreta`**--> 

## Executando o Aplicativo
Para iniciar a aplicação, execute na linha de comandos:

npm start - O aplicativo estará acessível em http://localhost:8080.

## Endpoints

### 1. GET /:id
Este endpoint recupera informações do usuário pelo ID. É necessário um token JWT válido no cabeçalho Authorization para autenticação.

*Requisição: Método: GET*

*Rota: /:id*

*Cabeçalhos: Authorization: Bearer <JWT_TOKEN>*

**Resposta:**

*Sucesso (200 OK):*
*{
  "user": {
    // Informações do usuário excluindo a senha
  }
}*

**Usuário Não Encontrado (404 Not Found):**

  1. "mensagem": "Usuário inválido"


**Erro do Servidor (500 Internal Server Error):**

  1. "mensagem": "Erro interno"

### 2. POST /singup

Este endpoint permite o registro de usuários.

*Requisição: Método: POST*

*Rota: /singup*

**Corpo:**


  1. "nome": "nome_do_usuario",
  2. "email": "usuario@example.com",
  3. "senha": "senha_do_usuario",
  4. "telefones": ["123456789", "987654321"]


**Resposta: Sucesso (201 Created):**

  1. "id": "id_do_usuario",
  2. "data_criacao": "data_de_criacao",
  3. "data_atualizacao": "data_de_atualizacao",
  4. "ultimo_login": "ultima_data_de_login"

**Email Já Registrado (400 Bad Request):**

  1. "statusCode": 400,
  2. "mensagem": "Email já cadastrado!"

**Erro do Servidor (500 Internal Server Error):**

  1. "mensagem": "Erro no servidor"

### 3. POST /singin
Este endpoint lida com a autenticação do usuário e gera um token JWT após o login bem-sucedido.

*Requisição: Método: POST*

*Caminho: /singin*

**Corpo:**

  1. "email": "usuario@example.com",
  2. "senha": "senha_do_usuario"

**Resposta:Sucesso (200 OK):**


  1. "id": "id_do_usuario",
  2. "data_criacao": "data_de_criacao",
  3. "data_atualizacao": "data_de_atualizacao",
  4. "ultimo_login": "ultima_data_de_login",
  5. "token": "token_jwt"


**Usuário ou Senha Inválidos (401 Unauthorized):**


  1. "statusCode": 401,
  2. "mensagem": "Usuario e / ou senha inválidos"

**Erro do Servidor (500 Internal Server Error):**

  1. "mensagem": "Erro no servidor"

## Conexão com o Banco de Dados

A aplicação se conecta a um banco de dados MongoDB usando a biblioteca Mongoose. A string de conexão é fornecida no método mongoose.connect. Certifique-se de substituir a string de conexão pela seu própria string de conexão do MongoDB Atlas.
