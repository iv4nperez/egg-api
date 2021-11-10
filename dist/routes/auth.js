"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_Fields_1 = require("../middleware/validate-Fields");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('correo', 'El correo es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es oblitatoria').not().isEmpty(),
    validate_Fields_1.validateField
], auth_1.login);
// router.post('/google',[
//     check('id_token','El id_token es necesario').not().isEmpty(),
//     validateField
// ],  googleSignin );
exports.default = router;
//# sourceMappingURL=auth.js.map