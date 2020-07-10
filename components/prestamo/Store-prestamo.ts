import database from "../../db";
import { Prestamo_INT } from "../../interface/index";

class StorePrestamos {
  /* INSERTAR - POST - CREAR */

  async add_prestamos(Prestamo: Prestamo_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO prestamos (id_prestamo, descripcion_prestamo, fecha_prestamo, cantidad_prestamo) VALUES ('${Prestamo.id_prestamo}', '${Prestamo.descripcion_prestamo}', '${Prestamo.fecha_prestamo}', ${Prestamo.cantidad_prestamo})`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* SELECT - CONSULTA - MOSTRAR */

  async mostrar_prestamos(): Promise<Prestamo_INT> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM prestamos ORDER BY id_prestamo DESC`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async mostrar_prestamos_por_fecha(fecha: string): Promise<Prestamo_INT> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM prestamos WHERE fecha_prestamo LIKE "%${fecha}%"`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* MODIFICAR - ACTUALIZAR - PUT */

  async edit_prestamos(Prestamo: Prestamo_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE prestamos SET descripcion_prestamo = '${Prestamo.descripcion_prestamo}', cantidad_prestamo = ${Prestamo.cantidad_prestamo} WHERE id_prestamo = '${Prestamo.id_prestamo}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* DELETE - ELIMINAR - REMOVER */

  async eliminar_prestamos(id_prestamo: string): Promise<Prestamo_INT> {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM prestamos WHERE id_prestamo = '${id_prestamo}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }
}

let Store = new StorePrestamos();
export default Store;
