import { Request, Response, Router } from "express";
import Store from "./Store-proveedor";
import Respuesta from "../../network/response";
import Fecha from "../util/util-fecha";
import { Proveedor_INT, Producto_proveedor_INT } from "../../interface/index";
const { comprobar } = require("../util/util-login");
import { v4 as uuidv4 } from "uuid";

class Proveedor {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  /* PROVEEDORES */

  mostrar_proveedores(req: Request, res: Response) {
    Store.mostrar_proveedor()
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error al mostrar proveedor");
      });
  }

  crear_proveedor(req: Request, res: Response) {
    const { nombres, id_laboratorio, correo, telefono } = req.body || null;

    const obj: Proveedor_INT = {
      id_proveedor: uuidv4(),
      nombres,
      id_laboratorio,
      correo,
      telefono,
    };

    Store.add_proveedor(obj)
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error al crear proveedor");
      });
  }

  eliminar_proveedor(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_proveedor } = req.params || null;

      Store.eliminar_proveedor(id_proveedor)
        .then((data) => {
          Respuesta.success(req, res, data, 200);
        })
        .catch((err) => {
          Respuesta.error(req, res, err, 500, "Error al eliminar proveedor");
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

  editar_proveedor(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_proveedor } = req.params || null;
      const { nombres, id_laboratorio, correo, telefono } = req.body || null;

      const obj: Proveedor_INT = {
        id_proveedor,
        nombres,
        id_laboratorio,
        correo,
        telefono,
      };

      Store.editar_proveedor(obj)
        .then((data) => {
          Respuesta.success(req, res, data, 200);
        })
        .catch((err) => {
          Respuesta.error(req, res, err, 500, "Error al editar proveedor");
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

  /* PRODUCTO PROVEEDOR */

  nuevo_producto_proveedor(req: Request, res: Response) {
    const {
      descripcion,
      fecha_pago,
      total,
      id_proveedor,
      estado_pp,
      abono,
    } = req.body;

    const obj: Producto_proveedor_INT = {
      id_product_proveedor: uuidv4(),
      descripcion,
      fecha_pago,
      fecha_ingreso: Fecha.fecha_con_hora_actual(),
      total,
      id_proveedor,
      estado_pp,
      abono,
    };

    Store.add_product_proveedor(obj)
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(
          req,
          res,
          err,
          500,
          "Error en nuevo producto del proveedor"
        );
      });
  }

  mostrar_productos_proveedore(req: Request, res: Response) {
    Store.mostrar_product_proveedor()
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(
          req,
          res,
          err,
          500,
          "Error en mostrar productos de los proveedores " + err
        );
      });
  }

  eliminar_producto_proveedor(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_producto_proveedor } = req.params || null;

      Store.eliminar_product_proveedor(id_producto_proveedor)
        .then((data) => {
          Respuesta.success(req, res, data, 200);
        })
        .catch((err) => {
          Respuesta.error(
            req,
            res,
            err,
            500,
            "Error en eliminar producto_proveedor"
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

  editar_producto_proveedor(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_producto_proveedor } = req.params || null;
      const { descripcion, fecha_pago, total, estado_pp, abonado } =
        req.body || null;

      Store.editar_product_proveedor(
        descripcion,
        fecha_pago,
        total,
        estado_pp,
        abonado,
        id_producto_proveedor
      )
        .then((data) => {
          Respuesta.success(req, res, data, 200);
        })
        .catch((err) => {
          Respuesta.error(
            req,
            res,
            err,
            500,
            "Error en editar producto del proveedor"
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

  pago_producto_proveedor(req: Request, res: Response) {
    const { id_producto_proveedor } = req.params || null;

    Store.mostrar_unico_product_proveedor(id_producto_proveedor)
      .then((data: any) => {
        Store.pago_product_proveedor(
          id_producto_proveedor,
          data[0].total,
          Fecha.fecha_actual()
        )
          .then((data) => {
            Respuesta.success(req, res, data, 200);
          })
          .catch((err) => {
            Respuesta.error(
              req,
              res,
              err,
              500,
              "Error en pago de producto del proveedor"
            );
          });
      })
      .catch((err) => {
        console.log(`Error en traer producto unico ${err.message}`);
      });
  }

  ruta() {
    ////////  PROVEEDORES
    this.router.post("/", this.crear_proveedor);
    this.router.get("/", this.mostrar_proveedores);
    this.router.delete("/:id_proveedor", comprobar, this.eliminar_proveedor);
    this.router.put("/:id_proveedor", comprobar, this.editar_proveedor);
    ////////  NEW PRODUCT PROVEEDORES
    this.router.post("/producto", this.nuevo_producto_proveedor);
    this.router.get("/producto", this.mostrar_productos_proveedore);
    this.router.put(
      "/producto/:id_producto_proveedor",
      comprobar,
      this.editar_producto_proveedor
    );
    this.router.delete(
      "/producto/:id_producto_proveedor",
      comprobar,
      this.eliminar_producto_proveedor
    );
    this.router.put(
      "/producto/estado/pagado/:id_producto_proveedor",
      this.pago_producto_proveedor
    );
  }
}

let proveedor = new Proveedor();
export default proveedor.router;
