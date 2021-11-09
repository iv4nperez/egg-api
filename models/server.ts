import express, { Application } from 'express'
import cors from "cors";
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

const { connection } = require('../database/config');

import authRoutes from '../routes/auth';
import userRoutes from '../routes/usuario';
// import productRoutes from '../routes/product';
// import categoryRoutes from '../routes/category'

class Server {

    private app: Application;
    private port: string;
    private server: any;
    private io: any;
    
    private apiPaths = {
        auth:     '/api/auth',
        usuarios: '/api/usuario'
    }

    constructor(){
        this.app    = express();
        this.port   = process.env.PORT || '9000'; 
        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')( this.server );
        //connection db
        this.connectionDB();
        //middleware
        this.middlewares();
        // definir rutas
        this.routes();

        this.swagger();
    }

    async connectionDB() {
        await connection();
    }

    middlewares() {
        //Cors
        this.app.use( cors() );
        //Lectura del body
        this.app.use( express.json() );
        //Carpeta publica
        this.app.use( express.static('public') );
        // Sockets
        this.sockets();
    }

    routes(){
        this.app.use( this.apiPaths.auth, authRoutes )
        this.app.use( this.apiPaths.usuarios, userRoutes )
        // this.app.use( this.apiPaths.products, productRoutes ),
        // this.app.use( this.apiPaths.category, categoryRoutes )
    }
    
    sockets(){
        this.io.on('connection', ( socket: any ) => {
            console.log('cliente conectado')

            socket.on('disconnect', () => {
                console.log('cliente desconectado')
            });
        });
    }

    swagger(){
        this.app.use( '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument) )
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto ${ this.port }` )
        })
    }
}

export default Server;