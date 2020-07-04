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
class StoreUsuario {
  insertar_usuario(user) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `INSERT INTO usuarios (id_user, nombres, apellidos, foto, tipo_user, email, email_on, password) VALUES ('${user.id_user}', '${user.nombres}', '${user.apellidos}', '${user.foto}', '${user.tipo}', '${user.email}', ${user.email_on}, '${user.password}')`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  validar_usuario_existente(email) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT * FROM usuarios WHERE email = '${email}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  consultar_usuarios() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(`SELECT * FROM usuarios`, (err, data) => {
          if (err) return reject(err);
          resolve(data);
        });
      });
    });
  }
  consulta_usuario(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT * FROM usuarios WHERE id_user = '${id}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  editar_usuario(id, nombres, apellidos, email_on) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `UPDATE usuarios SET nombres = '${nombres}', apellidos = '${apellidos}', email_on = ${email_on} WHERE id_user = '${id}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  eliminar_usuario(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `DELETE FROM usuarios WHERE id_user = '${id}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  verificar_email(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `UPDATE usuarios SET email_on = 1 WHERE id_user = '${id}' `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  create_history_session(History) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `INSERT INTO historial_session (id_user, fecha_session) VALUES ('${History.id_user}', '${History.fecha_session}') `,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  listar_history_session(limite) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        if (limite) {
          db_1.default.query(
            `SELECT historial_session.id_historial_session, historial_session.fecha_session, usuarios.nombres, usuarios.apellidos, usuarios.foto, usuarios.tipo_user, usuarios.email FROM historial_session INNER JOIN usuarios on usuarios.id_user = historial_session.id_user ORDER BY historial_session.id_historial_session DESC LIMIT ${limite};`,
            (err, data) => {
              if (err) return reject(err);
              resolve(data);
            }
          );
        } else {
          db_1.default.query(
            `SELECT historial_session.id_historial_session, historial_session.fecha_session, usuarios.nombres, usuarios.apellidos, usuarios.foto, usuarios.tipo_user, usuarios.email FROM historial_session INNER JOIN usuarios on usuarios.id_user = historial_session.id_user ORDER BY historial_session.id_historial_session DESC;`,
            (err, data) => {
              if (err) return reject(err);
              resolve(data);
            }
          );
        }
      });
    });
  }
  traer_ultimo_historial() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `SELECT * FROM historial_session ORDER BY fecha_session DESC LIMIT 1;`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
  clean_history_session(id_historial_session) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        db_1.default.query(
          `DELETE FROM historial_session WHERE id_historial_session <> ${id_historial_session}`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      });
    });
  }
}
let store = new StoreUsuario();
exports.default = store;
