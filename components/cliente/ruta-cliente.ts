import { Request, Response, Router } from "express";
import Store from "./Store-cliente";
import Respuesta from "../../network/response";
import multer from "multer";
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

  ruta() {
    this.router.post("/", this.crear_cliente);
    this.router.get("/", this.mostrar_clientes);
  }
}

let cliente = new Cliente();
export default cliente.router;
