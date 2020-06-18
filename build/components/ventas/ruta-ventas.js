"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Store_ventas_1 = __importDefault(require("./Store-ventas"));
const response_1 = __importDefault(require("../../network/response"));
const { comprobar } = require("../util/util-login");
class Ventas {
  constructor() {
    this.router = express_1.Router();
    this.ruta();
  }
  traer_venta(req, res) {
    Store_ventas_1.default
      .traer_venta()
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(req, res, err, 500, "Error en traer ventas");
      });
  }
  eliminar_venta(req, res) {
    const { id_producto_factura } = req.params || null;
    Store_ventas_1.default
      .eliminar_venta(id_producto_factura)
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(req, res, err, 500, "Error en eliminar venta");
      });
  }
  ruta() {
    this.router.get("/", this.traer_venta);
    this.router.delete("/:id_producto_factura", this.eliminar_venta);
  }
}
let venta = new Ventas();
exports.default = venta.router;
