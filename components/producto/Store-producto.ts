import database from "../../db";
import { Producto_INT } from "../../interface/index";

class StoreProduct {
  /* INSERTAR - POST - CREAR */

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

  async add_product(Producto: Producto_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO productos (id_producto, id_nombre_producto, id_nombre_laboratorio, cantidad, presentacion, lote, registro_sanitario, medida, tipo_medida, fecha_elaboracion, fecha_caducidad, pvp, pvf, estado, id_principio_activo) VALUES ('${Producto.id_producto}', ${Producto.id_name_product}, ${Producto.id_name_laboratorio}, ${Producto.cantidad}, '${Producto.presentacion}', '${Producto.lote}', '${Producto.registro_sanitario}', ${Producto.dosis}, '${Producto.tipo_dosis}', '${Producto.fecha_elaboracion}', '${Producto.fecha_caducidad}', ${Producto.pvp}, ${Producto.pvf}, '${Producto.estado}', ${Producto.id_principio_activo})`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* SELECT - MOSTRAR - CONSULTAR */

  async listar_principio_activo() {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM principio_activo WHERE principio_activo <> "none" ORDER BY id_principio_activo DESC`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async search_princt_activ_none() {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM principio_activo WHERE principio_activo = "none" `,
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

  async producto_unico(id_producto: string): Promise<Producto_INT> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM productos WHERE id_producto = '${id_producto}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  //////////////////////////////  validar registros existentes

  async existente_laboratorio_name(name_laboratorio: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM nombre_laboratorio WHERE nombre_laboratorio = '${name_laboratorio}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async existente_product_name(product_name: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM nombre_producto WHERE product_name = '${product_name}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async existente_principio_active(principio_activo: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM principio_activo WHERE principio_activo = '${principio_activo}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* EDITAR - MODIFICAR - ACTUALIZAR */

  async cambiar_status_producto(id_producto: string, estado: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE productos SET estado = '${estado}' WHERE id_producto = '${id_producto}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async cambiar_cantidad_de_unidades_producto(
    id_producto: string,
    cantidad: number
  ) {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE productos SET cantidad = ${cantidad} WHERE id_producto = '${id_producto}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async editar_principio_activo(
    id_principio_activo: number,
    principio_activo: string
  ) {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE principio_activo SET principio_activo = '${principio_activo}' WHERE id_principio_activo = ${id_principio_activo}`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async editar_product_name(id_name_producto: number, name_product: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE nombre_producto SET product_name = '${name_product}' WHERE id_product_name = ${id_name_producto}`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async editar_laboratorio_name(
    id_name_laboratorio: number,
    name_laboratorio: string
  ) {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE nombre_laboratorio SET nombre_laboratorio = '${name_laboratorio}' WHERE id_name_laboratorio = ${id_name_laboratorio}`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async editar_producto_complete(Producto: Producto_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE productos SET id_nombre_producto = ${Producto.id_name_product}, id_nombre_laboratorio = ${Producto.id_name_laboratorio}, cantidad = ${Producto.cantidad}, presentacion = '${Producto.presentacion}', lote = '${Producto.lote}', registro_sanitario = '${Producto.registro_sanitario}', medida = ${Producto.dosis}, tipo_medida = '${Producto.tipo_dosis}', fecha_elaboracion = '${Producto.fecha_elaboracion}', fecha_caducidad = '${Producto.fecha_caducidad}', pvp = ${Producto.pvp}, pvf = ${Producto.pvf}, id_principio_activo = ${Producto.id_principio_activo} WHERE id_producto = '${Producto.id_producto}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* DELETE - ELIMINAR - BORRAR */

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

  async eliminar_principio_activo(id_principio_activo: number) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM principio_activo WHERE id_principio_activo = ${id_principio_activo}`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async eliminar_name_product(id_name_product: number) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM nombre_producto WHERE id_product_name = ${id_name_product}`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async eliminar_name_laboratorio(id_name_laboratorio: number) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM nombre_laboratorio WHERE id_name_laboratorio = ${id_name_laboratorio}`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }
}

let Store = new StoreProduct();
export default Store;
