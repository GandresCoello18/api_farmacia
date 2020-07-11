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
class StorePrestamos {
  /* INSERTAR - POST - CREAR */
  add_prestamos(Prestamo) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `INSERT INTO prestamos (id_prestamo, descripcion_prestamo, fecha_prestamo, cantidad_prestamo) VALUES ('${Prestamo.id_prestamo}', '${Prestamo.descripcion_prestamo}', '${Prestamo.fecha_prestamo}', ${Prestamo.cantidad_prestamo})`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  /* SELECT - CONSULTA - MOSTRAR */
  mostrar_prestamos() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT * FROM prestamos ORDER BY id_prestamo DESC`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  mostrar_prestamos_por_fecha(fecha) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT * FROM prestamos WHERE fecha_prestamo LIKE "%${fecha}%"`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  mostrar_monto_total_por_fecha(fecha) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT SUM(cantidad_prestamo) as total, COUNT(id_prestamo) as count FROM prestamos WHERE fecha_prestamo LIKE "%${fecha}%";`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  /* MODIFICAR - ACTUALIZAR - PUT */
  edit_prestamos(Prestamo) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `UPDATE prestamos SET descripcion_prestamo = '${Prestamo.descripcion_prestamo}', cantidad_prestamo = ${Prestamo.cantidad_prestamo} WHERE id_prestamo = '${Prestamo.id_prestamo}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  /* DELETE - ELIMINAR - REMOVER */
  eliminar_prestamos(id_prestamo) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `DELETE FROM prestamos WHERE id_prestamo = '${id_prestamo}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
}
let Store = new StorePrestamos();
exports.default = Store;
