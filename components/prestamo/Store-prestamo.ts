import database from "../../db";
import { Prestamo_INT } from "../../interface/index";

class StorePrestamos {
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
}

let Store = new StorePrestamos();
export default Store;
