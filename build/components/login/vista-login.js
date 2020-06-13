"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_login_1 = __importDefault(require("./store-login"));
const { config } = require("../../config/index");
const { comprobar } = require("../util/util-login-admin");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class LOGINView {
  constructor() {
    this.router = express_1.Router();
    this.ruta();
  }
  VistaLoing(req, res) {
    if (res.locals.tipo_user) {
      res.redirect("/view/home");
    }
    res.render("login.pug", { feeback: "" });
  }
  autenticar(req, res) {
    const { email, password } = req.body || null;
    store_login_1.default
      .validar_credenciales(email)
      .then((data) =>
        __awaiter(this, void 0, void 0, function* () {
          if (data == 0) {
            res.render("login.pug", {
              feeback: "Los Datos que ingreso son incorrectos",
            });
          } else {
            if (data[0].email_on == 0 || data[0].email_on == false) {
              res.render("login.pug", {
                feeback: "Este email no esta verificado",
              });
            } else {
              if (
                yield bcryptjs_1.default.compare(password, data[0].password)
              ) {
                let save = {
                  id_user: data[0].id_user,
                  tipo_user: data[0].tipo_user,
                };
                const token = jsonwebtoken_1.default.sign(
                  save,
                  config.jwtSecretAdmin
                );
                res.cookie("access_token", token).redirect("/view/home");
              } else {
                res.render("login.pug", {
                  feeback: "Los Datos que ingreso son incorrectos",
                });
              }
            }
          }
        })
      )
      .catch((err) => {
        console.log(new Error(err) + " Error en validar el usuario de la db");
      });
  }
  ruta() {
    this.router.get("/", comprobar, this.VistaLoing);
    this.router.post("/", this.autenticar);
  }
}
let vista = new LOGINView();
exports.default = vista.router;
