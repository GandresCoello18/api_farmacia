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
class StoreProduct {
  /* INSERTAR - POST - CREAR */
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
  add_principio_activo(name_principio_activo) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `INSERT INTO principio_activo (principio_activo) VALUES ('${name_principio_activo}')`,
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
          `INSERT INTO productos (id_producto, id_nombre_producto, id_nombre_laboratorio, cantidad, presentacion, lote, registro_sanitario, medida, tipo_medida, fecha_elaboracion, fecha_caducidad, pvp, pvf, estado, id_principio_activo, cantidad_disponible) VALUES ('${Producto.id_producto}', ${Producto.id_name_product}, ${Producto.id_name_laboratorio}, ${Producto.cantidad}, '${Producto.presentacion}', '${Producto.lote}', '${Producto.registro_sanitario}', ${Producto.dosis}, '${Producto.tipo_dosis}', '${Producto.fecha_elaboracion}', '${Producto.fecha_caducidad}', ${Producto.pvp}, ${Producto.pvf}, '${Producto.estado}', ${Producto.id_principio_activo}, ${Producto.cantidad_disponible})`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  /* SELECT - MOSTRAR - CONSULTAR */
  listar_principio_activo() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT * FROM principio_activo WHERE principio_activo <> "none" ORDER BY principio_activo ASC`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  search_princt_activ_none() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT * FROM principio_activo WHERE principio_activo = "none" `,
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
          `SELECT * FROM nombre_producto ORDER BY product_name ASc`,
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
          `SELECT * FROM nombre_laboratorio ORDER BY nombre_laboratorio ASC`,
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
          `SELECT productos.id_producto, productos.cantidad, productos.cantidad_disponible, productos.presentacion, productos.estado, productos.lote, productos.pvp, productos.pvf, productos.registro_sanitario, productos.medida, productos.tipo_medida, productos.fecha_elaboracion, productos.fecha_caducidad, nombre_producto.product_name, nombre_laboratorio.nombre_laboratorio, principio_activo.principio_activo FROM productos INNER JOIN nombre_producto ON nombre_producto.id_product_name = productos.id_nombre_producto INNER JOIN nombre_laboratorio ON nombre_laboratorio.id_name_laboratorio = productos.id_nombre_laboratorio INNER JOIN principio_activo ON principio_activo.id_principio_activo = productos.id_principio_activo ORDER BY nombre_producto.product_name ASC;`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  producto_unico(id_producto) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT * FROM productos WHERE id_producto = '${id_producto}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  //////////////////////////////  validar registros existentes
  existente_laboratorio_name(name_laboratorio) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT * FROM nombre_laboratorio WHERE nombre_laboratorio = '${name_laboratorio}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  existente_product_name(product_name) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT * FROM nombre_producto WHERE product_name = '${product_name}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  existente_principio_active(principio_activo) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT * FROM principio_activo WHERE principio_activo = '${principio_activo}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  /* EDITAR - MODIFICAR - ACTUALIZAR */
  cambiar_status_producto(id_producto, estado) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `UPDATE productos SET estado = '${estado}' WHERE id_producto = '${id_producto}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  cambiar_cantidad_de_unidades_producto(id_producto, cantidad) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `UPDATE productos SET cantidad_disponible = ${cantidad} WHERE id_producto = '${id_producto}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  editar_principio_activo(id_principio_activo, principio_activo) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `UPDATE principio_activo SET principio_activo = '${principio_activo}' WHERE id_principio_activo = ${id_principio_activo}`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  editar_product_name(id_name_producto, name_product) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `UPDATE nombre_producto SET product_name = '${name_product}' WHERE id_product_name = ${id_name_producto}`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  editar_laboratorio_name(id_name_laboratorio, name_laboratorio) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `UPDATE nombre_laboratorio SET nombre_laboratorio = '${name_laboratorio}' WHERE id_name_laboratorio = ${id_name_laboratorio}`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  editar_producto_complete(Producto) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `UPDATE productos SET id_nombre_producto = ${Producto.id_name_product}, id_nombre_laboratorio = ${Producto.id_name_laboratorio}, cantidad = ${Producto.cantidad}, presentacion = '${Producto.presentacion}', lote = '${Producto.lote}', registro_sanitario = '${Producto.registro_sanitario}', medida = ${Producto.dosis}, tipo_medida = '${Producto.tipo_dosis}', fecha_elaboracion = '${Producto.fecha_elaboracion}', fecha_caducidad = '${Producto.fecha_caducidad}', pvp = ${Producto.pvp}, pvf = ${Producto.pvf}, id_principio_activo = ${Producto.id_principio_activo}, cantidad_disponible = ${Producto.cantidad_disponible} WHERE id_producto = '${Producto.id_producto}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  /* DELETE - ELIMINAR - BORRAR */
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
  eliminar_principio_activo(id_principio_activo) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `DELETE FROM principio_activo WHERE id_principio_activo = ${id_principio_activo}`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  eliminar_name_product(id_name_product) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `DELETE FROM nombre_producto WHERE id_product_name = ${id_name_product}`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  eliminar_name_laboratorio(id_name_laboratorio) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `DELETE FROM nombre_laboratorio WHERE id_name_laboratorio = ${id_name_laboratorio}`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
}
let Store = new StoreProduct();
exports.default = Store;
