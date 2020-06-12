import { Request, Response, Router } from "express";
import Store from "./Store-cliente";
import Respuesta from "../../network/response";
import { Cliente_INT } from "../../interface/index";
const { comprobar } = require("../util/util-login");
import { v4 as uuidv4 } from "uuid";

class Cliente {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  crear_cliente(req: Request, res: Response) {
    const { nombre, apellido, identificacion, correo, direccion } =
      req.body || null;

    Store.validar_cliente_existente(identificacion, correo)
      .then((data: any) => {
        if (data.length == 0) {
          const obj: Cliente_INT = {
            id_cliente: uuidv4(),
            nombre,
            apellido,
            identificacion,
            correo,
            direccion,
          };

          Store.add_cliente(obj)
            .then((data) => {
              Respuesta.success(req, res, data, 200);
            })
            .catch((err) => {
              Respuesta.error(req, res, err, 500, "Error en crear cliente");
            });
        } else {
          Respuesta.success(
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

  mostrar_clientes(req: Request, res: Response) {
    Store.listar_clientes()
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error en listar los clientes");
      });
  }

  eliminar_cliente(req: Request, res: Response) {
    const { id_cliente } = req.params || null;

    Store.borrar_cliente(id_cliente)
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error en eliminar cliente");
      });
  }

  ruta() {
    this.router.post("/", this.crear_cliente);
    this.router.get("/", this.mostrar_clientes);
    this.router.delete("/:id_cliente", this.eliminar_cliente);
  }
}

let cliente = new Cliente();
export default cliente.router;
