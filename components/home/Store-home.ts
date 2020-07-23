import database from "../../db";
import id from "shortid";

class StoreHome {
  /* INSERT - CREAR - POST */

  async crear_access_code(tipo: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO access_code (code, tipo) VALUES ('${id.generate()}', '${tipo}')`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* MOSTRAR - CONSULTAR - SELECT */

  async list_access_code() {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM access_code ORDER BY id_access DESC`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async verificar_code(code: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM access_code WHERE code = '${code}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* ELIMINAR - BORRAR - DELETE */

  async eliminar_access_code(removeID: any) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM access_code WHERE id_access = ${removeID}`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }
}

let Store = new StoreHome();
export default Store;
