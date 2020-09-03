import database from "../../db";
import { Factura_INT } from "../../interface/index";

class StoreFactura {
  /* CREAR - INSERTAR - POST */

  async add_factura(Factura: Factura_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO factura (id_factura, id_cliente, fecha_factura, descripcion_f, descuento, total, efectivo, cambio) VALUES ('${Factura.id_factura}', '${Factura.id_cliente}', '${Factura.fecha_factura}', '${Factura.descripcion}', ${Factura.descuento}, ${Factura.total}, ${Factura.efectivo}, ${Factura.cambio})`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* SELECT - MOSTRAR - CONSULTA */

  async traer_facturas(): Promise<Factura_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT factura.id_factura, factura.fecha_factura, factura.descripcion_f, factura.descuento, factura.total, factura.efectivo, factura.cambio, cliente.nombres, cliente.apellidos, cliente.correo, cliente.identificacion FROM factura INNER JOIN cliente ON cliente.id_cliente = factura.id_cliente ORDER BY factura.id_factura DESC;`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async monto_total_por_fecha(fecha: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT SUM(total) as total, COUNT(id_factura) as cantidad FROM factura WHERE fecha_factura LIKE "%${fecha}%"`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* DELETE - ELIMINAR - BORRAR */

  async eliminar_factura(id_factura: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM factura WHERE id_factura = '${id_factura}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }
}

let Store = new StoreFactura();
export default Store;
