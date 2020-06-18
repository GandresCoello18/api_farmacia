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
class StoreFactura {
  add_factura(Factura) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `INSERT INTO factura (id_factura, id_cliente, fecha_factura, descripcion_f, descuento, iva, total, efectivo, cambio) VALUES ('${Factura.id_factura}', '${Factura.id_cliente}', '${Factura.fecha_factura}', '${Factura.descripcion}', ${Factura.descuento}, ${Factura.iva}, ${Factura.total}, ${Factura.efectivo}, ${Factura.cambio})`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  traer_facturas() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT factura.id_factura, factura.fecha_factura, factura.descripcion_f, factura.descuento, factura.iva, factura.total, cliente.correo, cliente.identificacion FROM factura INNER JOIN cliente ON cliente.id_cliente = factura.id_cliente ORDER BY factura.id_factura DESC;`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
}
let Store = new StoreFactura();
exports.default = Store;
