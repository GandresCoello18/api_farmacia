"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  adminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
  userPassword: process.env.DEFAULT_USER_PASSWORD,
  jwtSecret: process.env.AUTH_JWT_SECRET,
  jwtSecretAdmin: process.env.AUTH_JWT_SECRET_ADMIN,
  correoGmail: process.env.CORREO_GMAIL,
  claveGmail: process.env.PASSWORD_GMAIL,
};
module.exports = { config };
