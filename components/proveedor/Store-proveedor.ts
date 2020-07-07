import database from "../../db";
import { Proveedor_INT } from "../../interface/index";

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
}

let Store = new StoreProveedor();
export default Store;
