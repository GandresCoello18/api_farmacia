import { Request, Response, Router } from "express";
import Store from "./Store-producto";
import Respuesta from "../../network/response";
// import multer from "multer";
import Fecha from "../util/util-fecha";
import RespuestaTable from "./response-table/propiedades-producto";
import RespuestaTableProduct from "./response-table/producto";
import { Producto_INT } from "../../interface/index";
const { comprobar } = require("../util/util-login");
import Colors from "colors";
import { csvWriter } from "../../csv/generate-csv";
import { v4 as uuidv4 } from "uuid";

class Producto {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  /* configuracion para la subida de imagnes */
  /*store_file() {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./public/productos");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });

    const fileFilter = (
      req: any,
      file: { mimetype: string },
      cb: (arg0: null, arg1: boolean) => void
    ) => {
      if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };

    const upload = multer({
      storage: storage,
      limits: { fileSize: 1024 * 1024 * 5 },
      fileFilter: fileFilter,
    });

    return upload;
  }*/
  /* NOMBRE DEL PRODUCTO */

  async create_name_product(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { name_product } = req.body || null;

      Store.existente_product_name(name_product)
        .then((data: any) => {
          if (data == 0) {
            Store.add_name_product(name_product)
              .then(async () => {
                const responseTble = await RespuestaTable.responder_nombre_producto(
                  name_product
                );
                Respuesta.success(req, res, responseTble, 200);
              })
              .catch((err) => {
                Respuesta.error(
                  req,
                  res,
                  err,
                  500,
                  "Error en crear name_product"
                );
              });
          } else {
            Respuesta.success(
              req,
              res,
              { feeback: "Este registro ya existe, intena con otro nombre..!" },
              200
            );
          }
        })
        .catch((err) => {
          Respuesta.error(
            req,
            res,
            err,
            500,
            "Error en validar registro existente"
          );
        });
    } else {
      Respuesta.success(
        req,
        res,
        { feeback: "No tienes permisos aqui..!" },
        200
      );
    }
  }

  mostrar_name_productos(req: Request, res: Response) {
    Store.listar_name_producto()
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error al mostrar name product");
      });
  }

  eliminar_name_producto(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_name_producto } = req.params || null;

      Store.eliminar_name_product(Number(id_name_producto))
        .then(() => {
          Respuesta.success(req, res, { removed: true }, 200);
        })
        .catch((err) => {
          Respuesta.error(req, res, err, 500, "Error en eliminar product name");
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

  editar_product_name(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_name_producto } = req.params || null;
      const { name_product } = req.body || null;

      Store.editar_product_name(Number(id_name_producto), name_product)
        .then((data) => {
          Respuesta.success(req, res, data, 200);
        })
        .catch((err) => {
          Respuesta.error(
            req,
            res,
            err,
            500,
            "Error en editar el product name"
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

  /* NOMBRE DEL LABORATORIO */

  async create_name_laboratorio(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { name_laboratorio } = req.body || null;

      Store.existente_laboratorio_name(name_laboratorio)
        .then((data: any) => {
          if (data == 0) {
            Store.add_name_laboratorio(name_laboratorio)
              .then(async () => {
                const responseTble = await RespuestaTable.responder_nombre_laboratorio(
                  name_laboratorio
                );
                Respuesta.success(req, res, responseTble, 200);
              })
              .catch((err) => {
                Respuesta.error(
                  req,
                  res,
                  err,
                  500,
                  "Error en crear name_laboratorio"
                );
              });
          } else {
            Respuesta.success(
              req,
              res,
              { feeback: "Este registro ya existe, pruebe con otro nombre..!" },
              200
            );
          }
        })
        .catch((err) => {
          Respuesta.error(
            req,
            res,
            err,
            500,
            "Error en validar laboratorio existente"
          );
        });
    } else {
      Respuesta.success(
        req,
        res,
        { feeback: "No tienes permisos aqui..!" },
        200
      );
    }
  }

  mostrar_name_laboratorio(req: Request, res: Response) {
    Store.listar_name_laboratorio()
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(
          req,
          res,
          err,
          500,
          "Error al mostrar name laboratorio"
        );
      });
  }

  eliminar_laboratorio(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_name_laboratorio } = req.params || null;

      Store.eliminar_name_laboratorio(Number(id_name_laboratorio))
        .then(() => {
          Respuesta.success(req, res, { removed: true }, 200);
        })
        .catch((err) => {
          Respuesta.error(
            req,
            res,
            err,
            500,
            "Error al eliminar nombre del laboratorio"
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

  editar_name_laboratorio(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_name_laboratorio } = req.params || null;
      const { name_laboratorio } = req.body;

      Store.editar_laboratorio_name(
        Number(id_name_laboratorio),
        name_laboratorio
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
            "Error al editar nombre laboratorio"
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

  /* PRODUCTO COMPLETO */

  async create_product(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const {
        id_name_product,
        id_name_laboratorio,
        cantidad,
        presentacion,
        lote,
        registro_sanitario,
        dosis,
        tipo_dosis,
        fecha_elaboracion,
        fecha_caducidad,
        pvp,
        pvf,
        id_principio_activo,
        cantidad_disponible,
        veces_ingreso,
      } = req.body || null;

      let p = 0;
      if (id_principio_activo == "") {
        let none: any = await Store.search_princt_activ_none();
        p = Number(none[0].id_principio_activo);
      } else {
        p = id_principio_activo;
      }

      const obj: Producto_INT = {
        id_producto: uuidv4(),
        id_name_product,
        id_name_laboratorio,
        cantidad,
        presentacion,
        lote,
        registro_sanitario,
        dosis,
        tipo_dosis,
        fecha_elaboracion,
        fecha_caducidad,
        pvp,
        pvf,
        estado: "Disponible",
        id_principio_activo: p,
        cantidad_disponible,
      };

      Store.add_product(obj)
        .then(async () => {
          const respuestaProduct = await RespuestaTableProduct.responder_producto(
            obj.id_producto
          );
          Respuesta.success(req, res, respuestaProduct, 200);
        })
        .catch((err) => {
          Respuesta.error(
            req,
            res,
            err,
            500,
            `Error al crear producto: ${err}`
          );
        });
    } else {
      Respuesta.success(
        req,
        res,
        { feeback: "No tienes permisos aqui..!" },
        200
      );
    }
  }

  mostrar_productos(req: Request, res: Response) {
    Store.listar_producto()
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error en mostrar productos");
      });
  }

  mostrar_productos_caducados(req: Request, res: Response) {
    Store.listar_producto_caducados()
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error en mostrar productos");
      });
  }

  verificar_posibles_productos_caducados(req: Request, res: Response) {
    Store.solo_producto()
      .then((data) => {
        data.map(async (producto) => {
          if (
            new Date(Fecha.fecha_actual()) >= new Date(producto.fecha_caducidad)
          ) {
            console.log(
              Colors.bgRed(
                Colors.white(`Producto caducado: ${producto.id_producto}`)
              )
            );
            return await Store.cambiar_status_producto(
              producto.id_producto,
              "Caducado"
            );
          }
        });
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error en mostrar productos");
      });
  }

  reporte_producto(req: Request, res: Response) {
    Store.listar_producto()
      .then((data) => {
        csvWriter.writeRecords(data).then(() => {
          console.log(
            Colors.bgGreen(
              Colors.white("The CSV file was written successfully")
            )
          );
          Respuesta.success(
            req,
            res,
            { feeback: "The CSV file was written successfully" },
            200
          );
        });
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error en mostrar productos");
      });
  }

  eliminar_producto(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_producto } = req.params || null;

      Store.eliminar_producto(id_producto)
        .then(() => {
          Respuesta.success(req, res, { removed: true }, 200);
        })
        .catch((err) => {
          Respuesta.error(req, res, err, 500, "Error en eliminar producto");
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

  editar_producto(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_producto } = req.params || null;
      const {
        producto,
        laboratorio,
        principio_act,
        cantidad,
        presentacion,
        lote,
        sanitario,
        medidas,
        tipo_medidas,
        elaboracion,
        caducidad,
        pvp,
        pvf,
        cantidad_disponible,
      } = req.body || null;

      const obj: Producto_INT = {
        id_producto,
        id_name_product: producto,
        id_name_laboratorio: laboratorio,
        id_principio_activo: principio_act,
        cantidad,
        presentacion,
        lote,
        registro_sanitario: sanitario,
        dosis: medidas,
        tipo_dosis: tipo_medidas,
        fecha_elaboracion: elaboracion,
        fecha_caducidad: caducidad,
        pvp,
        pvf,
        cantidad_disponible,
      };

      Store.editar_producto_complete(obj)
        .then((data) => {
          Respuesta.success(req, res, data, 200);
        })
        .catch((err) => {
          Respuesta.error(
            req,
            res,
            err,
            500,
            "Error al editar producto " + err
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

  /* PRINCIPIO ACTIVO */

  create_principio_activo(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { name_principio_activo } = req.body || null;

      Store.existente_principio_active(name_principio_activo)
        .then((data: any) => {
          if (data == 0) {
            Store.add_principio_activo(name_principio_activo)
              .then(async () => {
                const responseTble = await RespuestaTable.responder_principio_activo(
                  name_principio_activo
                );
                Respuesta.success(req, res, responseTble, 200);
              })
              .catch((err) => {
                Respuesta.error(
                  req,
                  res,
                  err,
                  500,
                  "Error en crear principio activo"
                );
              });
          } else {
            Respuesta.success(
              req,
              res,
              { feeback: "Este registro ya exite, prueba con otro nombre" },
              200
            );
          }
        })
        .catch((err) => {
          Respuesta.error(
            req,
            res,
            err,
            500,
            "Error en validar registro existente principio activo"
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

  mostrar_principio_activo(req: Request, res: Response) {
    Store.listar_principio_activo()
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(
          req,
          res,
          err,
          500,
          "Error en mostrar principio activo"
        );
      });
  }

  eliminar_principio_activo(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_principio } = req.params || null;

      Store.eliminar_principio_activo(Number(id_principio))
        .then(() => {
          Respuesta.success(req, res, { removed: true }, 200);
        })
        .catch((err) => {
          Respuesta.error(
            req,
            res,
            err,
            500,
            "Error a eliminar principio activo"
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

  editar_principio_activo(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_principio } = req.params || null;
      const { principio_activo } = req.body || null;

      Store.editar_principio_activo(Number(id_principio), principio_activo)
        .then((data) => {
          Respuesta.success(req, res, data, 200);
        })
        .catch((err) => {
          Respuesta.error(
            req,
            res,
            err,
            500,
            "Error en editar principio activo"
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

  ruta() {
    //const upload = this.store_file();

    ///////////// nombre de laboratorio
    this.router.post(
      "/nombre_laboratorio",
      comprobar,
      this.create_name_laboratorio
    );
    this.router.get("/nombre_laboratorio", this.mostrar_name_laboratorio);
    this.router.put(
      "/nombre_laboratorio/:id_name_laboratorio",
      comprobar,
      this.editar_name_laboratorio
    );
    this.router.delete(
      "/nombre_laboratorio/:id_name_laboratorio",
      comprobar,
      this.eliminar_laboratorio
    );
    /////////////// nombre de productos
    this.router.post("/nombre_producto", comprobar, this.create_name_product);
    this.router.get("/nombre_producto", this.mostrar_name_productos);
    this.router.put(
      "/nombre_producto/:id_name_producto",
      comprobar,
      this.editar_product_name
    );
    this.router.delete(
      "/nombre_producto/:id_name_producto",
      comprobar,
      this.eliminar_name_producto
    );
    /////////////// principio activo
    this.router.post(
      "/principio_activo",
      comprobar,
      this.create_principio_activo
    );
    this.router.get("/principio_activo", this.mostrar_principio_activo);
    this.router.put(
      "/principio_activo/:id_principio",
      comprobar,
      this.editar_principio_activo
    );
    this.router.delete(
      "/principio_activo/:id_principio",
      comprobar,
      this.eliminar_principio_activo
    );
    /////////////// producto completo
    this.router.delete("/:id_producto", comprobar, this.eliminar_producto);
    this.router.post("/", comprobar, this.create_product);
    this.router.put(
      "/verificar_posibles_caducados",
      this.verificar_posibles_productos_caducados
    );
    this.router.put("/:id_producto", comprobar, this.editar_producto);
    this.router.get("/", this.mostrar_productos);
    this.router.get("/caducados", this.mostrar_productos_caducados);
    ////////////// Reportes CSV
    this.router.get("/reporte", this.reporte_producto);
  }
}

let producto = new Producto();
export default producto.router;
