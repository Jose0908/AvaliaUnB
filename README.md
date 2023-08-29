# AvaliaUnB

### Aplicação que consiste em uma forma de os alunos avaliarem o desempenho dos professores. Tem o objetivo de ajudar o aluno a escolher as matérias com o professor que mais se encaixa em seu perfil.

## Estrutura dos diretórios

A pasta código contém todo o código fonte, assim como os comandos SQL utilizados para criação das tabelas e inserção de dados.

## Passos para executar:

1°: Crie um banco de dados em mysql.

2°: Se não exisitr, crie um arquivo .env, em /codigo, com as variáveis de ambiente. Exemplo:
MYSQL_HOST = 'localhost'
MYSQL_USER = 'root'
MYSQL_PASSWORD = 'sua senha'
MYSQL_DATABASE = 'nome do seu db'

3°: Ainda em  /codigo, rode os comandos:
yarn createdb
yarn dev

O primeiro comando cria o banco de dados utilizando as queries sql localizadas na pasta sql, dentro de código.

O segundo comando roda o servidor em localhost:3000.

Dessa forma, ao acessar localhost:3000 em seu navegador, deve ser possível ver a aplicação rodando, com todos os cruds.


## Sobre o código

Foi utilizado express e ejs. Em public estão as imagens utilizadas na aplicação e dentro da pasta css está o código css de todas as páginas.

Na pasta sql, como foi dito anteriormente, está o código sql para a criação das tabelas, da view, da procedure e a inserção de código sql.

Na pasta src está a parte central do código. O app.js recebe as requisições e faz o roteamento para as controllers. Cada controller lida com determinada subrota e chama uma service para prover o serviço que conecta diretamente com o banco de dados. Na service, são feitos os cruds (com comandos sql puro), é criado a view e também é inicializado o banco de dados.

Na pasta view, estão os ejs criados para as páginas. Quando um controller recebe determinada requisição, ele pode renderizar a página ejs passando um json como parametro. Dessa forma é feita a comunicação entre o FrontEnd e o BackEnd.

Além dessas pastas, são gerados os node_modules, package.json, package-lock.json e yarn.lock, criados automaticamente para gerenciar as bibliotecas e recursos do node na aplicação.

