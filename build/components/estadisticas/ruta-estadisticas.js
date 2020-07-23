"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Store_estadisticas_1 = __importDefault(require("./Store-estadisticas"));
const response_1 = __importDefault(require("../../network/response"));
const { comprobar } = require("../util/util-login");
class Estadisticas {
  constructor() {
    this.router = express_1.Router();
    this.ruta();
  }
  ventas_por_dia(req, res) {
    const { fecha } = req.params || null;
    Store_estadisticas_1.default
      .traer_ventas_por_dia(fecha)
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(req, res, err, 500, "Error en traer facturas");
      });
  }
  ruta() {
    this.router.get("/:fecha", this.ventas_por_dia);
  }
}
let estadisticas = new Estadisticas();
exports.default = estadisticas.router;
