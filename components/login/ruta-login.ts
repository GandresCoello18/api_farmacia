import { Request, Response, Router } from "express";
import Respuesta from "../../network/response";
import Store from "./store-login";
import StoreUser from "../user/store-usuario";
import encripctacion from "bcryptjs";
import Fechas from "../util/util-fecha";
import { History_session_INT } from "../../interface";
import jwt from "jsonwebtoken";
const { comprobar } = require("../util/util-login");
const { config } = require("../../config/index");

class Login {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  validar_vida_token(req: Request, res: Response) {
    console.log("validando el tiempo de vida del token, TOKEN ACTIVO");
    StoreUser.consulta_usuario(res.locals.datos_user.id_user)
      .then((user) => {
        delete user[0].password;
        Respuesta.success(req, res, { myUser: user }, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "error en pedir datos unico user");
      });
  }

  autenticar(req: Request, res: Response) {
    const { email, password } = req.body || null;

    Store.validar_credenciales(email)
      .then(async (data: any) => {
        /* valida si el usuario ya exite en la base de datos */
        if (data == 0) {
          Respuesta.success(
            req,
            res,
            { feeback: "Los Datos que ingreso son incorrectos" },
            200
          );
        } else {
          if (data[0].email_on == 0 || data[0].email_on == false) {
            Respuesta.success(
              req,
              res,
              { feeback: "Este email no esta verificado" },
              200
            );
          } else {
            /* crea una serie de caracteres encriptados a partir de la clave ingresada */
            if (await encripctacion.compare(password, data[0].password)) {
              let save = {
                id_user: data[0].id_user,
                tipo_user: data[0].tipo_user,
              };

              /* configura el token sin tiempo de expiracion */
              const token = jwt.sign(save, config.jwtSecret);

              let history: History_session_INT = {
                id_user: data[0].id_user,
                fecha_session: Fechas.fecha_con_hora_actual(),
              };

              StoreUser.create_history_session(history)
                .then(() => {
                  console.log("historial de session registrado");
                })
                .catch((err) => {
                  console.log(`Error en crear history session: ${err}`);
                });

              Respuesta.success(req, res, { token: token }, 200);
            } else {
              Respuesta.success(
                req,
                res,
                { feeback: "Los Datos que ingreso son incorrectos" },
                200
              );
            }
          }
        }
      })
      .catch((err) => {
        console.log(new Error(err) + " Error en validar el usuario de la db");
      });
  }

  ruta() {
    // LOGIN
    this.router.post("/vida-token", comprobar, this.validar_vida_token);
    this.router.post("/autenticacion", this.autenticar);
  }
}

let login = new Login();
export default login.router;
