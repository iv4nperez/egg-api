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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosPatch = exports.usuariosDelete = exports.usuarioGetValidCorreo = exports.usuariosPut = exports.usuariosPost = exports.usuariosGetByCorreo = exports.usuariosGet = void 0;
const generar_jwt_1 = require("../helpers/generar-jwt");
const bcryptjs = require('bcryptjs');
const usuario_1 = __importDefault(require("../models/usuario"));
const usuariosGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { estado: true };
    const { limite = 10, desde = 0 } = req.query;
    const [total, usuarios] = yield Promise.all([
        usuario_1.default.countDocuments(query),
        usuario_1.default.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({ total, usuarios });
});
exports.usuariosGet = usuariosGet;
const usuariosGetByCorreo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo } = req.query;
    const query = { estado: true, creadoPor: correo };
    const { limite = 10, desde = 0 } = req.query;
    const [total, usuarios] = yield Promise.all([
        usuario_1.default.countDocuments(query),
        usuario_1.default.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({ total, usuarios });
});
exports.usuariosGetByCorreo = usuariosGetByCorreo;
const usuariosPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, correo, creadoPor, password, dni, } = req.body;
    const { generateToken } = req.query;
    let rol_user;
    if (creadoPor === 'eggApplication') {
        rol_user = "ADMIN_ROLE";
    }
    else {
        rol_user = "USER_ROLE";
    }
    const usuario = new usuario_1.default({ nombre, apellido, dni, creadoPor, correo, password, rol: rol_user });
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //Guardar en base de datos
    yield usuario.save();
    let tokenUser;
    console.log(generateToken);
    if (generateToken === "true") {
        tokenUser = yield (0, generar_jwt_1.generarJWT)(usuario === null || usuario === void 0 ? void 0 : usuario.id);
    }
    res.json({
        usuario,
        token: tokenUser
    });
});
exports.usuariosPost = usuariosPost;
const usuariosPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id, password, google, correo, rol, estado, creadoPor } = _a, resto = __rest(_a, ["_id", "password", "google", "correo", "rol", "estado", "creadoPor"]);
    yield usuario_1.default.findByIdAndUpdate(id, resto);
    const user = yield usuario_1.default.findById(id);
    res.json(user);
});
exports.usuariosPut = usuariosPut;
const usuarioGetValidCorreo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo } = req.params;
    const result = yield usuario_1.default.find({ correo: correo, estado: true });
    if (result.length > 0) {
        res.json({
            correoEnUso: true,
            message: 'El correo ya se encuentra registrado, Intenta con uno diferente'
        });
    }
    else {
        res.json({
            correoEnUso: false,
            message: ''
        });
    }
});
exports.usuarioGetValidCorreo = usuarioGetValidCorreo;
const usuariosDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByIdAndUpdate(id, { estado: false });
    res.json(usuario);
});
exports.usuariosDelete = usuariosDelete;
const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - controlador'
    });
};
exports.usuariosPatch = usuariosPatch;
//# sourceMappingURL=usuario.js.map