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

  mostrar_monto_total_por_fecha(req: Request, res: Response) {
    const { fecha } = req.params || null;

    Store.mostrar_monto_total_por_fecha(fecha)
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(
          req,
          res,
          err,
          500,
          "Error en mostrar monto total por fecha en prestamos"
        );
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
        estado_prestamo: "Prestado",
        abono_prestamo: 0,
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

  editar_prestamo(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_prestamo } = req.params || null;
      const {
        descripcion_prestamo,
        cantidad_prestamo,
        estado_prestamo,
        abono_prestamo,
      } = req.body || null;

      let obj: Prestamo_INT = {
        id_prestamo,
        cantidad_prestamo: Number(cantidad_prestamo),
        descripcion_prestamo,
        estado_prestamo,
        abono_prestamo,
      };

      console.log(obj);

      Store.edit_prestamos(obj)
        .then((data) => {
          Respuesta.success(req, res, data, 200);
        })
        .catch((err) => {
          Respuesta.error(
            req,
            res,
            err,
            500,
            "Error en editar prestamo " + err
          );
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

  incrementar_abono(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_prestamo } = req.params || null;
      const { incremento_abono } = req.body || null;

      Store.mostrar_unico_prestamos(id_prestamo)
        .then((unico) => {
          if (unico[0].estado_prestamo !== "Pagado") {
            let estado_abono = "";
            if (Number(incremento_abono) < Number(unico[0].cantidad_prestamo)) {
              estado_abono = "Saldo pendiente";
            }

            if (
              Number(incremento_abono) === Number(unico[0].cantidad_prestamo)
            ) {
              estado_abono = "Pagado";
            }

            Store.incrementar_abono_prestamos(
              id_prestamo,
              estado_abono,
              incremento_abono
            )
              .then(async () => {
                const resPrestamo = await Store.mostrar_unico_prestamos(
                  id_prestamo
                );

                Respuesta.success(
                  req,
                  res,
                  { update: true, prestamo: resPrestamo },
                  200
                );
              })
              .catch((err) => {
                Respuesta.error(
                  req,
                  res,
                  err,
                  500,
                  "Error en incrementar el abono del prestamo"
                );
              });
          } else {
            Respuesta.success(
              req,
              res,
              { feeback: "Este prestamo ya fue cancelado" },
              200
            );
          }
        })
        .catch((err) => {
          Respuesta.error(req, res, err, 500, "Error en prestamo unico");
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

  eliminar_prestamo(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_prestamo } = req.params || null;

      Store.eliminar_prestamos(id_prestamo)
        .then((data) => {
          Respuesta.success(req, res, { removed: true }, 200);
        })
        .catch((err) => {
          Respuesta.error(req, res, err, 500, "Error en eliminar prestamo");
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
    this.router.get(
      "/monto_total/fecha/:fecha",
      this.mostrar_monto_total_por_fecha
    );
    this.router.get("/", this.mostrar_prestamos);
    this.router.post("/", comprobar, this.crear_prestamo);
    this.router.put("/:id_prestamo", comprobar, this.editar_prestamo);
    this.router.put(
      "/incrementar_abono/:id_prestamo",
      comprobar,
      this.incrementar_abono
    );
    this.router.delete("/:id_prestamo", comprobar, this.eliminar_prestamo);
  }
}

let proveedor = new Proveedor();
export default proveedor.router;
