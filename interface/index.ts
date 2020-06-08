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
  id_producto?: string;
  imagen: string;
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
}
