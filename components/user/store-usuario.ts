import database from "../../db";
import { Usuario_INT, History_session_INT } from "../../interface/index";

class StoreUsuario {
  /* INSERTAR - POST - CREAR */

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

  /* SELECT - MOSTRAR - CONSULTAR */

  async validar_usuario_existente(email: String): Promise<Usuario_INT> {
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

  async consultar_usuarios(): Promise<Usuario_INT> {
    return await new Promise((resolve, reject) => {
      database.query(`SELECT * FROM usuarios`, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  async consulta_usuario(id: string): Promise<Usuario_INT> {
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

  async listar_history_session(limite: number) {
    return await new Promise((resolve, reject) => {
      if (limite) {
        database.query(
          `SELECT historial_session.id_historial_session, historial_session.fecha_session, usuarios.nombres, usuarios.apellidos, usuarios.foto, usuarios.tipo_user, usuarios.email FROM historial_session INNER JOIN usuarios on usuarios.id_user = historial_session.id_user ORDER BY historial_session.id_historial_session DESC LIMIT ${limite};`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      } else {
        database.query(
          `SELECT historial_session.id_historial_session, historial_session.fecha_session, usuarios.nombres, usuarios.apellidos, usuarios.foto, usuarios.tipo_user, usuarios.email FROM historial_session INNER JOIN usuarios on usuarios.id_user = historial_session.id_user ORDER BY historial_session.id_historial_session DESC;`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      }
    });
  }

  async traer_ultimo_historial(): Promise<History_session_INT> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM historial_session ORDER BY fecha_session DESC LIMIT 1;`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* PUT - MODIFICAR - ACTUALIZAR */

  async editar_usuario(
    id: string,
    nombres: string,
    apellidos: string,
    email_on: Boolean,
    tipo_user: string
  ) {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE usuarios SET nombres = '${nombres}', apellidos = '${apellidos}', email_on = ${email_on}, tipo_user = '${tipo_user}' WHERE id_user = '${id}' `,
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

  /* DELETE - BORRAR - ELIMINAR */

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

  async clean_history_session(id_historial_session: number) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM historial_session WHERE id_historial_session <> ${id_historial_session}`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }
}

let store = new StoreUsuario();
export default store;
