"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { config } = require("../../config/index");
const comprobar = express_1.Router();
comprobar.use((req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (token) {
    jsonwebtoken_1.default.verify(
      token,
      config.jwtSecretAdmin,
      (err, decoded) => {
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
      }
    );
  } else {
    res.render("login.pug", {
      feeback: "Token no proveída o no ingresada",
    });
  }
});
module.exports = {
  comprobar,
};
