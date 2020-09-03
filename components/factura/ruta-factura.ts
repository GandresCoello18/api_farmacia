import { Request, Response, Router } from "express";
import Store from "./Store-factura";
import { obtener_facturas_ventas } from "./hooks";
import StoreVenta from "../ventas/Store-ventas";
import StoreProduct from "../producto/Store-producto";
import ResponseFact from "../factura/response/factura";
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
      total,
      efectivo = 0,
      cambio = 0,
      carrito,
    } = req.body || null;

    const obj: Factura_INT = {
      id_factura: uuidv4(),
      id_cliente,
      fecha_factura: Fecha.fecha_con_hora_actual(),
      descripcion,
      descuento,
      total,
      efectivo,
      cambio,
      carrito,
    };

    if (obj.id_cliente == "") {
      obj.id_cliente = "b1fd154a-d4a2-42a0-b7a1-e4e6b0ffa479";
    }
    if (obj.descripcion == "") obj.descripcion = "Sin descripcion";

    Store.add_factura(obj)
      .then(async () => {
        for (let i = 0; i < obj.carrito.length; i++) {
          let objVenta: Producto_Factura_INT = {
            id_producto_fac: uuidv4(),
            id_producto: obj.carrito[i].producto.id_producto,
            id_factura: obj.id_factura,
            formato: `${obj.carrito[i].formato}`,
            cantidad: Number(obj.carrito[i].cantidad),
            item_total: Number(obj.carrito[i].total),
            iva: Number(obj.carrito[i].iva),
          };

          StoreVenta.add_venta(objVenta)
            .then(() => {
              //Respuesta.success(req, res, data, 200);
              console.log("Venta Registrada");
            })
            .catch((err) => {
              console.log("Error al crear venta: " + err.message);
            });

          StoreProduct.producto_unico(obj.carrito[i].producto.id_producto).then(
            (data: any) => {
              if (data == 0) {
                console.log("No hay productos para modificar las unidades");
              } else {
                let estado: string = "";
                let nueva_cantidad = 0;

                if (obj.carrito[i].formato === "paquete") {
                  nueva_cantidad =
                    Number(data[0].cantidad_disponible) -
                    Number(obj.carrito[i].producto.cantidad);
                } else {
                  nueva_cantidad =
                    Number(data[0].cantidad_disponible) -
                    Number(obj.carrito[i].cantidad);
                }

                if (nueva_cantidad == 0) {
                  estado = "Vendido";
                } else {
                  estado = "Aun disponible";
                }

                StoreProduct.cambiar_status_producto(
                  obj.carrito[i].producto.id_producto,
                  estado
                )
                  .then(() => {
                    console.log("Se cambio el estado del producto");
                    //return Respuesta.success(req, res, data, 200);
                  })
                  .catch((err) => {
                    console.log(
                      "Error al cambiar estado producto: " + err.message
                    );
                  });

                StoreProduct.cambiar_cantidad_de_unidades_producto(
                  obj.carrito[i].producto.id_producto,
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
        }

        const resFact = await ResponseFact.responder_factura(obj.id_factura);
        const factura = await obtener_facturas_ventas(resFact);
        Respuesta.success(req, res, factura, 200);
      })
      .catch((err) => {
        Respuesta.error(
          req,
          res,
          err,
          500,
          "Error en crear factura " + err.message
        );
      });
  }

  traer_facturas(req: Request, res: Response) {
    const { fecha_factura } = req.params || null;

    Store.traer_facturas(fecha_factura)
      .then(async (data) => {
        const factura = await obtener_facturas_ventas(data);
        Respuesta.success(req, res, factura, 200);
      })
      .catch((err) => {
        Respuesta.error(req, res, err, 500, "Error en traer facturas");
      });
  }

  monto_total_por_fecha(req: Request, res: Response) {
    const { fecha } = req.params || null;

    Store.monto_total_por_fecha(fecha)
      .then((data) => {
        Respuesta.success(req, res, data, 200);
      })
      .catch((err) => {
        Respuesta.error(
          req,
          res,
          err,
          500,
          "Error en mostrar monto total por fecha"
        );
      });
  }

  eliminar_factura(req: Request, res: Response) {
    if (res.locals.datos_user.tipo_user == "Administrador") {
      const { id_factura } = req.params || null;

      Store.eliminar_factura(id_factura)
        .then((data) => {
          Respuesta.success(req, res, { removed: true }, 200);
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
    this.router.get("/monto_total/:fecha", this.monto_total_por_fecha);
    this.router.get("/:fecha_factura", this.traer_facturas);
    this.router.delete("/:id_factura", comprobar, this.eliminar_factura);
  }
}

let cliente = new Factura();
export default cliente.router;
