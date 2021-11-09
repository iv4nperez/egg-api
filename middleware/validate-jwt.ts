import { Response, Request, NextFunction } from 'express'


const jwt = require('jsonwebtoken');
import Usuario from '../models/usuario';



export const validarJWT = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //leer usuario que corresponde al uid
        const usuario = await Usuario.findById(uid)

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            });
        }
        //verificar si  uid tiene estado en true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            });
        }

        // req.usuario = usuario;

        next();
    } catch (error) {
    
        res.status(401).json({
            isCorrect: false,
            msg: 'Token no valido'
        })
    }



}

