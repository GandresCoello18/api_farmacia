"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Store_producto_1 = __importDefault(require("./Store-producto"));
const response_1 = __importDefault(require("../../network/response"));
const multer_1 = __importDefault(require("multer"));
const { comprobar } = require("../util/util-login");
const uuid_1 = require("uuid");
class Producto {
  constructor() {
    this.router = express_1.Router();
    this.ruta();
  }
  /* configuracion para la subida de imagnes */
  store_file() {
    const storage = multer_1.default.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./public/productos");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });
    const fileFilter = (req, file, cb) => {
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
    const upload = multer_1.default({
      storage: storage,
      limits: { fileSize: 1024 * 1024 * 5 },
      fileFilter: fileFilter,
    });
    return upload;
  }
  /* NOMBRE DEL PRODUCTO */
  create_name_product(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      if (res.locals.datos_user.tipo_user == "Administrador") {
        const { name_product } = req.body || null;
        Store_producto_1.default
          .existente_product_name(name_product)
          .then((data) => {
            if (data == 0) {
              Store_producto_1.default
                .add_name_product(name_product)
                .then((data) => {
                  response_1.default.success(req, res, data, 201);
                })
                .catch((err) => {
                  response_1.default.error(
                    req,
                    res,
                    err,
                    500,
                    "Error en crear name_product"
                  );
                });
            } else {
              response_1.default.success(
                req,
                res,
                {
                  feeback: "Este registro ya existe, intena con otro nombre..!",
                },
                200
              );
            }
          })
          .catch((err) => {
            response_1.default.error(
              req,
              res,
              err,
              500,
              "Error en validar registro existente"
            );
          });
      } else {
        response_1.default.success(
          req,
          res,
          { feeback: "No tienes permisos aqui..!" },
          200
        );
      }
    });
  }
  mostrar_name_productos(req, res) {
    Store_producto_1.default
      .listar_name_producto()
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "Error al mostrar name product"
        );
      });
  }
  eliminar_name_producto(req, res) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_name_producto } = req.params || null;
      Store_producto_1.default
        .eliminar_name_product(Number(id_name_producto))
        .then((data) => {
          response_1.default.success(req, res, data, 200);
        })
        .catch((err) => {
          response_1.default.error(
            req,
            res,
            err,
            500,
            "Error en eliminar product name"
          );
        });
    } else {
      response_1.default.success(
        req,
        res,
        { feeback: "No tienes permisos para estan accion" },
        200
      );
    }
  }
  editar_product_name(req, res) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_name_producto } = req.params || null;
      const { name_product } = req.body || null;
      Store_producto_1.default
        .editar_product_name(Number(id_name_producto), name_product)
        .then((data) => {
          response_1.default.success(req, res, data, 200);
        })
        .catch((err) => {
          response_1.default.error(
            req,
            res,
            err,
            500,
            "Error en editar el product name"
          );
        });
    } else {
      response_1.default.success(
        req,
        res,
        { feeback: "No tienes permisos para estan accion" },
        200
      );
    }
  }
  /* NOMBRE DEL LABORATORIO */
  create_name_laboratorio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      if (res.locals.datos_user.tipo_user == "Administrador") {
        const { name_laboratorio } = req.body || null;
        Store_producto_1.default
          .existente_laboratorio_name(name_laboratorio)
          .then((data) => {
            if (data == 0) {
              Store_producto_1.default
                .add_name_laboratorio(name_laboratorio)
                .then((data) => {
                  response_1.default.success(req, res, data, 201);
                })
                .catch((err) => {
                  response_1.default.error(
                    req,
                    res,
                    err,
                    500,
                    "Error en crear name_laboratorio"
                  );
                });
            } else {
              response_1.default.success(
                req,
                res,
                {
                  feeback: "Este registro ya existe, pruebe con otro nombre..!",
                },
                200
              );
            }
          })
          .catch((err) => {
            response_1.default.error(
              req,
              res,
              err,
              500,
              "Error en validar laboratorio existente"
            );
          });
      } else {
        response_1.default.success(
          req,
          res,
          { feeback: "No tienes permisos aqui..!" },
          200
        );
      }
    });
  }
  mostrar_name_laboratorio(req, res) {
    Store_producto_1.default
      .listar_name_laboratorio()
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "Error al mostrar name laboratorio"
        );
      });
  }
  eliminar_laboratorio(req, res) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_name_laboratorio } = req.params || null;
      Store_producto_1.default
        .eliminar_name_laboratorio(Number(id_name_laboratorio))
        .then((data) => {
          response_1.default.success(req, res, data, 200);
        })
        .catch((err) => {
          response_1.default.error(
            req,
            res,
            err,
            500,
            "Error al eliminar nombre del laboratorio"
          );
        });
    } else {
      response_1.default.success(
        req,
        res,
        { feeback: "No tienes permisos para estan accion" },
        200
      );
    }
  }
  editar_name_laboratorio(req, res) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_name_laboratorio } = req.params || null;
      const { name_laboratorio } = req.body;
      Store_producto_1.default
        .editar_laboratorio_name(Number(id_name_laboratorio), name_laboratorio)
        .then((data) => {
          response_1.default.success(req, res, data, 200);
        })
        .catch((err) => {
          response_1.default.error(
            req,
            res,
            err,
            500,
            "Error al editar nombre laboratorio"
          );
        });
    } else {
      response_1.default.success(
        req,
        res,
        { feeback: "No tienes permisos para estan accion" },
        200
      );
    }
  }
  /* PRODUCTO COMPLETO */
  create_product(req, res) {
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
      } = req.body || null;
      const obj = {
        id_producto: uuid_1.v4(),
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
        id_principio_activo,
      };
      Store_producto_1.default
        .add_product(obj)
        .then((data) => {
          response_1.default.success(req, res, data, 200);
        })
        .catch((err) => {
          response_1.default.error(
            req,
            res,
            err,
            500,
            `Error al crear producto: ${err}`
          );
        });
    } else {
      response_1.default.success(
        req,
        res,
        { feeback: "No tienes permisos aqui..!" },
        200
      );
    }
  }
  mostrar_productos(req, res) {
    Store_producto_1.default
      .listar_producto()
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "Error en mostrar productos"
        );
      });
  }
  eliminar_producto(req, res) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_producto } = req.params || null;
      Store_producto_1.default
        .eliminar_producto(id_producto)
        .then((data) => {
          response_1.default.success(req, res, data, 200);
        })
        .catch((err) => {
          response_1.default.error(
            req,
            res,
            err,
            500,
            "Error en eliminar producto"
          );
        });
    } else {
      response_1.default.success(
        req,
        res,
        { feeback: "No tienes permisos para estan accion" },
        200
      );
    }
  }
  editar_producto(req, res) {
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
      } = req.body || null;
      const obj = {
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
      };
      Store_producto_1.default
        .editar_producto_complete(obj)
        .then((data) => {
          response_1.default.success(req, res, data, 200);
        })
        .catch((err) => {
          response_1.default.error(
            req,
            res,
            err,
            500,
            "Error al editar producto"
          );
        });
    } else {
      response_1.default.success(
        req,
        res,
        { feeback: "No tienes permisos para estan accion" },
        200
      );
    }
  }
  /* PRINCIPIO ACTIVO */
  create_principio_activo(req, res) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { name_principio_activo } = req.body || null;
      Store_producto_1.default
        .existente_principio_active(name_principio_activo)
        .then((data) => {
          if (data == 0) {
            Store_producto_1.default
              .add_principio_activo(name_principio_activo)
              .then((data) => {
                response_1.default.success(req, res, data, 200);
              })
              .catch((err) => {
                response_1.default.error(
                  req,
                  res,
                  err,
                  500,
                  "Error en crear principio activo"
                );
              });
          } else {
            response_1.default.success(
              req,
              res,
              { feeback: "Este registro ya exite, prueba con otro nombre" },
              200
            );
          }
        })
        .catch((err) => {
          response_1.default.error(
            req,
            res,
            err,
            500,
            "Error en validar registro existente principio activo"
          );
        });
    } else {
      response_1.default.success(
        req,
        res,
        { feeback: "No tienes permisos para estan accion" },
        200
      );
    }
  }
  mostrar_principio_activo(req, res) {
    Store_producto_1.default
      .listar_principio_activo()
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "Error en mostrar principio activo"
        );
      });
  }
  eliminar_principio_activo(req, res) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_principio } = req.params || null;
      Store_producto_1.default
        .eliminar_principio_activo(Number(id_principio))
        .then((data) => {
          response_1.default.success(req, res, data, 200);
        })
        .catch((err) => {
          response_1.default.error(
            req,
            res,
            err,
            500,
            "Error a eliminar principio activo"
          );
        });
    } else {
      response_1.default.success(
        req,
        res,
        { feeback: "No tienes permisos para estan accion" },
        200
      );
    }
  }
  editar_principio_activo(req, res) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_principio } = req.params || null;
      const { principio_activo } = req.body || null;
      Store_producto_1.default
        .editar_principio_activo(Number(id_principio), principio_activo)
        .then((data) => {
          response_1.default.success(req, res, data, 200);
        })
        .catch((err) => {
          response_1.default.error(
            req,
            res,
            err,
            500,
            "Error en editar principio activo"
          );
        });
    } else {
      response_1.default.success(
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
    this.router.put("/:id_producto", comprobar, this.editar_producto);
    this.router.get("/", this.mostrar_productos);
  }
}
let producto = new Producto();
exports.default = producto.router;
