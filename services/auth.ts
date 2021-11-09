const bcryptjs = require('bcryptjs');

import Usuario from "../models/usuario";
import { generarJWT } from "../helpers/generar-jwt";
import { ResultLogin } from "../helpers/Response";

export const loginAuth = async (correo: string, password: string): Promise<ResultLogin> => {

    let resutl = new ResultLogin({}, '', false);

    try {
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {

            resutl.menssage = 'Usuario o contraseña no es correcto'
            return resutl;
        }
        //verificar si el usuario esta activo
        if (!usuario?.estado) {

            resutl.menssage = 'Su usuario esta dado de baja consulte con el admin'
            return resutl;
        }
        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario?.password);
        if (!validPassword) {
            resutl.menssage = 'Usuario o contraseña no es correcto'
            return resutl;
        }
        //generar JWT
        const token = await generarJWT(usuario?.id);

        resutl.isCorrect = true;
        resutl.result = usuario;
        resutl.menssage = 'Login exitoso',
            resutl.token = token


    } catch (error) {
        resutl.isCorrect = false;
        resutl.menssage = (error as Error).message;
    }

    return resutl;
}