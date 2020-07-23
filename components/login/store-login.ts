import database from "../../db";

class Store {
  /* SELECT - MOSTRAR - CONSULTA */

  async validar_credenciales(correo: String) {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM usuarios WHERE email = '${correo}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }
}

let store = new Store();
export default store;
