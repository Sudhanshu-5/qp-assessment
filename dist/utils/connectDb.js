"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const mysql2_1 = require("mysql2");
const poolConfig = {
    host: "localhost",
    user: "root",
    password: "1234",
    database: "grocery_store",
    waitForConnections: true,
    connectionLimit: 5,
};
exports.pool = (0, mysql2_1.createPool)(poolConfig);
