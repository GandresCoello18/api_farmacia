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
class StoreClient {
  /* CREAR - POST - INSERTAR  */
  add_cliente(Cliente) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `INSERT INTO cliente (id_cliente, nombres, apellidos, identificacion, correo, direccion) VALUES ('${Cliente.id_cliente}', '${Cliente.nombre}', '${Cliente.apellido}', ${Cliente.identificacion}, '${Cliente.correo}', '${Cliente.direccion}')`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  /* CONSULTAS - SELECT - MOSTRAR - TRAER */
  listar_clientes() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT * FROM cliente WHERE id_cliente <> 'b1fd154a-d4a2-42a0-b7a1-e4e6b0ffa479' ORDER BY id_cliente DESC`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  validar_cliente_existente(identificacion, correo) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT * FROM cliente WHERE identificacion = ${identificacion} OR correo = '${correo}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  /* EDITAR- ACTUALIZAR - MODIFICAR */
  editar_cliente(Cliente) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `UPDATE cliente SET nombres = '${Cliente.nombre}', apellidos = '${Cliente.apellido}', identificacion = '${Cliente.identificacion}', correo = '${Cliente.correo}' WHERE id_cliente = '${Cliente.id_cliente}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  /* ELIMINAR - BORRAR - DELETE */
  borrar_cliente(id_cliente) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `DELETE FROM cliente WHERE id_cliente = '${id_cliente}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
}
let Store = new StoreClient();
exports.default = Store;
