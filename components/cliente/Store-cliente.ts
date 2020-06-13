import database from "../../db";
import { Cliente_INT } from "../../interface/index";

class StoreClient {
  async add_cliente(Cliente: Cliente_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO cliente (id_cliente, nombres, apellidos, identificacion, correo, direccion) VALUES ('${Cliente.id_cliente}', '${Cliente.nombre}', '${Cliente.apellido}', ${Cliente.identificacion}, '${Cliente.correo}', '${Cliente.direccion}')`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async listar_clientes(): Promise<Cliente_INT> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM cliente ORDER BY id_cliente DESC`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async validar_cliente_existente(
    identificacion: string,
    correo: string
  ): Promise<Cliente_INT> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM cliente WHERE identificacion = ${identificacion} OR correo = '${correo}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async borrar_cliente(id_cliente: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM cliente WHERE id_cliente = '${id_cliente}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }
}

let Store = new StoreClient();
export default Store;