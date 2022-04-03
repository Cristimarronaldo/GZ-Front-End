
- Back-End (Asp.net core e EF)
  - Dominio (Gazin.Dominio)-> Regra de negocio 
  - Infra   (Gazin.Infra)  -> Estrutura para gravar os dados no banco de dados
  - Serviço (Gazin.API)    -> API Rest
  
- Banco de dados Sql Server

Dentro do projeto (Back-End) tem o script para criação do banco de dados e tabelas Script.sql Dentro do projeto Back-End.



SPA - Angular
- Para configurar o URL da API é usando environment do angular

Configurar o banco de dados da API (Projeto Gazin.API), foi usado appsettings.Production.json e appsettings.Development.json que esta dentro da pasta src/Servico


- Niveis 
  - Precisar preencher a descrição de Nivel.
  - Precisar ter entre 3 a 100 caracteres.
  - Não pode cadastrar ou alterar uma descrição de nivel já existente na base de dados.
  - Na exclusão de nível não será possivel excluir um nível vinculado ao um ou mais desenvolvedor.

- Desenvolvedor
  - O campo nome do desenvolvedor precisa está preenchido.
  - No nome precisa ter entre 3 a 100 caracteres.
  - O código nível precisa está preenchido.
  - Sexo precisa está preenchindo.
  - Para gravar o desenvolvedor precisa ser maior ou igual 18 anos.
