"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateField = void 0;
const express_validator_1 = require("express-validator");
const validateField = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
exports.validateField = validateField;
//# sourceMappingURL=validate-Fields.js.map