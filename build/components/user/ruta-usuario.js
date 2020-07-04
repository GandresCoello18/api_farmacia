"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_usuario_1 = __importDefault(require("./store-usuario"));
const store_email_1 = __importDefault(require("../email/store-email"));
const { comprobar } = require("../util/util-login");
const util_fecha_1 = __importDefault(require("../util/util-fecha"));
const util_email_1 = __importDefault(require("../util/util-email"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const shortid_1 = __importDefault(require("shortid"));
const response_1 = __importDefault(require("../../network/response"));
class Usuario {
  constructor() {
    this.router = express_1.Router();
    this.ruta();
  }
  crear_usuario(req, res) {
    const { nombres, apellidos, email, password, tipo } = req.body || null;
    store_usuario_1.default
      .validar_usuario_existente(email)
      .then((data) => {
        if (data == 0) {
          bcryptjs_1.default
            .hash(password, 10)
            .then((clave_encriptada) => {
              const user = {
                id_user: shortid_1.default.generate(),
                nombres,
                apellidos,
                foto: "avatar/hombre-0.jpg",
                tipo,
                email,
                email_on: false,
                password: clave_encriptada,
              };
              store_usuario_1.default
                .insertar_usuario(user)
                .then((data) => {
                  response_1.default.success(req, res, data, 201);
                  const email = {
                    id_user: user.id_user,
                    hash: shortid_1.default.generate(),
                  };
                  store_email_1.default
                    .crear_hash(email)
                    .then(() => {
                      util_email_1.default
                        .send(
                          "Verificar Email",
                          user.email,
                          "Verificar Email",
                          "Presione en el boton",
                          email.hash
                        )
                        .then(() =>
                          console.log("Se envio el mensaje a su correo")
                        )
                        .catch((err) =>
                          console.log(
                            "Error al enviar el mensaje al correo" + err
                          )
                        );
                      console.log(`HASH creado para ${email.id_user}`);
                    })
                    .catch((err) =>
                      console.log(
                        `Error al crear hash para ${email.id_user} ocacion: ${err.message}`
                      )
                    );
                })
                .catch((err) => {
                  response_1.default.error(
                    req,
                    res,
                    err,
                    500,
                    "Error al crear Usuario"
                  );
                });
            })
            .catch((err) => {
              console.log(new Error(err) + " Error en cifrar clave");
            });
        } else {
          response_1.default.success(
            req,
            res,
            { feeback: "El usuario ya existe" },
            200
          );
        }
      })
      .catch((err) => {
        console.log(new Error(err) + " error en validar user existente");
      });
  }
  obtener_usuario(req, res) {
    const { id } = req.params || null;
    store_usuario_1.default
      .consulta_usuario(id)
      .then((info) => {
        response_1.default.success(req, res, info, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "error en pedir datos unico user"
        );
      });
  }
  obtener_usuarios(req, res) {
    store_usuario_1.default
      .consultar_usuarios()
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "Error al consultar usuarios"
        );
      });
  }
  editar_usuario(req, res) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id } = req.params || null;
      const { nombres, apellidos, email_on } = req.body || null;
      store_usuario_1.default
        .editar_usuario(id, nombres, apellidos, email_on)
        .then((data) => {
          response_1.default.success(req, res, data, 200);
        })
        .catch((err) => {
          response_1.default.error(
            req,
            res,
            err,
            500,
            "Error al modificar usuarios"
          );
        });
    } else {
      response_1.default.success(
        req,
        res,
        { feeback: "No tienes permisos para esta accion" },
        200
      );
    }
  }
  eliminar_usuario(req, res) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id } = req.params || null;
      store_usuario_1.default
        .eliminar_usuario(id)
        .then((data) => {
          response_1.default.success(req, res, data, 200);
        })
        .catch((err) => {
          response_1.default.error(
            req,
            res,
            err,
            500,
            "Error al eliminar usuarios"
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
  create_history(req, res) {
    const { id_user } = req.body || null;
    let history = {
      id_user,
      fecha_session: util_fecha_1.default.fecha_con_hora_actual(),
    };
    store_usuario_1.default
      .create_history_session(history)
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "Error en crear history session"
        );
      });
  }
  listar_history(req, res) {
    const { limite } = req.query || null;
    store_usuario_1.default
      .listar_history_session(Number(limite))
      .then((data) => {
        response_1.default.success(req, res, data, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "Error en listar historial session"
        );
      });
  }
  clean_history(req, res) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      store_usuario_1.default
        .traer_ultimo_historial()
        .then((data) => {
          if (data == 0) {
            console.log("no hay historial de session");
          } else {
            store_usuario_1.default
              .clean_history_session(Number(data[0].id_historial_session))
              .then(() => {
                response_1.default.success(
                  req,
                  res,
                  { feeback: "Se limpio el historial de session" },
                  200
                );
              })
              .catch((err) => {
                response_1.default.error(
                  req,
                  res,
                  err,
                  500,
                  "Error en limpiar el historial"
                );
              });
          }
        })
        .catch((err) => {
          response_1.default.error(
            req,
            res,
            err,
            500,
            "Error en traer el ultimo historial de session"
          );
        });
    } else {
      response_1.default.success(
        req,
        res,
        { feeback: "No tienes permisos para esta accion" },
        200
      );
    }
  }
  ruta() {
    /* entry point  history session */
    this.router.post("/history-session", this.create_history);
    this.router.get("/history-session", this.listar_history);
    this.router.delete("/history-session", comprobar, this.clean_history);
    /* entry point user */
    this.router.get("/", this.obtener_usuarios);
    this.router.get("/:id", this.obtener_usuario);
    this.router.post("/", this.crear_usuario);
    this.router.put("/:id", comprobar, this.editar_usuario);
    this.router.delete("/:id", comprobar, this.eliminar_usuario);
  }
}
let user = new Usuario();
exports.default = user.router;
