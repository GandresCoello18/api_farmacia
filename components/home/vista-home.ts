import { Request, Response, Router } from "express";
import Store from "./Store-home";
import Respuesta from "../../network/response";
const { comprobar } = require("../util/util-login-admin");

class HomeView {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  VistaHome(req: Request, res: Response) {
    const { removeID } = req.query || null;
    const { salir } = req.query || null;

    if (salir) {
      res.clearCookie("access_token").redirect("/view/login");
    }

    if (removeID) {
      Store.eliminar_access_code(removeID).then(() => {
        res.redirect("/view/home");
      });
    }

    Store.list_access_code()
      .then((data) => {
        res.render("index.pug", { data: data });
      })
      .catch((err) => console.log(`Error en listar los access-code: ${err}`));
  }

  CreateCode(req: Request, res: Response) {
    const { tipo } = req.body || null;

    Store.crear_access_code(tipo)
      .then((data) => {
        res.redirect("/view/home");
      })
      .catch((err) => {
        console.log(`Error en crear code remote admin: ${err}`);
      });
  }

  VerificarCode(req: Request, res: Response) {
    const { code } = req.params || null;

    Store.verificar_code(code)
      .then((data) => {
        if (data == 0) {
          Respuesta.success(
            req,
            res,
            { feeback: "Acceso invalido, el codigo de acceso es incorrecto" },
            200
          );
        } else {
          Respuesta.success(
            req,
            res,
            { feeback: "Acceso concedido", info: data },
            200
          );
        }
      })
      .catch((err) => {
        Respuesta.error(
          req,
          res,
          { feeback: "Acceso invalido" },
          500,
          "Error en verificar code Home"
        );
      });
  }

  ruta() {
    this.router.get("/", comprobar, this.VistaHome);
    this.router.get("/verificar/:code", this.VerificarCode);
    this.router.post("/", this.CreateCode);
  }
}

let vista = new HomeView();
export default vista.router;
