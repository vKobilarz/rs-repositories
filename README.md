# GoStack Repositories
Segundo desafio do evento GoStack, organizado pela Rocketseat.
## Descrição
O projeto tem como objetivo manter o cadastro de projetos, informado o título, URL, likes e tecnologias do projeto.

## Comandos
### Instalação
* yarn
### Executar o Projeto
* yarn dev
### Executar os Testes
* yarn test

## Rotas
* GET /repositories: Lista todos os repositórios cadastrados.
* POST /repositories: Cadastra o repositório com os campos title, url, e techs. O campo ID é gerado automaticamente (UUID) e likes é iniciado em 0.
* PUT /repositories/[id]: Atualiza os dados do repositório. Somente permite editar os campos title, url e techs.
* DELETE /repositories/[id]: Remove um repositório.
* POST /repositories/[id]/like: Adiciona um like no repositório.
