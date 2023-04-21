# UserManager WebServer

## Getting Started

See our OneNote file, in Projectos -> CMAlenquer -> Settings -> Configurações for more information.

### Prerequisites

To install it all (after Node.js) just run npm install

* Node.js

Install <https://nodejs.org/en/download/>  

* Express (Easier multi-pages created)

```bash
npm install express --save
```

* Nodemon (Automatically restarts the server)

```bash
npm i --save-dev nodemon
```

* Express-validator (Validations lib)

```bash
npm install --save express-validator
```

* Sequelize (Database easier access)

```bash
npm install --save sequelize
npm install --save pg pg-hstore
```

* Validator.js (A library of string validators and sanitizers)

```bash
npm install validator
```

* uuid (UUID generator)

```bash
npm install uuid
```

### Running the web application

In the Thales.LVpD.UserManager\UserManager directory open one terminal:

```bash
npm start
 ```

And then open a browser and visit localhost:1010

### Generate the documentation

```bash
apidoc  -e "(node_modules|public)" -o public/apidoc  
 ```

## Versioning

* 1.0.2

## Authors

* **Thales Portugal** - *Innovation Hub* - Lúcia Lisboa
