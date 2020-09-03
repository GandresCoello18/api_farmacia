import database from "../../db";
import { Producto_Factura_INT } from "../../interface/index";

class StoreVenta {
  /* INSERTAR - POST - CREAR */

  async add_venta(Venta: Producto_Factura_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO producto_factura (id_producto_fac, id_producto, id_factura, formato, cantidad, item_total, iva) VALUES ('${Venta.id_producto_fac}', '${Venta.id_producto}', '${Venta.id_factura}', '${Venta.formato}', ${Venta.cantidad}, ${Venta.item_total}, ${Venta.iva})`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* SELECT - MOSTRAR - CONSULTAR */

  async traer_venta(id_factura: string): Promise<Producto_Factura_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT producto_factura.id_producto_fac, producto_factura.id_factura, producto_factura.formato, producto_factura.cantidad as fact_cant, producto_factura.item_total, producto_factura.iva as iva_product_fact, productos.cantidad, productos.presentacion, productos.lote, productos.registro_sanitario, productos.medida, productos.tipo_medida, productos.pvp, productos.estado, nombre_producto.product_name, nombre_laboratorio.nombre_laboratorio, principio_activo.principio_activo FROM producto_factura INNER JOIN factura ON factura.id_factura =  producto_factura.id_factura INNER JOIN productos ON productos.id_producto = producto_factura.id_producto INNER JOIN nombre_producto ON nombre_producto.id_product_name = productos.id_nombre_producto INNER JOIN nombre_laboratorio ON nombre_laboratorio.id_name_laboratorio = productos.id_nombre_laboratorio INNER JOIN principio_activo ON principio_activo.id_principio_activo = productos.id_principio_activo WHERE producto_factura.id_factura = '${id_factura}';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* ELIMINAT - BORRAR - DELETE */

  async eliminar_venta(id_producto_fac: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM producto_factura WHERE id_producto_fac = '${id_producto_fac}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }
}

let Store = new StoreVenta();
export default Store;
