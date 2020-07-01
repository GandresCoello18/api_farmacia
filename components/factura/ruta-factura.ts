import { Request, Response, Router } from "express";
import Store from "./Store-factura";
import StoreVenta from "../ventas/Store-ventas";
import StoreProduct from "../producto/Store-producto";
import Respuesta from "../../network/response";
import { Factura_INT, Producto_Factura_INT } from "../../interface/index";
const { comprobar } = require("../util/util-login");
import Fecha from "../util/util-fecha";
import { v4 as uuidv4 } from "uuid";

class Factura {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  crear_factura(req: Request, res: Response) {
    const {
      id_cliente,
      descripcion,
      descuento,
      iva,
      total,
      efectivo = 0,
      cambio = 0,
      productos,
    } = req.body || null;

    const obj: Factura_INT = {
      id_factura: uuidv4(),
      id_cliente,
      fecha_factura: Fecha.fecha_con_hora_actual(),
      descripcion,
      descuento,
      iva,
      total,
      efectivo,
      cambio,
      productos,
    };

    if (obj.id_cliente == "") {
      obj.id_cliente = "b1fd154a-d4a2-42a0-b7a1-e4e6b0ffa479";
    }
    if (obj.descripcion == "") obj.descripcion = "Sin descripcion";

    Store.add_factura(obj)
      .then((data) => {
        for (let i = 0; i < obj.productos.length; i++) {
          let objVenta: Producto_Factura_INT = {
            id_producto_fac: uuidv4(),
            id_producto: obj.productos[i].id_producto,
            id_factura: obj.id_factura,
            formato: `${obj.productos[i].formato}`,
            cantidad: Number(obj.productos[i].unidades),
          };

          StoreVenta.add_venta(objVenta)
            .then((data) => {
              return Respuesta.success(req, res, data, 200);
            })
            .catch((err) => {
              console.log("Error al crear venta: " + err.message);
            });

          if (obj.productos[i].formato == "Por Unidad") {
            StoreProduct.producto_unico(obj.productos[i].id_producto).then(
              (data: any) => {
                if (data == 0) {
                  console.log("No hay productos para modificar las unidades");
                } else {
                  let estado: string = "";
                  let nueva_cantidad =
                    Number(data[0].cantidad) -
                    Number(obj.productos[i].unidades);

                  if (nueva_cantidad == 0) {
                    estado = "Vendido";
                  } else {
                    estado = "Aun disponible";
                  }

                  StoreProduct.cambiar_status_producto(
                    obj.productos[i].id_producto,
                    estado
                  )
                    .then((data) => {
                      return Respuesta.success(req, res, data, 200);
                    })
                    .catch((err) => {
                      console.log(
                        "Error al cambiar estado producto: " + err.message
                      );
                    });

                  StoreProduct.cambiar_cantidad_de_unidades_producto(
                    obj.productos[i].id_producto,
                    nueva_cantidad
                  )
                    .then(() => {
                      console.log(
                        "Se cambio la cantidad de unidades en producto"
                      );
                    })
                    .catch((err) => {
                      console.log(`Error: ${err.message}`);
                    });
                }
              }
            );
          } else {
            StoreProduct.cambiar_status_producto(
              obj.productos[i].id_producto,
              "Vendido"
            )
              .then((data) => {
                return Respuesta.success(req, res, data, 200);
              })
              .catch((err) => {
                console.log("Error al cambiar estado producto: " + err.message);
              });
          }
        }

        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error en crear factura");
      });
  }

  traer_facturas(req: Request, res: Response) {
    Store.traer_facturas()
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error en traer facturas");
      });
  }

  eliminar_factura(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_factura } = req.params || null;

      Store.eliminar_factura(id_factura)
        .then((data) => {
          Respuesta.success(req, res, data, 200);
        })
        .catch((err) => {
          Respuesta.error(req, res, err, 500, "Error en eliminar factura");
        });
    } else {
      Respuesta.success(
        req,
        res,
        { feeback: "No tienes permisos para estan accion" },
        200
      );
    }
  }

  ruta() {
    this.router.post("/", this.crear_factura);
    this.router.get("/", this.traer_facturas);
    this.router.delete("/:id_factura", comprobar, this.eliminar_factura);
  }
}

let cliente = new Factura();
export default cliente.router;
