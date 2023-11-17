"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const setupDb_1 = __importDefault(require("./main/db/setupDb"));
const userRoutes_1 = __importDefault(require("./main/routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use("/api", userRoutes_1.default);
app.listen(process.env.PORT, () => {
    const dbString = process.env.DB_STRING;
    (0, setupDb_1.default)(dbString);
    return console.log(`Express is  at http://localhost:${process.env.PORT}`);
});
