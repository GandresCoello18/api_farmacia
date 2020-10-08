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
const db_1 = __importDefault(require("../../../db"));
class Response {
  responder_producto(id__product) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT productos.id_producto, productos.cantidad, productos.cantidad_disponible, productos.presentacion, productos.estado, productos.lote, productos.pvp, productos.pvf, productos.registro_sanitario, productos.medida, productos.tipo_medida, productos.fecha_elaboracion, productos.fecha_caducidad, nombre_producto.product_name, nombre_laboratorio.nombre_laboratorio, principio_activo.principio_activo FROM productos INNER JOIN nombre_producto ON nombre_producto.id_product_name = productos.id_nombre_producto INNER JOIN nombre_laboratorio ON nombre_laboratorio.id_name_laboratorio = productos.id_nombre_laboratorio INNER JOIN principio_activo ON principio_activo.id_principio_activo = productos.id_principio_activo WHERE id_producto  = '${id__product}' ORDER BY nombre_producto.product_name DESC `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
}
const response = new Response();
exports.default = response;
