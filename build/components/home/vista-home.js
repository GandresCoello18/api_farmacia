"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Store_home_1 = __importDefault(require("./Store-home"));
const response_1 = __importDefault(require("../../network/response"));
const { comprobar } = require("../util/util-login-admin");
class HomeView {
  constructor() {
    this.router = express_1.Router();
    this.ruta();
  }
  VistaHome(req, res) {
    const { removeID } = req.query || null;
    const { salir } = req.query || null;
    if (salir) {
      res.clearCookie("access_token").redirect("/view/login");
    }
    if (removeID) {
      Store_home_1.default.eliminar_access_code(removeID).then(() => {
        res.redirect("/view/home");
      });
    }
    Store_home_1.default
      .list_access_code()
      .then((data) => {
        res.render("index.pug", { data: data });
      })
      .catch((err) => console.log(`Error en listar los access-code: ${err}`));
  }
  CreateCode(req, res) {
    const { tipo } = req.body || null;
    Store_home_1.default
      .crear_access_code(tipo)
      .then((data) => {
        res.redirect("/view/home");
      })
      .catch((err) => {
        console.log(`Error en crear code remote admin: ${err}`);
      });
  }
  VerificarCode(req, res) {
    const { code } = req.params || null;
    Store_home_1.default
      .verificar_code(code)
      .then((data) => {
        if (data == 0) {
          response_1.default.success(
            req,
            res,
            { feeback: "Acceso invalido, el codigo de acceso es incorrecto" },
            200
          );
        } else {
          response_1.default.success(
            req,
            res,
            { feeback: "Acceso concedido", info: data },
            200
          );
        }
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          { feeback: "Acceso invalido" },
          500,
          "Error en verificar code Home"
        );
      });
  }
  ruta() {
    this.router.get("/", comprobar, this.VistaHome);
    this.router.get("/verificar/:code", this.VerificarCode);
    this.router.post("/", this.CreateCode);
  }
}
let vista = new HomeView();
exports.default = vista.router;
