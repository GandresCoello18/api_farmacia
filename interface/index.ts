export interface Usuario_INT {
    id_user?: string;
    nombres: string;
    apellidos: string;
    foto?: string;
    tipo: string;
    email: string;
    email_on: boolean;
    password: string
}

export interface Email_INT {
    id_user: string | any,
    hash: string
}