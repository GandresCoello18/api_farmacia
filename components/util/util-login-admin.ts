import { Request, Response, NextFunction, Router } from "express";
import jwt from "jsonwebtoken";
const { config } = require("../../config/index");

const comprobar = Router();

comprobar.use((req: Request, res: Response, next: NextFunction) => {
  const token: String | any = req.cookies.access_token;
  console.log(token);

  if (token) {
    jwt.verify(token, config.jwtSecretAdmin, (err: any, decoded: any) => {
      if (err) {
        console.log(err);
        res.render("login.pug", {
          feeback: "Token inválida o expirada",
        });
      } else {
        /*console.log(decoded);
        if (decoded.tipo_user != "admin") {
          res.render("login.pug", {
            feeback: "No tienes permisos para navegar aqui!",
          });
        }*/
        res.locals.tipo_user = decoded.tipo_user;
        next();
      }
    });
  } else {
    res.render("login.pug", {
      feeback: "Token no proveída o no ingresada",
    });
  }
});

module.exports = {
  comprobar,
};
