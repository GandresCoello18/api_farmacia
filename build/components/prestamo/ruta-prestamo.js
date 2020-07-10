"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Store_prestamo_1 = __importDefault(require("./Store-prestamo"));
const response_1 = __importDefault(require("../../network/response"));
const util_fecha_1 = __importDefault(require("../util/util-fecha"));
const { comprobar } = require("../util/util-login");
const shortid_1 = __importDefault(require("shortid"));
class Proveedor {
  constructor() {
    this.router = express_1.Router();
    this.ruta();
  }
  mostrar_prestamos(req, res) {
    Store_prestamo_1.default
      .mostrar_prestamos()
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "Error en mostrar prestamos"
        );
      });
  }
  mostrar_prestamo_por_fecha(req, res) {
    const { fecha } = req.params || null;
    Store_prestamo_1.default
      .mostrar_prestamos_por_fecha(fecha)
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "Error en traer prestamo de hoy"
        );
      });
  }
  crear_prestamo(req, res) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { descripcion_prestamo, cantidad_prestamo } = req.body || null;
      const obj = {
        id_prestamo: shortid_1.default.generate(),
        descripcion_prestamo,
        fecha_prestamo: util_fecha_1.default.fecha_con_hora_actual(),
        cantidad_prestamo: Number(cantidad_prestamo),
      };
      Store_prestamo_1.default
        .add_prestamos(obj)
        .then((data) => {
          response_1.default.success(req, res, data, 200);
        })
        .catch((err) => {
          response_1.default.error(
            req,
            res,
            err,
            500,
            "Error al crear prestamo"
          );
        });
    } else {
      response_1.default.success(
        req,
        res,
        { feeback: "No tienes permisos para estan accion" },
        200
      );
    }
  }
  ruta() {
    this.router.get("/fecha/:fecha", this.mostrar_prestamo_por_fecha);
    this.router.get("/", this.mostrar_prestamos);
    this.router.post("/", comprobar, this.crear_prestamo);
  }
}
let proveedor = new Proveedor();
exports.default = proveedor.router;
