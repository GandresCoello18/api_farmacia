"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const rutas_1 = __importDefault(require("./network/rutas"));
const ruta_usuario_1 = __importDefault(
  require("./components/user/ruta-usuario")
);
const ruta_email_1 = __importDefault(require("./components/email/ruta-email"));
const ruta_login_1 = __importDefault(require("./components/login/ruta-login"));
const ruta_producto_1 = __importDefault(
  require("./components/producto/ruta-producto")
);
const ruta_cliente_1 = __importDefault(
  require("./components/cliente/ruta-cliente")
);
// vistas
const vista_home_1 = __importDefault(require("./components/home/vista-home"));
const vista_login_1 = __importDefault(
  require("./components/login/vista-login")
);
const { config } = require("./config/index");
class Server {
  constructor() {
    this.app = express_1.default();
    this.config();
    this.routes();
  }
  config() {
    this.app.set("port", config.port);
    this.app.use(helmet_1.default());
    this.app.use(cors_1.default());
    this.app.use(cookie_parser_1.default());
    this.app.use(body_parser_1.default.json());
    this.app.use("/static", express_1.default.static("public"));
    this.app.set("views", path_1.default.join(__dirname, "views"));
    this.app.set("view engine", "pug");
    this.app.use(body_parser_1.default.urlencoded({ extended: false }));
  }
  routes() {
    // peticiones de datos con api rest
    this.app.use("/api", rutas_1.default);
    this.app.use("/api/usuario", ruta_usuario_1.default);
    this.app.use("/api/email", ruta_email_1.default);
    this.app.use("/api/login", ruta_login_1.default);
    this.app.use("/api/producto", ruta_producto_1.default);
    this.app.use("/api/cliente", ruta_cliente_1.default);
    // vistas en backend
    this.app.use("/view/home", vista_home_1.default);
    this.app.use("/view/login", vista_login_1.default);
    // se ejecuta si no encuentra la ruta
    this.app.get("*", function (req, res) {
      res.status(404).render("404.pug");
    });
  }
  start() {
    this.app.listen(this.app.get("port"), () =>
      console.log("Server levantado")
    );
  }
}
const server = new Server();
server.start();
