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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAuth = void 0;
const bcryptjs = require('bcryptjs');
const usuario_1 = __importDefault(require("../models/usuario"));
const generar_jwt_1 = require("../helpers/generar-jwt");
const Response_1 = require("../helpers/Response");
const loginAuth = (correo, password) => __awaiter(void 0, void 0, void 0, function* () {
    let resutl = new Response_1.ResultLogin({}, '', false);
    try {
        const usuario = yield usuario_1.default.findOne({ correo });
        if (!usuario) {
            resutl.menssage = 'Usuario o contraseña no es correcto';
            return resutl;
        }
        //verificar si el usuario esta activo
        if (!(usuario === null || usuario === void 0 ? void 0 : usuario.estado)) {
            resutl.menssage = 'Su usuario esta dado de baja consulte con el admin';
            return resutl;
        }
        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario === null || usuario === void 0 ? void 0 : usuario.password);
        if (!validPassword) {
            resutl.menssage = 'Usuario o contraseña no es correcto';
            return resutl;
        }
        //generar JWT
        const token = yield (0, generar_jwt_1.generarJWT)(usuario === null || usuario === void 0 ? void 0 : usuario.id);
        resutl.isCorrect = true;
        resutl.result = usuario;
        resutl.menssage = 'Login exitoso',
            resutl.token = token;
    }
    catch (error) {
        resutl.isCorrect = false;
        resutl.menssage = error.message;
    }
    return resutl;
});
exports.loginAuth = loginAuth;
//# sourceMappingURL=auth.js.map