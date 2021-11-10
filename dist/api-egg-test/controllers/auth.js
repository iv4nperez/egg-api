"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
// import { googleVerify } from "../helpers/google-verify";
const auth_1 = require("../services/auth");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    try {
        //verificar si el email existe
        const result = yield (0, auth_1.loginAuth)(correo, password);
        if (!result.isCorrect) {
            res.status(400).json({
                message: result.menssage
            });
        }
        res.json(result);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.login = login;
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
//# sourceMappingURL=auth.js.map