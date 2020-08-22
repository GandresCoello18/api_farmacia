import database from "../../../db";

class Response {
  async responder_nombre_producto(name_product: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM nombre_producto WHERE product_name = '${name_product}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async responder_nombre_laboratorio(nombre_laboratorio: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM nombre_laboratorio WHERE nombre_laboratorio = '${nombre_laboratorio}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async responder_principio_activo(principio_activo: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM principio_activo WHERE principio_activo = '${principio_activo}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }
}

const response = new Response();
export default response;
