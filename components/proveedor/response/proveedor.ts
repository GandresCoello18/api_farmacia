import database from "../../../db";
import { Proveedor_INT } from "../../../interface";

class Response {
  async responder_proveedor(id_proveedor: string): Promise<Proveedor_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM proveedores INNER JOIN nombre_laboratorio ON nombre_laboratorio.id_name_laboratorio = proveedores.id_laboratorio WHERE proveedores.id_proveedores = '${id_proveedor}' `,
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
