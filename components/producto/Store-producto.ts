import database from "../../db";
import { Producto_INT } from "../../interface/index";

class StorNameProduct {
  async add_name_product(name_product: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO nombre_producto (product_name) VALUES ('${name_product}')`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async add_name_laboratorio(name_laboratorio: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO nombre_laboratorio (nombre_laboratorio) VALUES ('${name_laboratorio}')`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async add_principio_activo(name_principio_activo: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO principio_activo (principio_activo) VALUES ('${name_principio_activo}')`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async listar_principio_activo() {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM principio_activo ORDER BY id_principio_activo DESC`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async listar_name_producto() {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM nombre_producto ORDER BY id_product_name DESC`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async listar_name_laboratorio() {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM nombre_laboratorio ORDER BY id_name_laboratorio DESC`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async add_product(Producto: Producto_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO productos (id_producto, id_nombre_producto, id_nombre_laboratorio, cantidad, presentacion, lote, registro_sanitario, medida, tipo_medida, fecha_elaboracion, fecha_caducidad, pvp, pvf, estado, id_principio_activo) VALUES ('${Producto.id_producto}', ${Producto.id_name_product}, ${Producto.id_name_laboratorio}, ${Producto.cantidad}, '${Producto.presentacion}', '${Producto.lote}', '${Producto.registro_sanitario}', ${Producto.dosis}, '${Producto.tipo_dosis}', '${Producto.fecha_elaboracion}', '${Producto.fecha_caducidad}', ${Producto.pvp}, ${Producto.pvf}, ${Producto.estado}, ${Producto.id_principio_activo})`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async listar_producto(): Promise<Producto_INT> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT productos.id_producto, productos.cantidad, productos.presentacion, productos.estado, productos.lote, productos.pvp, productos.pvf, productos.registro_sanitario, productos.medida, productos.tipo_medida, productos.fecha_elaboracion, productos.fecha_caducidad, nombre_producto.product_name, nombre_laboratorio.nombre_laboratorio, principio_activo.principio_activo FROM productos INNER JOIN nombre_producto ON nombre_producto.id_product_name = productos.id_nombre_producto INNER JOIN nombre_laboratorio ON nombre_laboratorio.id_name_laboratorio = productos.id_nombre_laboratorio INNER JOIN principio_activo ON principio_activo.id_principio_activo = productos.id_principio_activo ORDER BY productos.id_producto DESC;`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async eliminar_producto(id_producto: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM productos WHERE id_producto = '${id_producto}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }
}

let Store = new StorNameProduct();
export default Store;
