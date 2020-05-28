import { Request, Response, Router } from "express";
import Store from "./store-email";
import StoreUser from "../user/store-usuario";
import Respuestas from "../../network/response";
import id from "shortid";
import { Email_INT } from "../../interface/index";

class Email {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  crearHash(req: Request, res: Response) {
    const { id_user } = req.body || null;

    Store.validar_id_user_existente(id_user)
      .then((data) => {
        if (data != 0) {
          Store.borrar_hash(id_user).then(() =>
            console.log("Hash existente eliminado")
          );
        }

        let obj: Email_INT = {
          id_user,
          hash: id.generate(),
        };

        Store.crear_hash(obj)
          .then((data) => {
            Respuestas.success(req, res, data, 200);
          })
          .catch((err) => {
            Respuestas.error(
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

  borrarHash(req: Request, res: Response) {
    const { id_user } = req.params || null;

    Store.borrar_hash(id_user)
      .then((data) => {
        Respuestas.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuestas.error(
          req,
          res,
          err,
          500,
          "Error al eliminar el hash para la verificacion de email"
        );
      });
  }

  verificar_hash(req: Request, res: Response) {
    const { hash } = req.params || null;

    Store.verificar_hash(hash)
      .then((data: any) => {
        if (data != 0) {
          StoreUser.verificar_email(data[0].id_user)
            .then(() => console.log("Virificado en la data base"))
            .catch((err) => console.log("no verificado data base " + err));

          Store.borrar_hash(data[0].id_user).then(() =>
            console.log("Se elimino el hash")
          );

          Respuestas.success(req, res, "Email verificado exitosamente", 200);
        } else {
          Respuestas.success(
            req,
            res,
            "Ocurrio un error al verificar el email o ya fue verificado",
            200
          );
        }
      })
      .catch((err) => {
        Respuestas.error(req, res, err, 500, "Error al verificar el hash");
      });
  }

  verificar_email(req: Request, res: Response) {
    const { email } = req.params || null;

    Store.veridicar_email(email)
      .then((data) => {
        Respuestas.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuestas.error(req, res, err, 500, "Error en verificar el email_on");
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
export default email.router;
