import database from '../../db';
import fechas from '../util/util-fecha';
import { Usuario_INT } from '../../interface/index';


class StoreUsuario{

    async insertar_usuario(user: Usuario_INT){
        return await new Promise( (resolve, reject) => {
            database.query(`INSERT INTO usuarios (id_user, nombres, apellidos, foto, tipo_user, email, email_on, password) VALUES ('${user.id_user}', '${user.nombres}', '${user.apellidos}', '${user.foto}', '${user.tipo}', '${user.email}', ${user.email_on}, '${user.password}')`, (err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
        });
    }

    async validar_usuario_existente(email: String){
        return await new Promise( (resolve, reject) => {
            database.query(`SELECT * FROM usuarios WHERE email = '${email}' `, (err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
        });
    }

    async consultar_usuarios(){
        return await new Promise( (resolve, reject) => {
            database.query(`SELECT * FROM usuarios`, (err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
        });
    }

    async consulta_usuario(id: string){
        return await new Promise( (resolve, reject) => {
            database.query(`SELECT * FROM usuarios WHERE id_user = '${id}' `, (err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
        });
    }

    async editar_usuario(id: string, nombres: string, apellidos: string, foto: string){
        return await new Promise( (resolve, reject) => {
            database.query(`UPDATE usuarios SET nombres = '${nombres}', apellidos = '${apellidos}', foto = '${foto}' WHERE id_user = '${id}' `, (err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
        });
    }

    async eliminar_usuario(id: string){
        return await new Promise( (resolve, reject) => {
            database.query(`DELETE FROM usuarios WHERE id_user = '${id}' `, (err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
        });
    }

    async verificar_email(id: string){
        return await new Promise( (resolve, reject) => {
            database.query(`UPDATE usuarios SET email_on = 1 WHERE id_user = '${id}' `, (err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
        });
    }

}

let store = new StoreUsuario();

export default store;