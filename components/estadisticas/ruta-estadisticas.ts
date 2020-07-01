import { Request, Response, Router } from "express";
import Store from "./Store-estadisticas";
import Respuesta from "../../network/response";
const { comprobar } = require("../util/util-login");
import Fecha from "../util/util-fecha";

class Estadisticas {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  ventas_por_dia(req: Request, res: Response) {
    const { fecha } = req.params || null;

    Store.traer_ventas_por_dia(fecha)
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error en traer facturas");
      });
  }

  ruta() {
    this.router.get("/:fecha", this.ventas_por_dia);
  }
}

let estadisticas = new Estadisticas();
export default estadisticas.router;
