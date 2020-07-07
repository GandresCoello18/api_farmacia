"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Store_proveedor_1 = __importDefault(require("./Store-proveedor"));
const response_1 = __importDefault(require("../../network/response"));
const { comprobar } = require("../util/util-login");
const uuid_1 = require("uuid");
class Proveedor {
  constructor() {
    this.router = express_1.Router();
    this.ruta();
  }
  mostrar_proveedores(req, res) {
    Store_proveedor_1.default
      .mostrar_proveedor()
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "Error al mostrar proveedor"
        );
      });
  }
  crear_proveedor(req, res) {
    const { nombres, id_laboratorio, correo, telefono } = req.body || null;
    const obj = {
      id_proveedor: uuid_1.v4(),
      nombres,
      id_laboratorio,
      correo,
      telefono,
    };
    Store_proveedor_1.default
      .add_proveedor(obj)
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "Error al crear proveedor"
        );
      });
  }
  eliminar_proveedor(req, res) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_proveedor } = req.params || null;
      Store_proveedor_1.default
        .eliminar_proveedor(id_proveedor)
        .then((data) => {
          response_1.default.success(req, res, data, 200);
        })
        .catch((err) => {
          response_1.default.error(
            req,
            res,
            err,
            500,
            "Error al eliminar proveedor"
          );
        });
    } else {
      response_1.default.success(
        req,
        res,
        { feeback: "Estos datos ya son existentes" },
        200
      );
    }
  }
  ruta() {
    this.router.post("/", this.crear_proveedor);
    this.router.get("/", this.mostrar_proveedores);
    this.router.delete("/:id_proveedor", comprobar, this.eliminar_proveedor);
  }
}
let proveedor = new Proveedor();
exports.default = proveedor.router;
