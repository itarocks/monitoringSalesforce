const express = require("express");
const nunjucks = require("nunjucks");
const session = require("express-session");
const LokiStore = require("connect-loki")(session);
//lida com os caminhos dos servidores, aqui lida com todos os sistemas
//operacionais
const path = require("path");
const flash = require("connect-flash");

class App {
  constructor() {
    //O antigo app
    this.express = express();
    //NODE_ENV --> normalmente armazena tres valores
    this.isDev = process.env.NODE_ENV != "production";
    this.middlewares();
    this.views();
    this.routes();
  }

  middlewares() {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(flash());
  }

  views() {
    //__dirname: pega o diretorio atual
    nunjucks.configure(path.resolve(__dirname, "views"), {
      watch: this.isDevlopment,
      express: this.express,
      //
      autoescape: true
    });
    //utiliza a extensao njk
    this.express.set("view engine", "njk");
    //dessa forma é possivel dar acesso a outras pastas do projeto
    this.express.use(express.static(path.resolve(__dirname, "public")));
  }

  routes() {
    this.express.use(require("./routes"));
  }
}
//importa uma instancia da classe
module.exports = new App().express;