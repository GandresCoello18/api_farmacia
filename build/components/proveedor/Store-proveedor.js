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
class StoreProveedor {
  /* CREAR - INSERTAR - POST */
  add_proveedor(Proveedor) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `INSERT INTO proveedores (id_proveedores, id_laboratorio, correo, telefono, nombres) VALUES ('${Proveedor.id_proveedor}', ${Proveedor.id_laboratorio}, '${Proveedor.correo}', ${Proveedor.telefono}, '${Proveedor.nombres}')`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  add_product_proveedor(PP) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `INSERT INTO producto_proveedor (id_product_proveedor, descripcion, fecha_pago, total, id_proveedor, fecha_ingreso, estado_pp, abonado) VALUES ('${PP.id_product_proveedor}', '${PP.descripcion}', '${PP.fecha_pago}', ${PP.total}, '${PP.id_proveedor}', '${PP.fecha_ingreso}', '${PP.estado_pp}', ${PP.abono})`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  /* MOSTRAR - CONSULTAR - SELECT */
  mostrar_proveedor() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT * FROM proveedores INNER JOIN nombre_laboratorio ON nombre_laboratorio.id_name_laboratorio = proveedores.id_laboratorio ORDER BY id_proveedores DESC`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  mostrar_product_proveedor() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT producto_proveedor.id_product_proveedor, producto_proveedor.descripcion, producto_proveedor.fecha_pago, producto_proveedor.total, producto_proveedor.fecha_ingreso, producto_proveedor.id_proveedor, producto_proveedor.estado_pp, producto_proveedor.abonado, proveedores.nombres, proveedores.correo, nombre_laboratorio.nombre_laboratorio FROM producto_proveedor INNER JOIN proveedores ON proveedores.id_proveedores = producto_proveedor.id_proveedor INNER JOIN nombre_laboratorio ON nombre_laboratorio.id_name_laboratorio = proveedores.id_laboratorio;`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  mostrar_unico_product_proveedor(id_product_proveedor) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT * FROM producto_proveedor WHERE id_product_proveedor = '${id_product_proveedor}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  mostrar_monto_total_product_proveedor(fecha) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT SUM(total) as total, COUNT(id_product_proveedor) as count FROM producto_proveedor WHERE fecha_pago LIKE '%${fecha}%' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  /* DELETE - ELIMINAR - BORRAR */
  eliminar_proveedor(id_proveedor) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `DELETE FROM proveedores WHERE id_proveedores = '${id_proveedor}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  eliminar_product_proveedor(id_producto_proveedor) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `DELETE FROM producto_proveedor WHERE id_product_proveedor = '${id_producto_proveedor}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  /* EDITAR - MODIFICAR - ACTUALIZAR */
  editar_proveedor(Proveedor) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `UPDATE proveedores SET nombres = '${Proveedor.nombres}', id_laboratorio = ${Proveedor.id_laboratorio}, correo = '${Proveedor.correo}', telefono = '${Proveedor.telefono}'  WHERE id_proveedores = '${Proveedor.id_proveedor}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  editar_product_proveedor(
    descripcion,
    fecha_pago,
    total,
    estado_pp,
    abonado,
    id_producto_proveedor
  ) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `UPDATE producto_proveedor SET descripcion = '${descripcion}', fecha_pago = '${fecha_pago}', total = ${total}, estado_pp = '${estado_pp}', abonado = ${abonado} WHERE id_product_proveedor = '${id_producto_proveedor}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  pago_product_proveedor(id_producto_proveedor, total, fecha_pago) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `UPDATE producto_proveedor SET estado_pp = 'Pagado', abonado = ${total}, fecha_pago = '${fecha_pago}' WHERE id_product_proveedor = '${id_producto_proveedor}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
}
let Store = new StoreProveedor();
exports.default = Store;
