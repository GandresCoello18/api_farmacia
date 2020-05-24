import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import indexRouter from './network/rutas';
import Usuarios from './components/user/ruta-usuario';
import Email from './components/email/ruta-email';
// import login from './components/login/ruta-login';



const { config } = require('./config/index');

class Server {
    public app: express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(){
        this.app.set('port', config.port || 4000);
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use('/static', express.static('public'));
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

    routes(){
        this.app.use('/api', indexRouter);
        this.app.use('/api/usuario', Usuarios);
        this.app.use('/api/email', Email);
        // this.app.use('/api/login', login);
    }

    start(){
        this.app.listen(this.app.get('port'), () => console.log('Server levantado'));
    }
}

const server = new Server();
server.start();