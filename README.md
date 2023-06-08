# qrmenu
online menu for restaurants


# Etapas para rodar o projeto localmente

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:5173
npm run dev

# run api mock
npx json-server --watch ./json_server/db.json ---port 3000
```

# Etapas para gera um link que não seja local (para você testar em outras máquinas)
Obs: provavelmente você vai aparecer uma mensagem no terminal ou no site avisando que você precisa gerar um token e cadastrar esse token pelo terminal.

``` bash
# generating global link for API mock
./ngrok http 3000

# generating global link for Frontend project
./ngrok http 5173
```