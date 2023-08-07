# qrmenu
online menu for restaurants

![image](https://github.com/mikessdev/qrmenu/assets/77863237/ec301952-1612-4eb4-aa36-18990c6f9a9c)





# Etapas para rodar o projeto localmente

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:5173
npm run dev

# run api mock
npm run api
```

# Etapas para gera um link que não seja local (para você testar em outras máquinas)
Obs: provavelmente você vai aparecer uma mensagem no terminal ou no site avisando que você precisa gerar um token e cadastrar esse token pelo terminal.

``` bash
# generating global link for API mock
./ngrok http 3000

# generating global link for Frontend project
./ngrok http 5173
```
