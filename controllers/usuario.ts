import { Response, Request } from 'express'
import { generarJWT } from '../helpers/generar-jwt';
const bcryptjs = require('bcryptjs');

import Usuario from '../models/usuario';

export const usuariosGet = async (req: Request, res: Response): Promise<void> => {

    const query = { estado: true };
    const { limite = 10, desde = 0 } = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({ total, usuarios });
}

export const usuariosGetByCorreo = async (req: Request, res: Response): Promise<void> => {

    const { correo } = req.query;

    const query = { estado: true, creadoPor: correo };
    const { limite = 10, desde = 0 } = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({ total, usuarios });
}

export const usuariosPost = async (req: Request, res: Response): Promise<void> => {

    const { nombre, apellido, correo, creadoPor, password, dni, } = req.body;
    const { generateToken } = req.query;



    let rol_user: string;
    if (creadoPor === 'eggApplication') {
        rol_user = "ADMIN_ROLE"
    } else {
        rol_user = "USER_ROLE"
    }

    const usuario = new Usuario({ nombre, apellido, dni, creadoPor, correo, password, rol: rol_user });
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en base de datos
    await usuario.save();
    let tokenUser;
    console.log(generateToken)
    if (generateToken === "true") {
        tokenUser = await generarJWT(usuario?.id);
    }

    res.json({
        usuario,
        token: tokenUser
    });
}

export const usuariosPut = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { _id, password, google, correo, rol, estado, creadoPor, ...resto } = req.body;
    await Usuario.findByIdAndUpdate(id, resto);

    const user = await Usuario.findById(id)

    res.json(user);
}

export const usuarioGetValidCorreo = async ( req: Request, res: Response ) => {
    const { correo } = req.params;
    const result = await Usuario.find({ correo: correo, estado: true })

    if( result.length > 0 ){
        res.json({
            correoEnUso: true,
            message: 'El correo ya se encuentra registrado, Intenta con uno diferente'
        })
    } else {
        res.json({
            correoEnUso: false,
            message: ''
        })
    }

}

export const usuariosDelete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json(usuario);
}

export const usuariosPatch = (req: Request, res: Response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}

