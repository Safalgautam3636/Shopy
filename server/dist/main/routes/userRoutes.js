"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_1 = __importDefault(require("../auth/signup"));
const login_1 = __importDefault(require("../auth/login"));
const logout_1 = __importDefault(require("../auth/logout"));
const userRouter = (0, express_1.Router)();
userRouter.post("/user", signup_1.default);
userRouter.get("/user", login_1.default);
userRouter.get("/user", logout_1.default);
exports.default = userRouter;
