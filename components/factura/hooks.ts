import { Factura_INT } from "../../interface";
import StoreVenta from "../ventas/Store-ventas";

export async function obtener_facturas_ventas(
  Storefactura: Array<Factura_INT>
) {
  let factura: Array<any> = [];
  for (let i = 0; i < Storefactura.length; i++) {
    const ventas = await StoreVenta.traer_venta(Storefactura[i].id_factura);
    let fac = Storefactura[i];
    factura.push({ ...fac, carrito: ventas });
  }
  return factura;
}
