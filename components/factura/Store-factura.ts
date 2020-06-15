import database from "../../db";
import { Factura_INT } from "../../interface/index";

class StoreFactura {
  async add_factura(Factura: Factura_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO factura (id_factura, id_cliente, fecha_factura, descripcion_f, descuento, iva, total, efectivo, cambio) VALUES ('${Factura.id_factura}', '${Factura.id_cliente}', '${Factura.fecha_factura}', '${Factura.descripcion}', ${Factura.descuento}, ${Factura.iva}, ${Factura.total}, ${Factura.efectivo}, ${Factura.cambio})`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async traer_facturas(): Promise<Factura_INT> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT factura.id_factura, factura.fecha_factura, factura.descripcion_f, factura.descuento, factura.iva, factura.total, cliente.correo, cliente.identificacion FROM factura INNER JOIN cliente ON cliente.id_cliente = factura.id_cliente ORDER BY factura.id_factura DESC;`,
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
