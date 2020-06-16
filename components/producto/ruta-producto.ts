import { Request, Response, Router } from "express";
import Store from "./Store-producto";
import Respuesta from "../../network/response";
import multer from "multer";
import { Producto_INT } from "../../interface/index";
const { comprobar } = require("../util/util-login");
import { v4 as uuidv4 } from "uuid";
import { strict } from "assert";

class Producto {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  store_file() {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./public/productos");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });

    const fileFilter = (
      req: any,
      file: { mimetype: string },
      cb: (arg0: null, arg1: boolean) => void
    ) => {
      if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };

    const upload = multer({
      storage: storage,
      limits: { fileSize: 1024 * 1024 * 5 },
      fileFilter: fileFilter,
    });

    return upload;
  }

  async create_name_product(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { name_product } = req.body || null;

      Store.add_name_product(name_product)
        .then((data) => {
          Respuesta.success(req, res, data, 201);
        })
        .catch((err) => {
          Respuesta.error(req, res, err, 500, "Error en crear name_product");
        });
    } else {
      Respuesta.success(
        req,
        res,
        { feeback: "No tienes permisos aqui..!" },
        200
      );
    }
  }

  async create_name_laboratorio(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { name_laboratorio } = req.body || null;

      Store.add_name_laboratorio(name_laboratorio)
        .then((data) => {
          Respuesta.success(req, res, data, 201);
        })
        .catch((err) => {
          Respuesta.error(
            req,
            res,
            err,
            500,
            "Error en crear name_laboratorio"
          );
        });
    } else {
      Respuesta.success(
        req,
        res,
        { feeback: "No tienes permisos aqui..!" },
        200
      );
    }
  }

  mostrar_name_productos(req: Request, res: Response) {
    Store.listar_name_producto()
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error al mostrar name product");
      });
  }

  mostrar_name_laboratorio(req: Request, res: Response) {
    Store.listar_name_laboratorio()
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(
          req,
          res,
          err,
          500,
          "Error al mostrar name laboratorio"
        );
      });
  }

  create_product(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const {
        id_name_product,
        id_name_laboratorio,
        cantidad,
        presentacion,
        lote,
        registro_sanitario,
        dosis,
        tipo_dosis,
        fecha_elaboracion,
        fecha_caducidad,
        pvp,
        pvf,
        id_principio_activo,
      } = req.body || null;

      const obj: Producto_INT = {
        id_producto: uuidv4(),
        id_name_product,
        id_name_laboratorio,
        cantidad,
        presentacion,
        lote,
        registro_sanitario,
        dosis,
        tipo_dosis,
        fecha_elaboracion,
        fecha_caducidad,
        pvp,
        pvf,
        estado: "Disponible",
        id_principio_activo,
      };

      Store.add_product(obj)
        .then((data) => {
          Respuesta.success(req, res, data, 200);
        })
        .catch((err) => {
          Respuesta.error(
            req,
            res,
            err,
            500,
            `Error al crear producto: ${err}`
          );
        });
    } else {
      Respuesta.success(
        req,
        res,
        { feeback: "No tienes permisos aqui..!" },
        200
      );
    }
  }

  mostrar_productos(req: Request, res: Response) {
    Store.listar_producto()
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error en mostrar productos");
      });
  }

  eliminar_producto(req: Request, res: Response) {
    const { id_producto } = req.params || null;

    Store.eliminar_producto(id_producto)
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error en eliminar producto");
      });
  }

  create_principio_activo(req: Request, res: Response) {
    const { name_principio_activo } = req.body || null;

    Store.add_principio_activo(name_principio_activo)
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error en crear principio activo");
      });
  }

  mostrar_principio_activo(req: Request, res: Response) {
    Store.listar_principio_activo()
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(
          req,
          res,
          err,
          500,
          "Error en mostrar principio activo"
        );
      });
  }

  ruta() {
    const upload = this.store_file();

    ///////////// nombre de laboratorio
    this.router.post(
      "/nombre_laboratorio",
      comprobar,
      this.create_name_laboratorio
    );
    this.router.get("/nombre_laboratorio", this.mostrar_name_laboratorio);
    /////////////// nombre de productos
    this.router.post("/nombre_producto", comprobar, this.create_name_product);
    this.router.get("/nombre_producto", this.mostrar_name_productos);
    /////////////// principio activo
    this.router.post(
      "/principio_activo",
      comprobar,
      this.create_principio_activo
    );
    this.router.get("/principio_activo", this.mostrar_principio_activo);
    /////////////// productos
    this.router.delete("/:id_producto", comprobar, this.eliminar_producto);
    this.router.post("/", comprobar, this.create_product);
    this.router.get("/", this.mostrar_productos);
  }
}

let producto = new Producto();
export default producto.router;
