import { Request, Response, Router } from "express";
import Store from "./Store-factura";
import Respuesta from "../../network/response";
import { Factura_INT } from "../../interface/index";
const { comprobar } = require("../util/util-login");
import Fecha from "../util/util-fecha";
import { v4 as uuidv4 } from "uuid";

class Factura {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  crear_factura(req: Request, res: Response) {
    const {
      id_cliente,
      descripcion,
      descuento,
      iva,
      total,
      efectivo = 0,
      cambio = 0,
    } = req.body || null;

    const obj: Factura_INT = {
      id_factura: uuidv4(),
      id_cliente,
      fecha_factura: Fecha.fecha_con_hora_actual(),
      descripcion,
      descuento,
      iva,
      total,
      efectivo,
      cambio,
    };

    if (obj.id_cliente == "") {
      obj.id_cliente = "b1fd154a-d4a2-42a0-b7a1-e4e6b0ffa479";
    }
    if (obj.descripcion == "") obj.descripcion = "Sin descripcion";

    Store.add_factura(obj)
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error en crear factura");
      });
  }

  traer_facturas(req: Request, res: Response) {
    Store.traer_facturas()
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error en traer facturas");
      });
  }

  ruta() {
    this.router.post("/", this.crear_factura);
    this.router.get("/", this.traer_facturas);
  }
}

let cliente = new Factura();
export default cliente.router;
