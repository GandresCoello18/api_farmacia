import database from "../../db";
import { Proveedor_INT, Producto_proveedor_INT } from "../../interface/index";

class StoreProveedor {
  /* CREAR - INSERTAR - POST */

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

  async add_product_proveedor(PP: Producto_proveedor_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO producto_proveedor (id_product_proveedor, descripcion, fecha_pago, total, id_proveedor, fecha_ingreso, estado_pp, abonado) VALUES ('${PP.id_product_proveedor}', '${PP.descripcion}', '${PP.fecha_pago}', ${PP.total}, '${PP.id_proveedor}', '${PP.fecha_ingreso}', '${PP.estado_pp}', ${PP.abono})`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* MOSTRAR - CONSULTAR - SELECT */

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

  async mostrar_product_proveedor(): Promise<Producto_proveedor_INT> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT producto_proveedor.id_product_proveedor, producto_proveedor.descripcion, producto_proveedor.fecha_pago, producto_proveedor.total, producto_proveedor.fecha_ingreso, producto_proveedor.id_proveedor, producto_proveedor.estado_pp, producto_proveedor.abonado, proveedores.nombres, proveedores.correo, nombre_laboratorio.nombre_laboratorio FROM producto_proveedor INNER JOIN proveedores ON proveedores.id_proveedores = producto_proveedor.id_proveedor INNER JOIN nombre_laboratorio ON nombre_laboratorio.id_name_laboratorio = proveedores.id_laboratorio;`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async mostrar_unico_product_proveedor(
    id_product_proveedor: string
  ): Promise<Producto_proveedor_INT> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM producto_proveedor WHERE id_product_proveedor = '${id_product_proveedor}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* DELETE - ELIMINAR - BORRAR */

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

  /* EDITAR - MODIFICAR - ACTUALIZAR */

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

  async editar_product_proveedor(
    descripcion: string,
    fecha_pago: string,
    total: number,
    estado_pp: string,
    abonado: number,
    id_producto_proveedor: string
  ) {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE producto_proveedor SET descripcion = '${descripcion}', fecha_pago = '${fecha_pago}', total = ${total}, estado_pp = '${estado_pp}', abonado = ${abonado} WHERE id_product_proveedor = '${id_producto_proveedor}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async pago_product_proveedor(
    id_producto_proveedor: string,
    total: number,
    fecha_pago: string
  ) {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE producto_proveedor SET estado_pp = 'Pagado', abonado = ${total}, fecha_pago = '${fecha_pago}' WHERE id_product_proveedor = '${id_producto_proveedor}' `,
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
