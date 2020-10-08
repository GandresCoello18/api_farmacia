import database from "../../../db";
import { Factura_INT } from "../../../interface";

class Response {
  async responder_factura(id_factura: string): Promise<Factura_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT factura.id_factura, factura.fecha_factura, factura.descripcion_f, factura.descuento, factura.total, factura.efectivo, factura.cambio, cliente.nombres, cliente.apellidos, cliente.correo, cliente.identificacion FROM factura INNER JOIN cliente ON cliente.id_cliente = factura.id_cliente WHERE factura.id_factura = '${id_factura}' `,
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
