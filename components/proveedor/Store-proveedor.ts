import database from "../../db";
import { Proveedor_INT, Producto_proveedor_INT } from "../../interface/index";

class StoreProveedor {
  async mostrar_proveedor(): Promise<Proveedor_INT> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM proveedores INNER JOIN nombre_laboratorio ON nombre_laboratorio.id_name_laboratorio = proveedores.id_laboratorio ORDER BY id_proveedores DESC`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async add_proveedor(Proveedor: Proveedor_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO proveedores (id_proveedores, id_laboratorio, correo, telefono, nombres) VALUES ('${Proveedor.id_proveedor}', ${Proveedor.id_laboratorio}, '${Proveedor.correo}', ${Proveedor.telefono}, '${Proveedor.nombres}')`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async eliminar_proveedor(id_proveedor: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM proveedores WHERE id_proveedores = '${id_proveedor}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async editar_proveedor(Proveedor: Proveedor_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE proveedores SET nombres = '${Proveedor.nombres}', id_laboratorio = ${Proveedor.id_laboratorio}, correo = '${Proveedor.correo}', telefono = '${Proveedor.telefono}'  WHERE id_proveedores = '${Proveedor.id_proveedor}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  ///////////////////////////////////

  async add_product_proveedor(PP: Producto_proveedor_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO producto_proveedor (id_product_proveedor, descripcion, fecha_pago, total, id_proveedor, fecha_ingreso, estado_pp) VALUES ('${PP.id_product_proveedor}', '${PP.descripcion}', '${PP.fecha_pago}', ${PP.total}, '${PP.id_proveedor}', '${PP.fecha_ingreso}', '${PP.estado_pp}')`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async mostrar_product_proveedor(): Promise<Producto_proveedor_INT> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT producto_proveedor.id_product_proveedor, producto_proveedor.descripcion, producto_proveedor.fecha_pago, producto_proveedor.total, producto_proveedor.fecha_ingreso, producto_proveedor.id_proveedor, producto_proveedor.estado_pp, proveedores.nombres, proveedores.correo, nombre_laboratorio.nombre_laboratorio FROM producto_proveedor INNER JOIN proveedores ON proveedores.id_proveedores = producto_proveedor.id_proveedor INNER JOIN nombre_laboratorio ON nombre_laboratorio.id_name_laboratorio = proveedores.id_laboratorio;`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async eliminar_product_proveedor(id_producto_proveedor: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM producto_proveedor WHERE id_product_proveedor = '${id_producto_proveedor}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async pago_product_proveedor(id_producto_proveedor: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE producto_proveedor SET estado_pp = 'Pagado' WHERE id_product_proveedor = '${id_producto_proveedor}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }
}

let Store = new StoreProveedor();
export default Store;
