"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Store_factura_1 = __importDefault(require("./Store-factura"));
const Store_ventas_1 = __importDefault(require("../ventas/Store-ventas"));
const Store_producto_1 = __importDefault(require("../producto/Store-producto"));
const response_1 = __importDefault(require("../../network/response"));
const { comprobar } = require("../util/util-login");
const util_fecha_1 = __importDefault(require("../util/util-fecha"));
const uuid_1 = require("uuid");
class Factura {
  constructor() {
    this.router = express_1.Router();
    this.ruta();
  }
  crear_factura(req, res) {
    const {
      id_cliente,
      descripcion,
      descuento,
      iva,
      total,
      efectivo = 0,
      cambio = 0,
      productos,
    } = req.body || null;
    const obj = {
      id_factura: uuid_1.v4(),
      id_cliente,
      fecha_factura: util_fecha_1.default.fecha_con_hora_actual(),
      descripcion,
      descuento,
      iva,
      total,
      efectivo,
      cambio,
      productos,
    };
    if (obj.id_cliente == "") {
      obj.id_cliente = "b1fd154a-d4a2-42a0-b7a1-e4e6b0ffa479";
    }
    if (obj.descripcion == "") obj.descripcion = "Sin descripcion";
    Store_factura_1.default
      .add_factura(obj)
      .then((data) => {
        for (let i = 0; i < obj.productos.length; i++) {
          let objVenta = {
            id_producto_fac: uuid_1.v4(),
            id_producto: obj.productos[i].id_producto,
            id_factura: obj.id_factura,
            formato: `${obj.productos[i].formato}`,
            cantidad: Number(obj.productos[i].unidades),
          };
          Store_ventas_1.default
            .add_venta(objVenta)
            .then((data) => {
              return response_1.default.success(req, res, data, 200);
            })
            .catch((err) => {
              console.log("Error al crear venta: " + err.message);
            });
          Store_producto_1.default
            .cambiar_status_producto(obj.productos[i].id_producto, "Vendido")
            .then((data) => {
              return response_1.default.success(req, res, data, 200);
            })
            .catch((err) => {
              console.log("Error al cambiar estado producto: " + err.message);
            });
        }
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(req, res, err, 500, "Error en crear factura");
      });
  }
  traer_facturas(req, res) {
    Store_factura_1.default
      .traer_facturas()
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(req, res, err, 500, "Error en traer facturas");
      });
  }
  ruta() {
    this.router.post("/", this.crear_factura);
    this.router.get("/", this.traer_facturas);
  }
}
let cliente = new Factura();
exports.default = cliente.router;
