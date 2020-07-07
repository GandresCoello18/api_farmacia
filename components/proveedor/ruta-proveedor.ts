import { Request, Response, Router } from "express";
import Store from "./Store-proveedor";
import Respuesta from "../../network/response";
import { Proveedor_INT } from "../../interface/index";
const { comprobar } = require("../util/util-login");
import { v4 as uuidv4 } from "uuid";

class Proveedor {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  mostrar_proveedores(req: Request, res: Response) {
    Store.mostrar_proveedor()
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error al mostrar proveedor");
      });
  }

  crear_proveedor(req: Request, res: Response) {
    const { nombres, id_laboratorio, correo, telefono } = req.body || null;

    const obj: Proveedor_INT = {
      id_proveedor: uuidv4(),
      nombres,
      id_laboratorio,
      correo,
      telefono,
    };

    Store.add_proveedor(obj)
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error al crear proveedor");
      });
  }

  eliminar_proveedor(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_proveedor } = req.params || null;

      Store.eliminar_proveedor(id_proveedor)
        .then((data) => {
          Respuesta.success(req, res, data, 200);
        })
        .catch((err) => {
          Respuesta.error(req, res, err, 500, "Error al eliminar proveedor");
        });
    } else {
      Respuesta.success(
        req,
        res,
        { feeback: "Estos datos ya son existentes" },
        200
      );
    }
  }

  ruta() {
    this.router.post("/", this.crear_proveedor);
    this.router.get("/", this.mostrar_proveedores);
    this.router.delete("/:id_proveedor", comprobar, this.eliminar_proveedor);
  }
}

let proveedor = new Proveedor();
export default proveedor.router;
