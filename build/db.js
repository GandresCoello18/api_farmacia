"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const { config } = require("./config/index");
class Mysql {
  constructor() {
    this.conectar();
  }
  conectar() {
    var connection = mysql_1.default.createConnection({
      host: config.dbHost,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
    });
    connection.connect((err) => {
      if (err) {
        console.error(new Error(err));
      } else {
        console.log("conectado con exito");
      }
    });
    connection.on("err", (err) => {
      if (err) console.log(err);
    });
    return connection;
  }
}
let dataBase = new Mysql();
exports.default = dataBase.conectar();
/*import mysql from "mysql";
const { config } = require("./config/index");

class Mysql {
  constructor() {
    this.conectar();
  }

  conectar() {
    const configuracion: any = mysql.createConnection({
      host: "sql9.freemysqlhosting.net", //config.dbHost,
      port: 3306,
      user: "sql9348145", //config.dbUser,
      password: "w46R3ayw1n", //config.dbPassword,
      database: "sql9348145", //config.dbName,
      socketPath: "socketpath/mysql.sock",
    });

    const connection = mysql.createConnection(configuracion);

    connection.connect(function (err) {
      if (err) {
        console.log("error when connecting to db:", err);
        //setTimeout(handleDisconnect, 2000);
        connection.on("error", function (err) {
          console.log("db error", err);
          if (err.code === "PROTOCOL_CONNECTION_LOST") {
            dataBase.conectar();
          } else {
            throw err;
          }
        });
      }
      //handleDisconnect();
      console.log("db conectada");
    });

    return connection;
  }
}

let dataBase = new Mysql();
export default dataBase.conectar();*/