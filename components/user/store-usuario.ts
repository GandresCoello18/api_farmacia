import database from "../../db";
import fechas from "../util/util-fecha";
import { Usuario_INT, History_session_INT } from "../../interface/index";

class StoreUsuario {
  async insertar_usuario(user: Usuario_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO usuarios (id_user, nombres, apellidos, foto, tipo_user, email, email_on, password) VALUES ('${user.id_user}', '${user.nombres}', '${user.apellidos}', '${user.foto}', '${user.tipo}', '${user.email}', ${user.email_on}, '${user.password}')`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async validar_usuario_existente(email: String) {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM usuarios WHERE email = '${email}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consultar_usuarios() {
    return await new Promise((resolve, reject) => {
      database.query(`SELECT * FROM usuarios`, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  async consulta_usuario(id: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM usuarios WHERE id_user = '${id}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async editar_usuario(
    id: string,
    nombres: string,
    apellidos: string,
    foto: string
  ) {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE usuarios SET nombres = '${nombres}', apellidos = '${apellidos}', foto = '${foto}' WHERE id_user = '${id}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async eliminar_usuario(id: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM usuarios WHERE id_user = '${id}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async verificar_email(id: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE usuarios SET email_on = 1 WHERE id_user = '${id}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async create_history_session(History: History_session_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO historial_session (id_user, fecha_session) VALUES ('${History.id_user}', '${History.fecha_session}') `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async listar_history_session(limite: any) {
    return await new Promise((resolve, reject) => {
      if (limite) {
        database.query(
          `SELECT historial_session.id_historial_session, historial_session.fecha_session, usuarios.nombres, usuarios.apellidos, usuarios.foto, usuarios.email FROM historial_session INNER JOIN usuarios on usuarios.id_user = historial_session.id_user ORDER BY historial_session.id_historial_session DESC LIMIT ${limite};`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      } else {
        database.query(
          `SELECT historial_session.id_historial_session, historial_session.fecha_session, usuarios.nombres, usuarios.apellidos, usuarios.foto, usuarios.email FROM historial_session INNER JOIN usuarios on usuarios.id_user = historial_session.id_user ORDER BY historial_session.id_historial_session DESC;`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      }
    });
  }
}

let store = new StoreUsuario();

export default store;
