"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultLogin = exports.Response = void 0;
class Response {
    constructor(result, count, isCorrect) {
        this.result = result;
        this.count = count;
        this.isCorrect = isCorrect;
    }
}
exports.Response = Response;
class ResultLogin {
    constructor(result, menssage, isCorrect, token) {
        this.result = result;
        this.menssage = menssage;
        this.isCorrect = isCorrect;
        this.token = token;
    }
}
exports.ResultLogin = ResultLogin;
//# sourceMappingURL=Response.js.map