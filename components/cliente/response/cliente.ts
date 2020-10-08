import database from "../../../db";

class Response {
  async responder_cliente(id_cliente: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM cliente WHERE id_cliente = '${id_cliente}' `,
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
