import database from "../../db";
import { Email_INT } from "../../interface/index";

class StoreEmail {
  /* INSERTAR - CREAR - POST */

  async crear_hash(Hash: Email_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO verificar_email (id_user, hash) VALUES ('${Hash.id_user}','${Hash.hash}')`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* MOSTRAR - CONSULTAR - SELECT */

  async veridicar_email(email: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT email_on FROM usuarios WHERE email = '${email}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async verificar_hash(hash: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT id_user FROM verificar_email WHERE hash = '${hash}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async validar_id_user_existente(id_user: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM verificar_email WHERE id_user = '${id_user}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* ELIMINAR - BORRAR - DELETE */

  async borrar_hash(id_user: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM verificar_email WHERE id_user = '${id_user}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }
}

let email = new StoreEmail();
export default email;
