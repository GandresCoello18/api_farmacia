"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Store_cliente_1 = __importDefault(require("./Store-cliente"));
const response_1 = __importDefault(require("../../network/response"));
const { comprobar } = require("../util/util-login");
const uuid_1 = require("uuid");
class Cliente {
  constructor() {
    this.router = express_1.Router();
    this.ruta();
  }
  crear_cliente(req, res) {
    const { nombre, apellido, identificacion, correo, direccion } =
      req.body || null;
    Store_cliente_1.default
      .validar_cliente_existente(identificacion, correo)
      .then((data) => {
        if (data.length == 0) {
          const obj = {
            id_cliente: uuid_1.v4(),
            nombre,
            apellido,
            identificacion,
            correo,
            direccion,
          };
          if (obj.correo == "") obj.correo = "no especificado";
          Store_cliente_1.default
            .add_cliente(obj)
            .then((data) => {
              response_1.default.success(req, res, data, 200);
            })
            .catch((err) => {
              response_1.default.error(
                req,
                res,
                err,
                500,
                "Error en crear cliente"
              );
            });
        } else {
          response_1.default.success(
            req,
            res,
            { feeback: "Estos datos ya son existentes" },
            200
          );
        }
      })
      .catch((err) => {
        console.log("Error en validar cliente existente");
      });
  }
  mostrar_clientes(req, res) {
    Store_cliente_1.default
      .listar_clientes()
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "Error en listar los clientes"
        );
      });
  }
  eliminar_cliente(req, res) {
    const { id_cliente } = req.params || null;
    Store_cliente_1.default
      .borrar_cliente(id_cliente)
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "Error en eliminar cliente"
        );
      });
  }
  ruta() {
    this.router.post("/", this.crear_cliente);
    this.router.get("/", this.mostrar_clientes);
    this.router.delete("/:id_cliente", this.eliminar_cliente);
  }
}
let cliente = new Cliente();
exports.default = cliente.router;
