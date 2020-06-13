import mysql from "mysql";
const { config } = require("./config/index");

class Mysql {
  constructor() {
    this.conectar();
  }

  conectar() {
    const configuracion: any = mysql.createConnection({
      host: config.dbHost,
      port: 3306,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
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
export default dataBase.conectar();
