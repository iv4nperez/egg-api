"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validator_1 = require("../helpers/validator");
const validate_jwt_1 = require("../middleware/validate-jwt");
const validate_Fields_1 = require("../middleware/validate-Fields");
const usuario_1 = require("../controllers/usuario");
const router = (0, express_1.Router)();
router.get('/', [
    validate_jwt_1.validarJWT
], usuario_1.usuariosGetByCorreo);
router.get('/validarCorreo/:correo', usuario_1.usuarioGetValidCorreo);
router.post('/', [
    validate_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'El password debe ser mas de  6 letras').isLength({ min: 6 }),
    (0, express_validator_1.check)('correo', 'El correo no es valido').isEmail(),
    (0, express_validator_1.check)('correo').custom(validator_1.existeEmail),
    (0, express_validator_1.check)('rol').custom(validator_1.esRoleValido),
    validate_Fields_1.validateField
], usuario_1.usuariosPost);
router.post('/registroUsuario', [
    // validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'El password debe ser mas de  6 letras').isLength({ min: 6 }),
    (0, express_validator_1.check)('correo', 'El correo no es valido').isEmail(),
    (0, express_validator_1.check)('correo').custom(validator_1.existeEmail),
    (0, express_validator_1.check)('rol').custom(validator_1.esRoleValido),
    validate_Fields_1.validateField
], usuario_1.usuariosPost);
router.put('/:id', [
    validate_jwt_1.validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(validator_1.existeUsuarioPorId),
    validate_Fields_1.validateField
], usuario_1.usuariosPut);
router.delete('/:id', [
    validate_jwt_1.validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(validator_1.existeUsuarioPorId),
    validate_Fields_1.validateField
], usuario_1.usuariosDelete);
exports.default = router;
//# sourceMappingURL=usuario.js.map