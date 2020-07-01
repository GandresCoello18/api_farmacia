import database from "../../db";

class StoreEstadisticas {
  async traer_ventas_por_dia(fecha: string) {
    return await new Promise((resolve, reject) => {
      database.query(`SELECT * FROM factura`, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }
}

let Store = new StoreEstadisticas();
export default Store;
