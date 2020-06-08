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
        `INSERT INTO productos (id_producto, imagen, id_nombre_producto, id_nombre_laboratorio, cantidad, presentacion, lote, registro_sanitario, dosis, tipo_dosis, fecha_elaboracion, fecha_caducidad) VALUES ('${Producto.id_producto}', '${Producto.imagen}', ${Producto.id_name_product}, ${Producto.id_name_laboratorio}, ${Producto.cantidad}, '${Producto.presentacion}', '${Producto.lote}', '${Producto.registro_sanitario}', ${Producto.dosis}, '${Producto.tipo_dosis}', '${Producto.fecha_elaboracion}', '${Producto.fecha_caducidad}')`,
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
