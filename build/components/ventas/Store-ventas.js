"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db"));
class StoreVenta {
  /* INSERTAR - POST - CREAR */
  add_venta(Venta) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `INSERT INTO producto_factura (id_producto_fac, id_producto, id_factura, formato, cantidad, item_total, iva) VALUES ('${Venta.id_producto_fac}', '${Venta.id_producto}', '${Venta.id_factura}', '${Venta.formato}', ${Venta.cantidad}, ${Venta.item_total}, ${Venta.iva})`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  /* SELECT - MOSTRAR - CONSULTAR */
  traer_venta() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT producto_factura.id_producto_fac, producto_factura.formato, producto_factura.cantidad as fact_cant, producto_factura.item_total, producto_factura.iva as iva_product_fact, factura.id_factura, factura.id_cliente, factura.fecha_factura, factura.descripcion_f, factura.total, factura.efectivo, factura.cambio, factura.descuento, productos.cantidad, productos.presentacion, productos.lote, productos.registro_sanitario, productos.medida, productos.tipo_medida, productos.fecha_elaboracion, productos.fecha_caducidad, productos.pvp, productos.pvf, productos.estado, nombre_producto.product_name, nombre_laboratorio.nombre_laboratorio, principio_activo.principio_activo, cliente.nombres, cliente.apellidos, cliente.identificacion, cliente.correo FROM producto_factura INNER JOIN factura ON factura.id_factura =  producto_factura.id_factura INNER JOIN productos ON productos.id_producto = producto_factura.id_producto INNER JOIN nombre_producto ON nombre_producto.id_product_name = productos.id_nombre_producto INNER JOIN nombre_laboratorio ON nombre_laboratorio.id_name_laboratorio = productos.id_nombre_laboratorio INNER JOIN principio_activo ON principio_activo.id_principio_activo = productos.id_principio_activo INNER JOIN cliente ON cliente.id_cliente = factura.id_cliente;`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  /* ELIMINAT - BORRAR - DELETE */
  eliminar_venta(id_producto_fac) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `DELETE FROM producto_factura WHERE id_producto_fac = '${id_producto_fac}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
}
let Store = new StoreVenta();
exports.default = Store;
