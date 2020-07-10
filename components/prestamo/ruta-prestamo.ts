import { Request, Response, Router } from "express";
import Store from "./Store-prestamo";
import Respuesta from "../../network/response";
import Fecha from "../util/util-fecha";
import { Prestamo_INT } from "../../interface/index";
const { comprobar } = require("../util/util-login");
import id from "shortid";

class Proveedor {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  mostrar_prestamos(req: Request, res: Response) {
    Store.mostrar_prestamos()
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error en mostrar prestamos");
      });
  }

  mostrar_prestamo_por_fecha(req: Request, res: Response) {
    const { fecha } = req.params || null;

    Store.mostrar_prestamos_por_fecha(fecha)
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error en traer prestamo de hoy");
      });
  }

  crear_prestamo(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { descripcion_prestamo, cantidad_prestamo } = req.body || null;

      const obj: Prestamo_INT = {
        id_prestamo: id.generate(),
        descripcion_prestamo,
        fecha_prestamo: Fecha.fecha_con_hora_actual(),
        cantidad_prestamo: Number(cantidad_prestamo),
      };

      Store.add_prestamos(obj)
        .then((data) => {
          Respuesta.success(req, res, data, 200);
        })
        .catch((err) => {
          Respuesta.error(req, res, err, 500, "Error al crear prestamo");
        });
    } else {
      Respuesta.success(
        req,
        res,
        { feeback: "No tienes permisos para estan accion" },
        200
      );
    }
  }

  ruta() {
    this.router.get("/fecha/:fecha", this.mostrar_prestamo_por_fecha);
    this.router.get("/", this.mostrar_prestamos);
    this.router.post("/", comprobar, this.crear_prestamo);
  }
}

let proveedor = new Proveedor();
export default proveedor.router;
