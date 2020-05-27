import { Request, Response, Router } from "express";
import Respuesta from "../../network/response";
import Store from "./store-login";
import StoreUser from "../user/store-usuario";
import encripctacion from "bcryptjs";
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
    console.log("validando el tiempo de vida del token, token activo");
    Respuesta.success(req, res, { feeback: "Token activo" }, 200);
  }

  autenticar(req: Request, res: Response) {
    const { email, password } = req.body || null;

    Store.validar_credenciales(email)
      .then(async (data: any) => {
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
            if (await encripctacion.compare(password, data[0].password)) {
              let save = {
                id_user: data[0].id_user,
                tipo_user: data[0].tipo_user,
              };
              const token = jwt.sign(save, config.jwtSecret);

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
    this.router.get("/autenticacion", comprobar, this.validar_vida_token);
    this.router.post("/autenticacion", this.autenticar);
  }
}

let login = new Login();
export default login.router;
