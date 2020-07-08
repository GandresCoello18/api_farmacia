export interface Usuario_INT {
  id_user?: string;
  nombres: string;
  apellidos: string;
  foto?: string;
  tipo: string;
  email: string;
  email_on: boolean;
  password: string;
}

export interface Email_INT {
  id_user: string | any;
  hash: string;
}

export interface History_session_INT {
  id_user: string;
  fecha_session: any;
}

export interface Producto_INT {
  id_producto: string;
  id_name_product: number;
  id_name_laboratorio: number;
  cantidad: number;
  presentacion: string;
  lote: string;
  registro_sanitario: string;
  dosis: number;
  tipo_dosis: string;
  fecha_elaboracion: string;
  fecha_caducidad: string;
  pvp: number;
  pvf: number;
  estado?: string | "Disponible" | "Aun disponible" | "Vendido" | "Caducado";
  id_principio_activo: number;
  formato?: string;
  unidades?: number;
  item_total?: number;
}

export interface Cliente_INT {
  id_cliente: string;
  nombre: string;
  apellido: string;
  identificacion: number;
  correo: string;
  direccion: string;
}

export interface Factura_INT {
  id_factura: string;
  id_cliente: string;
  fecha_factura: string;
  descripcion: string;
  descuento: number;
  iva: number;
  total: number;
  efectivo: number;
  cambio: number;
  productos: Array<Producto_INT>;
}

export interface Producto_Factura_INT {
  id_producto_fac: string;
  id_producto: string;
  id_factura: string;
  formato: string;
  cantidad: number;
  item_total: number;
}

export interface Proveedor_INT {
  id_proveedor: string;
  nombres: string;
  id_laboratorio: number;
  correo: string;
  telefono: number;
}

export interface Producto_proveedor_INT {
  id_product_proveedor: string;
  descripcion: string;
  fecha_pago: string;
  fecha_ingreso: string;
  total: number;
  id_proveedor: string;
  estado_pp: string;
}
