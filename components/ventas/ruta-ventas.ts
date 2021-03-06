import { Request, Response, Router } from "express";
import Store from "./Store-ventas";
import Respuesta from "../../network/response";
const { comprobar } = require("../util/util-login");

class Ventas {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  traer_venta(req: Request, res: Response) {
    const { id_factura } = req.params;

    Store.traer_venta(id_factura)
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error en traer ventas");
      });
  }

  eliminar_venta(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_producto_factura } = req.params || null;

      Store.eliminar_venta(id_producto_factura)
        .then((data) => {
          Respuesta.success(req, res, data, 200);
        })
        .catch((err) => {
          Respuesta.error(req, res, err, 500, "Error en eliminar venta");
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
    // VENTAS
    this.router.get("/:id_factura", this.traer_venta);
    this.router.delete("/:id_producto_factura", comprobar, this.eliminar_venta);
  }
}

let venta = new Ventas();
export default venta.router;
