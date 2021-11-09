const { response, request } = require("express")
import { Response, Request, NextFunction } from 'express'
import { IResquest } from '../interfaces/IRequestExpress';

export const esAdminRole = (req: IResquest, res: Response, next: NextFunction) => {

    if ( !req.usuario ){
        return res.status(500).json({
            msg:'Se quiere verificar el rol sin validar el token'
        });
    }

   const { rol, nombre } = req.usuario;

   if ( rol !== 'ADMIN_ROLE' ){
       return res.status(401).json({
           msg: `${ nombre } no es administrador - No puede hacer esto`
       });
   }

   next();
}

export const tieneRole = ( ...roles: string[]) => {
    return  (req: IResquest, res: Response, next: NextFunction) => {

        if ( !req.usuario ){
            return res.status(500).json({
                msg:'Se quiere verificar el rol sin validar el token'
            });
        }

        if( !roles.includes( req.usuario.rol ) ){
            return res.status(401).json({
                msg:`El servicio requiere uno de estos roles ${ roles }`
            })
        }

        next();
    }
}

