import { Router } from "express";
import { check } from "express-validator";
import { esRoleValido, existeEmail, existeUsuarioPorId } from "../helpers/validator";
import { validarJWT } from '../middleware/validate-jwt'
import { validateField } from '../middleware/validate-Fields'
import { usuariosPost, usuariosPut, usuariosDelete, usuariosGetByCorreo, usuarioGetValidCorreo } from "../controllers/usuario";

const router = Router();

router.get('/', [
    validarJWT
], usuariosGetByCorreo);

router.get('/validarCorreo/:correo', usuarioGetValidCorreo)

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mas de  6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existeEmail),
    check('rol').custom(esRoleValido),
    validateField
], usuariosPost);

router.post('/registroUsuario', [
    // validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mas de  6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existeEmail),
    check('rol').custom(esRoleValido),
    validateField
], usuariosPost );

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validateField
], usuariosPut);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validateField
], usuariosDelete);



export default router;