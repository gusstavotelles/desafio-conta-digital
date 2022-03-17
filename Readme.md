# Desafio Conta Digital UME
## Decisões técnicas e arquiteturais 

* Para a Realização do desafio a stack escolhida foi o NestJS, por ser um dos frameworks utilizados na empresa e pela facilidade de estabelecimento e execução, além da familiaridade com TypeScript.
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