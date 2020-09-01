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
const express_pino_logger_1 = __importDefault(require("express-pino-logger"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// puntos de entrada
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
const ruta_factura_1 = __importDefault(
  require("./components/factura/ruta-factura")
);
const ruta_ventas_1 = __importDefault(
  require("./components/ventas/ruta-ventas")
);
const ruta_proveedor_1 = __importDefault(
  require("./components/proveedor/ruta-proveedor")
);
const ruta_prestamo_1 = __importDefault(
  require("./components/prestamo/ruta-prestamo")
);
// vistas
const vista_home_1 = __importDefault(require("./components/home/vista-home"));
const vista_login_1 = __importDefault(
  require("./components/login/vista-login")
);
const { config } = require("./config/index");
const logger_1 = require("./components/util/logger");
class Server {
  constructor() {
    this.app = express_1.default();
    this.config();
    this.routes();
  }
  config() {
    this.app.set("port", config.port);
    this.app.use(helmet_1.default());
    this.app.use(
      cors_1.default({
        origin: [
          "https://farmacia-juanito.now.sh",
          "http://localhost:3000",
          "https://farmacia-juanito-response.vercel.app",
        ],
      })
    );
    this.app.use(express_pino_logger_1.default({ logger: logger_1.logger }));
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
    this.app.use("/api/factura", ruta_factura_1.default);
    this.app.use("/api/venta", ruta_ventas_1.default);
    this.app.use("/api/proveedor", ruta_proveedor_1.default);
    this.app.use("/api/prestamo", ruta_prestamo_1.default);
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
      console.log("RUN SERVER NODE...")
    );
  }
}
const server = new Server();
server.start();
