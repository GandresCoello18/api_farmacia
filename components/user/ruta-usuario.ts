import { Request, Response, Router } from "express";
import Store from "./store-usuario";
import StoreEmail from "../email/store-email";
const { comprobar } = require("../util/util-login");
import Fechas from "../util/util-fecha";
import utilEmail from "../util/util-email";
import encriptacion from "bcryptjs";
import id from "shortid";
import Respuestas from "../../network/response";
import {
  Usuario_INT,
  Email_INT,
  History_session_INT,
} from "../../interface/index";

class Usuario {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  crear_usuario(req: Request, res: Response) {
    const { nombres, apellidos, email, password, tipo } = req.body || null;

    Store.validar_usuario_existente(email)
      .then((data: any) => {
        if (data == 0) {
          encriptacion
            .hash(password, 10)
            .then((clave_encriptada) => {
              const user: Usuario_INT = {
                id_user: id.generate(),
                nombres,
                apellidos,
                foto: "avatar/hombre-0.jpg",
                tipo,
                email,
                email_on: false,
                password: clave_encriptada,
              };

              Store.insertar_usuario(user)
                .then((data: any) => {
                  Respuestas.success(req, res, data, 201);

                  const email: Email_INT = {
                    id_user: user.id_user,
                    hash: id.generate(),
                  };

                  StoreEmail.crear_hash(email)
                    .then(() => {
                      utilEmail
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
                .catch((err: any) => {
                  Respuestas.error(
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
          Respuestas.success(
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

  obtener_usuario(req: Request, res: Response) {
    const { id } = req.params || null;

    Store.consulta_usuario(id)
      .then((info) => {
        Respuestas.success(req, res, info, 200);
      })
      .catch((err) => {
        Respuestas.error(req, res, err, 500, "error en pedir datos unico user");
      });
  }

  obtener_usuarios(req: Request, res: Response) {
    Store.consultar_usuarios()
      .then((data) => {
        Respuestas.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuestas.error(req, res, err, 500, "Error al consultar usuarios");
      });
  }

  editar_usuario(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id } = req.params || null;
      const { nombres, apellidos, email_on, tipo_user } = req.body || null;

      Store.editar_usuario(id, nombres, apellidos, email_on, tipo_user)
        .then((data) => {
          Respuestas.success(req, res, data, 200);
        })
        .catch((err) => {
          Respuestas.error(req, res, err, 500, "Error al modificar usuarios");
        });
    } else {
      Respuestas.success(
        req,
        res,
        { feeback: "No tienes permisos para esta accion" },
        200
      );
    }
  }

  eliminar_usuario(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id } = req.params || null;

      Store.eliminar_usuario(id)
        .then((data) => {
          Respuestas.success(req, res, data, 200);
        })
        .catch((err) => {
          Respuestas.error(req, res, err, 500, "Error al eliminar usuarios");
        });
    } else {
      Respuestas.success(
        req,
        res,
        { feeback: "No tienes permisos aqui..!" },
        200
      );
    }
  }

  create_history(req: Request, res: Response) {
    const { id_user } = req.body || null;

    let history: History_session_INT = {
      id_user,
      fecha_session: Fechas.fecha_con_hora_actual(),
    };

    Store.create_history_session(history)
      .then((data) => {
        Respuestas.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuestas.error(req, res, err, 500, "Error en crear history session");
      });
  }

  listar_history(req: Request, res: Response) {
    const { limite } = req.query || null;

    Store.listar_history_session(Number(limite))
      .then((data) => {
        Respuestas.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuestas.error(
          req,
          res,
          err,
          500,
          "Error en listar historial session"
        );
      });
  }

  clean_history(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      Store.traer_ultimo_historial()
        .then((data: any) => {
          if (data == 0) {
            console.log("no hay historial de session");
          } else {
            Store.clean_history_session(Number(data[0].id_historial_session))
              .then(() => {
                Respuestas.success(
                  req,
                  res,
                  { feeback: "Se limpio el historial de session" },
                  200
                );
              })
              .catch((err) => {
                Respuestas.error(
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
          Respuestas.error(
            req,
            res,
            err,
            500,
            "Error en traer el ultimo historial de session"
          );
        });
    } else {
      Respuestas.success(
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
export default user.router;
