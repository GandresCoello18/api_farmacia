import { Request, Response, Router } from "express";
import Store from "./Store-producto";
import Respuesta from "../../network/response";
const { comprobar } = require("../util/util-login");

class Producto {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  async create_name_product(req: Request, res: Response) {
    const { name_product } = req.body || null;

    Store.add_name_product(name_product)
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error en crear name_product");
      });
  }

  ruta() {
    this.router.post("/nombre_producto", comprobar, this.create_name_product);
  }
}

let producto = new Producto();
export default producto.router;
