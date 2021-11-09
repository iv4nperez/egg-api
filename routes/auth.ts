import { Router } from "express";
import { check } from "express-validator";

import { validateField } from '../middleware/validate-Fields'
import { login } from '../controllers/auth'


const router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña es oblitatoria').not().isEmpty(),
    validateField
],  login);

// router.post('/google',[
//     check('id_token','El id_token es necesario').not().isEmpty(),
//     validateField
// ],  googleSignin );


export default router;