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
class StorNameProduct {
  add_name_product(name_product) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `INSERT INTO nombre_producto (product_name) VALUES ('${name_product}')`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  add_name_laboratorio(name_laboratorio) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `INSERT INTO nombre_laboratorio (nombre_laboratorio) VALUES ('${name_laboratorio}')`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  listar_name_producto() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT * FROM nombre_producto ORDER BY id_product_name DESC`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  listar_name_laboratorio() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT * FROM nombre_laboratorio ORDER BY id_name_laboratorio DESC`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  add_product(Producto) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `INSERT INTO productos (id_producto, id_nombre_producto, id_nombre_laboratorio, cantidad, presentacion, lote, registro_sanitario, medida, tipo_medida, fecha_elaboracion, fecha_caducidad, pvp, pvf) VALUES ('${Producto.id_producto}', ${Producto.id_name_product}, ${Producto.id_name_laboratorio}, ${Producto.cantidad}, '${Producto.presentacion}', '${Producto.lote}', '${Producto.registro_sanitario}', ${Producto.dosis}, '${Producto.tipo_dosis}', '${Producto.fecha_elaboracion}', '${Producto.fecha_caducidad}', ${Producto.pvp}, ${Producto.pvf})`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  listar_producto() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT productos.id_producto, productos.cantidad, productos.presentacion, productos.lote, productos.pvp, productos.pvf, productos.registro_sanitario, productos.medida, productos.tipo_medida, productos.fecha_elaboracion, productos.fecha_caducidad, nombre_producto.product_name, nombre_laboratorio.nombre_laboratorio FROM productos INNER JOIN nombre_producto ON nombre_producto.id_product_name = productos.id_nombre_producto INNER JOIN nombre_laboratorio ON nombre_laboratorio.id_name_laboratorio = productos.id_nombre_laboratorio ORDER BY productos.id_producto DESC;`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  eliminar_producto(id_producto) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `DELETE FROM productos WHERE id_producto = '${id_producto}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
}
let Store = new StorNameProduct();
exports.default = Store;
