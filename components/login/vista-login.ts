import { Request, Response, Router } from "express";
import Store from "./store-login";
const { config } = require("../../config/index");
const { comprobar } = require("../util/util-login-admin");
import jwt from "jsonwebtoken";
import encripctacion from "bcryptjs";

class LOGINView {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  VistaLoing(req: Request, res: Response) {
    if (res.locals.tipo_user) {
      res.redirect("/view/home");
    }
    res.render("login.pug", { feeback: "" });
  }

  autenticar(req: Request, res: Response) {
    const { email, password } = req.body || null;

    Store.validar_credenciales(email)
      .then(async (data: any) => {
        if (data == 0) {
          res.render("login.pug", {
            feeback: "Los Datos que ingreso son incorrectos",
          });
        } else {
          if (data[0].email_on == 0 || data[0].email_on == false) {
            res.render("login.pug", {
              feeback: "Este email no esta verificado",
            });
          } else {
            if (await encripctacion.compare(password, data[0].password)) {
              let save = {
                id_user: data[0].id_user,
                tipo_user: data[0].tipo_user,
              };
              const token = jwt.sign(save, config.jwtSecretAdmin);

              res.cookie("access_token", token).redirect("/view/home");
            } else {
              res.render("login.pug", {
                feeback: "Los Datos que ingreso son incorrectos",
              });
            }
          }
        }
      })
      .catch((err) => {
        console.log(new Error(err) + " Error en validar el usuario de la db");
      });
  }

  ruta() {
    this.router.get("/", comprobar, this.VistaLoing);
    this.router.post("/", this.autenticar);
  }
}

let vista = new LOGINView();
export default vista.router;
