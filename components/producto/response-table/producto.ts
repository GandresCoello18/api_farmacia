import database from "../../../db";

class Response {
  async responder_producto(id__product: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT productos.id_producto, productos.cantidad, productos.cantidad_disponible, productos.presentacion, productos.estado, productos.lote, productos.pvp, productos.pvf, productos.registro_sanitario, productos.medida, productos.tipo_medida, productos.fecha_elaboracion, productos.fecha_caducidad, nombre_producto.product_name, nombre_laboratorio.nombre_laboratorio, principio_activo.principio_activo FROM productos INNER JOIN nombre_producto ON nombre_producto.id_product_name = productos.id_nombre_producto INNER JOIN nombre_laboratorio ON nombre_laboratorio.id_name_laboratorio = productos.id_nombre_laboratorio INNER JOIN principio_activo ON principio_activo.id_principio_activo = productos.id_principio_activo WHERE id_producto  = '${id__product}' ORDER BY nombre_producto.product_name DESC `,
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
