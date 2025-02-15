# Resultado do teste Frontend Sinka

## Objetivo

Desenvolver uma aplicação frontend utilizando **React e Next.js** para consumir dados de uma API backend que disponibilizaremos. O objetivo é criar uma interface interativa e responsiva para gerenciar clientes, permitindo a listagem, visualização, edição e exclusão de registros.

## Requisitos Técnicos

A aplicação deve ser desenvolvida utilizando as seguintes tecnologias:

- React **(com uso de hooks e componentes funcionais)**
- Next.js
- Tailwind CSS
- Git

## Funcionalidades

1. **Listagem de Clientes**

   - Exibir todos os clientes em uma tabela.
   - Apresentar informações relevantes, como: nome de usuário, e-mail, status (ativo / inativo) e data de criação.
   - A tabela deve ser estilizada (de forma livre) e responsiva.

2. **Visualização de Cliente**

   - Criar uma página dedicada para exibir detalhes de um cliente específico.

3. **Edição de Cliente**

   - Permitir a edição das informações de um cliente.
   - Opção para alterar a senha do cliente.
   - Validar os dados antes do envio.
   - Será um diferencial usar **react-hook-form**.

4. **Exclusão de Cliente**

   - Implementar a funcionalidade para remover um cliente.
   - Exibir uma mensagem de confirmação antes da exclusão. Usar um modal ou popup estilizado.

**Dica:**
A estilização visual fica à sua escolha, mas damos preferência a algo não muito simples, use os recursos do Tailwind para deixar as telas com aparência moderna e fluida.

## Entrega

Subir o código em um repositório público do GitHub com as instruções para execução do projeto e nos enviar o link.

## Como rodar o backend

1. Ir até a pasta `backend`
2. Instalar os módulos com `npm install`
3. Copiar o arquivo `.env.example` para `.env`
4. Inicializar o Docker: `docker compose up -d`
5. Rodar migrations: `npx prisma migrate deploy`
6. Iniciar backend: `npm start`

**Endpoints backend:**

Ver os endpoints em: `http://localhost:3333/swagger`

## Como rodar o frontend

1. Ir até a pasta `frontend`
2. Instalar os módulos com `npm install`
3. Iniciar frontend: `npm run dev`

**Frontend**

Veja o frontend em: `http://localhost:3000`
