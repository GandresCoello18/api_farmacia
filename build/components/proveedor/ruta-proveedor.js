"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Store_proveedor_1 = __importDefault(require("./Store-proveedor"));
const response_1 = __importDefault(require("../../network/response"));
const util_fecha_1 = __importDefault(require("../util/util-fecha"));
const { comprobar } = require("../util/util-login");
const uuid_1 = require("uuid");
class Proveedor {
  constructor() {
    this.router = express_1.Router();
    this.ruta();
  }
  /* PROVEEDORES */
  mostrar_proveedores(req, res) {
    Store_proveedor_1.default
      .mostrar_proveedor()
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "Error al mostrar proveedor"
        );
      });
  }
  crear_proveedor(req, res) {
    const { nombres, id_laboratorio, correo, telefono } = req.body || null;
    const obj = {
      id_proveedor: uuid_1.v4(),
      nombres,
      id_laboratorio,
      correo,
      telefono,
    };
    Store_proveedor_1.default
      .add_proveedor(obj)
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "Error al crear proveedor"
        );
      });
  }
  eliminar_proveedor(req, res) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_proveedor } = req.params || null;
      Store_proveedor_1.default
        .eliminar_proveedor(id_proveedor)
        .then((data) => {
          response_1.default.success(req, res, data, 200);
        })
        .catch((err) => {
          response_1.default.error(
            req,
            res,
            err,
            500,
            "Error al eliminar proveedor"
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
  editar_proveedor(req, res) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_proveedor } = req.params || null;
      const { nombres, id_laboratorio, correo, telefono } = req.body || null;
      const obj = {
        id_proveedor,
        nombres,
        id_laboratorio,
        correo,
        telefono,
      };
      Store_proveedor_1.default
        .editar_proveedor(obj)
        .then((data) => {
          response_1.default.success(req, res, data, 200);
        })
        .catch((err) => {
          response_1.default.error(
            req,
            res,
            err,
            500,
            "Error al editar proveedor"
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
  /* PRODUCTO PROVEEDOR */
  nuevo_producto_proveedor(req, res) {
    const {
      descripcion,
      fecha_pago,
      total,
      id_proveedor,
      estado_pp,
      abono,
    } = req.body;
    const obj = {
      id_product_proveedor: uuid_1.v4(),
      descripcion,
      fecha_pago,
      fecha_ingreso: util_fecha_1.default.fecha_con_hora_actual(),
      total,
      id_proveedor,
      estado_pp,
      abono,
    };
    Store_proveedor_1.default
      .add_product_proveedor(obj)
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "Error en nuevo producto del proveedor"
        );
      });
  }
  mostrar_productos_proveedore(req, res) {
    Store_proveedor_1.default
      .mostrar_product_proveedor()
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "Error en mostrar productos de los proveedores " + err
        );
      });
  }
  mostrar_monto_total_por_fecha_pp(req, res) {
    const { fecha } = req.params || null;
    Store_proveedor_1.default
      .mostrar_monto_total_product_proveedor(fecha)
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(req, res, err, 500, "Error en monto total pp");
      });
  }
  eliminar_producto_proveedor(req, res) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_producto_proveedor } = req.params || null;
      Store_proveedor_1.default
        .eliminar_product_proveedor(id_producto_proveedor)
        .then((data) => {
          response_1.default.success(req, res, data, 200);
        })
        .catch((err) => {
          response_1.default.error(
            req,
            res,
            err,
            500,
            "Error en eliminar producto_proveedor"
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
  editar_producto_proveedor(req, res) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_producto_proveedor } = req.params || null;
      const { descripcion, fecha_pago, total, estado_pp, abonado } =
        req.body || null;
      Store_proveedor_1.default
        .editar_product_proveedor(
          descripcion,
          fecha_pago,
          total,
          estado_pp,
          abonado,
          id_producto_proveedor
        )
        .then((data) => {
          response_1.default.success(req, res, data, 200);
        })
        .catch((err) => {
          response_1.default.error(
            req,
            res,
            err,
            500,
            "Error en editar producto del proveedor"
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
  pago_producto_proveedor(req, res) {
    const { id_producto_proveedor } = req.params || null;
    Store_proveedor_1.default
      .mostrar_unico_product_proveedor(id_producto_proveedor)
      .then((data) => {
        Store_proveedor_1.default
          .pago_product_proveedor(
            id_producto_proveedor,
            data[0].total,
            util_fecha_1.default.fecha_actual()
          )
          .then((data) => {
            response_1.default.success(req, res, data, 200);
          })
          .catch((err) => {
            response_1.default.error(
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
    this.router.get(
      "/producto/monto_total/:fecha",
      this.mostrar_monto_total_por_fecha_pp
    );
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
exports.default = proveedor.router;
