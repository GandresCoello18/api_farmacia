import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import expressPinoLogger from "express-pino-logger";
import cookieParser from "cookie-parser";

// puntos de entrada
import IndexRouter from "./network/rutas";
import Usuarios from "./components/user/ruta-usuario";
import Email from "./components/email/ruta-email";
import Login from "./components/login/ruta-login";
import Producto from "./components/producto/ruta-producto";
import Cliente from "./components/cliente/ruta-cliente";
import Factura from "./components/factura/ruta-factura";
import Ventas from "./components/ventas/ruta-ventas";
import Proveedores from "./components/proveedor/ruta-proveedor";
import Prestamo from "./components/prestamo/ruta-prestamo";

// vistas
import viewHome from "./components/home/vista-home";
import viewLogin from "./components/login/vista-login";

const { config } = require("./config/index");
import { logger } from "./components/util/logger";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.set("port", config.port);
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: [
          "https://farmacia-juanito.now.sh",
          "http://localhost:3000",
          "https://farmacia-juanito-response.vercel.app",
        ],
      })
    );
    this.app.use(expressPinoLogger({ logger: logger }));
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());
    this.app.use("/static", express.static("public"));
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "pug");
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  routes() {
    // peticiones de datos con api rest
    this.app.use("/api", IndexRouter);
    this.app.use("/api/usuario", Usuarios);
    this.app.use("/api/email", Email);
    this.app.use("/api/login", Login);
    this.app.use("/api/producto", Producto);
    this.app.use("/api/cliente", Cliente);
    this.app.use("/api/factura", Factura);
    this.app.use("/api/venta", Ventas);
    this.app.use("/api/proveedor", Proveedores);
    this.app.use("/api/prestamo", Prestamo);
    // vistas en backend
    this.app.use("/view/home", viewHome);
    this.app.use("/view/login", viewLogin);
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
