# qrmenu

online menu for restaurants

Figma prototype: https://www.figma.com/file/A2IsCpeCVxuz9B9pQN3Pni/qrmenu?type=design&mode=design
Deploy vesion: https://qrmenu-frontend.vercel.app/

### Environment variables needed to run the project locally

```bash

#Firebase auth keys

#Where to get it:
#step 1: create a new Firebase project if you don't have (https://console.firebase.google.com/u/1/)
#step 2: go to the project configuration > general
#step 3: copy the keys

FIREBASE_APP_API_KEY=
FIREBASE_APP_AUTH_DOMAIN=
FIREBASE_APP_PROJECT_ID=
FIREBASE_APP_STORAGE_BUCKET=
FIREBASE_APP_MESSAGING_SENDER_ID=
FIREBASE_APP_APP_ID=
FIREBASE_APP_MEASUREMENT_ID=

```

```bash
#Backend URL's

VITE_PRODUCT_URL=https://qrmenu-backend-mikess.vercel.app/products
VITE_CATEGORY_URL=https://qrmenu-backend-mikess.vercel.app/categories
VITE_MENU_URL=https://qrmenu-backend-mikess.vercel.app/menus
VITE_USER_URL=https://qrmenu-backend-mikess.vercel.app/users

```

```bash
#Google repactcha
#Where to get it:
#follow the link instructions how to get it: https://cloud.google.com/recaptcha-enterprise/docs/create-key-website?hl=pt-br

VITE_RECAPTCHA_SITE_KEY=

```

```bash
#Brevo api key
#Where to get it:
#follow the link instructions how to get it: https://help.brevo.com/hc/en-us/articles/209467485-Create-and-manage-your-API-keys

VITE_RECAPTCHA_SITE_KEY=

#email address where emails will be sent
#Where to get it: any email you have access to
VITE_EMAIL=

```

[Link to qrmenu_backend](https://github.com/mikessdev/qrmenu_backend)

### How to run the project locally

```bash
# install dependencies
npm install

# serve with hot reload at localhost:5173
npm run dev

```
