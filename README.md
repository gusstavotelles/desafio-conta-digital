# Desafio Conta Digital UME
## Decisões técnicas e arquiteturais 

* Para a Realização do desafio a stack escolhida foi o NestJS, por ser um dos frameworks utilizados na empresa e pela facilidade de estabelecimento e execução, além da familiaridade com TypeScript.

* Foi clonado um repositório template de projeto em NestJS
* as estruturas foram criadas utilizando o comando automatizado nest generate resource, já criando cada modulo separadamente com seu Controller, Service e Arquivos .spec para testes unitáriosexecutado. Exemplo:
``` 
 $ nest generate resource account
```
* cada entidade é um modulo separado, que por sua vez é composto de um controller, um service e um repository
* o banco de dados escolhido é o MySQL que é mantido através do docker compose durante a execução do projeto.

## Como Executar
após possuir o respositório clonado, estando no diretório raíz do projeto, executar no terminal:
``` 
 $ npm i
```

``` 
 $ docker-compose down && docker-compose up --build
```
``` 
 $ npm run start:dev
```

após o build, acessar http://localhost:3001/api/#/ onde se terá acesso ao Swagger.

Tendo Acessado o Swagger, basta testar cada método com as entradas corretas, seguindo o formato do exemplo:

1) Account
``` 
{"name": "Gustavo Telles", "document": "111.222.333-44", "available_value": 10000}
{"name": "Alicia Ligeiro", "document": "999.999.999-99", "available_value": 2000}
```

2) Transaction
``` 
{"sender_document": "111.222.333-44", "receiver_document": "999.999.999-99", "value": 300}
```

## Fontes de pesquisa para desenvolvimento do projeto
* https://docs.nestjs.com/openapi/introduction
* https://medium.com/the-crowdlinker-chronicle/using-docker-with-nestjs-or-any-nodejs-app-e905b83275e
* https://github.com/CrowdLinker/nestbox/blob/master/examples/custom-entrypoint/docker-compose.yml
* https://progressivecoder.com/how-to-configure-nestjs-typeorm-integration-mysql/
* https://stackoverflow.com/questions/49504765/debugging-nest-js-application-with-vscode
* https://docs.nestjs.com/fundamentals/testing#unit-testing
* https://docs.nestjs.com/techniques/database
* https://progressivecoder.com/how-to-configure-nestjs-typeorm-integration-mysql/

