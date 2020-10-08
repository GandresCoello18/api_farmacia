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
const response_1 = __importDefault(require("../../network/response"));
const store_login_1 = __importDefault(require("./store-login"));
const store_usuario_1 = __importDefault(require("../user/store-usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const util_fecha_1 = __importDefault(require("../util/util-fecha"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { comprobar } = require("../util/util-login");
const { config } = require("../../config/index");
class Login {
  constructor() {
    this.router = express_1.Router();
    this.ruta();
  }
  validar_vida_token(req, res) {
    console.log("validando el tiempo de vida del token, TOKEN ACTIVO");
    store_usuario_1.default
      .consulta_usuario(res.locals.datos_user.id_user)
      .then((user) => {
        response_1.default.success(req, res, { myUser: user }, 200);
      })
      .catch((err) => {
        response_1.default.error(
          req,
          res,
          err,
          500,
          "error en pedir datos unico user"
        );
      });
  }
  autenticar(req, res) {
    const { email, password } = req.body || null;
    store_login_1.default
      .validar_credenciales(email)
      .then((data) =>
        __awaiter(this, void 0, void 0, function* () {
          /* valida si el usuario ya exite en la base de datos */
          if (data == 0) {
            response_1.default.success(
              req,
              res,
              { feeback: "Los Datos que ingreso son incorrectos" },
              200
            );
          } else {
            if (data[0].email_on == 0 || data[0].email_on == false) {
              response_1.default.success(
                req,
                res,
                { feeback: "Este email no esta verificado" },
                200
              );
            } else {
              /* crea una serie de caracteres encriptados a partir de la clave ingresada */
              if (
                yield bcryptjs_1.default.compare(password, data[0].password)
              ) {
                let save = {
                  id_user: data[0].id_user,
                  tipo_user: data[0].tipo_user,
                };
                /* configura el token sin tiempo de expiracion */
                const token = jsonwebtoken_1.default.sign(
                  save,
                  config.jwtSecret
                );
                let history = {
                  id_user: data[0].id_user,
                  fecha_session: util_fecha_1.default.fecha_con_hora_actual(),
                };
                store_usuario_1.default
                  .create_history_session(history)
                  .then(() => {
                    console.log("historial de session registrado");
                  })
                  .catch((err) => {
                    console.log(`Error en crear history session: ${err}`);
                  });
                response_1.default.success(req, res, { token: token }, 200);
              } else {
                response_1.default.success(
                  req,
                  res,
                  { feeback: "Los Datos que ingreso son incorrectos" },
                  200
                );
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
    // LOGIN
    this.router.post("/vida-token", comprobar, this.validar_vida_token);
    this.router.post("/autenticacion", this.autenticar);
  }
}
let login = new Login();
exports.default = login.router;
