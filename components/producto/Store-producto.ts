import database from "../../db";

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
}

let Store = new StorNameProduct();
export default Store;
