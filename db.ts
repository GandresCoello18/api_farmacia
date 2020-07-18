import mysql from "mysql";
const { config } = require("./config/index");

class Mysql {
  constructor() {
    this.conectar();
  }

  conectar() {
    const connection = mysql.createConnection({
      host: "databasefj.c8twgaydusab.us-east-2.rds.amazonaws.com", //config.dbHost,
      user: "andresco_fj", //config.dbUser,
      password: "r2Z63EhRKqQ3atu", //"KFsVqyQMmxgV7eH", //config.dbPassword,
      database: "databaseFJ", //config.dbName,
      port: 3306,
    });

    connection.connect((err: any) => {
      if (err) {
        console.error(new Error(err));
      } else {
        console.log("conectado con exito");
      }
    });

    connection.on("err", (err: any) => {
      if (err) console.log(err);
    });

    return connection;
  }
}

let dataBase = new Mysql();
export default dataBase.conectar();
