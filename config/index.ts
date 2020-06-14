import dotenv from "dotenv";
dotenv.config();

interface Tipos {
  dev: boolean;
  port: string | number | undefined;
  cors: string | undefined;
  dbUser: string | undefined;
  dbPassword: string | undefined;
  dbHost: string | undefined;
  dbName: string | undefined;
  adminPassword: String | undefined;
  userPassword: String | undefined;
  jwtSecret: String | undefined;
  jwtSecretAdmin: String | undefined;
  correoGmail: String | undefined;
  claveGmail: string | undefined;
}

const config: Tipos = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT || 7000,
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
