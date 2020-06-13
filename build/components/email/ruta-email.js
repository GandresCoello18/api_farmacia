"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_email_1 = __importDefault(require("./store-email"));
const store_usuario_1 = __importDefault(require("../user/store-usuario"));
const response_1 = __importDefault(require("../../network/response"));
const shortid_1 = __importDefault(require("shortid"));
class Email {
  constructor() {
    this.router = express_1.Router();
    this.ruta();
  }
  crearHash(req, res) {
    const { id_user } = req.body || null;
    store_email_1.default
      .validar_id_user_existente(id_user)
      .then((data) => {
        if (data != 0) {
          store_email_1.default
            .borrar_hash(id_user)
            .then(() => console.log("Hash existente eliminado"));
        }
        let obj = {
          id_user,
          hash: shortid_1.default.generate(),
        };
        store_email_1.default
          .crear_hash(obj)
          .then((data) => {
            response_1.default.success(req, res, data, 200);
          })
          .catch((err) => {
            response_1.default.error(
              req,
              res,
              err,
              500,
              "Error al crear el hash para la verificacion de email"
            );
          });
      })
      .catch((err) => console.log("Error en validar id user existente"));
  }
  borrarHash(req, res) {
    const { id_user } = req.params || null;
    store_email_1.default
      .borrar_hash(id_user)
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "Error al eliminar el hash para la verificacion de email"
        );
      });
  }
  verificar_hash(req, res) {
    const { hash } = req.params || null;
    store_email_1.default
      .verificar_hash(hash)
      .then((data) => {
        if (data != 0) {
          store_usuario_1.default
            .verificar_email(data[0].id_user)
            .then(() => console.log("Virificado en la data base"))
            .catch((err) => console.log("no verificado data base " + err));
          store_email_1.default
            .borrar_hash(data[0].id_user)
            .then(() => console.log("Se elimino el hash"));
          response_1.default.success(
            req,
            res,
            "Email verificado exitosamente",
            200
          );
        } else {
          response_1.default.success(
            req,
            res,
            "Ocurrio un error al verificar el email o ya fue verificado",
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
          "Error al verificar el hash"
        );
      });
  }
  verificar_email(req, res) {
    const { email } = req.params || null;
    store_email_1.default
      .veridicar_email(email)
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "Error en verificar el email_on"
        );
      });
  }
  ruta() {
    this.router.post("/", this.crearHash);
    this.router.delete("/:id_user", this.borrarHash);
    this.router.get("/verificar/:hash", this.verificar_hash);
    this.router.get("/verificar/email/:email", this.verificar_email);
  }
}
let email = new Email();
exports.default = email.router;
