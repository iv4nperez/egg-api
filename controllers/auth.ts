import { Request, Response } from "express";

// import { googleVerify } from "../helpers/google-verify";
import { loginAuth } from "../services/auth";

export const login = async (req: Request, res: Response ) => {
    const { correo, password} = req.body;

    try {
        //verificar si el email existe
        const result = await loginAuth( correo, password)

        if ( !result.isCorrect ) {
            res.status(400).json({
                message: result.menssage
            });
        }
        
        res.json(result);

    } catch (error) {

        res.status(500).json({
            msg:'Hable con el administrador'
        });
    }
}


// const googleSignin = async ( req: Request, res: Response ) => {
//     const { id_token } = req.body;

    
//     try {
        
//         const { correo, img, nombre } = await googleVerify( id_token );

//         let usuario = await Usuario.findOne({ correo });

//         if ( !usuario ){
//             //crear usuario
//             const data = {
//                 nombre,
//                 correo,
//                 img,
//                 password:':p',
//                 google:true,
//             };

//             usuario = new Usuario( data );
//             await usuario.save();
//         }

//         if ( !usuario.estado ){
//             return res.status(401).json({
//                 msg:'Hable con el administrador, usuario bloqueado'
//             })
//         }

//         //generar JWT
//         const token = await generarJWT( usuario.id );

//         res.json({
//             usuario,
//             token
//         })

//     } catch (error) {
//         console.log( error )
//         res.status(400).json({
//             msg:'Token de google no es válido'
//         })
//     }


    

// }
