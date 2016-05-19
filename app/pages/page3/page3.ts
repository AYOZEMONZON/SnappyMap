import {Page} from 'ionic-angular';
//import {Amqp} from 'amqplib/callback_api';
import * as Amqp from 'amqplib/callback_api';


@Page({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {
    //
    
    Url: string;
    Exchange: string;

    constructor() {
        //es el usuario y contrasena de FEV junto al puerto
        this.Url = "amqp://regioit:Aachen123.@conan.fev.com:5692/";
        //a quien va dirigido
        this.Exchange = "cam_messages";
        this.initApp();
    }

    initApp() {
        //creo la conexion al servidor de FEV
        Amqp.connect(
        //paso la direccion al metodo y creo un metodo anonimo con los parametros err y connection donde err sirve para los errores de conexion y conexion si la coneccion se ha realizado con exito.
        //this.Url es un parametro y el parentesis siguiente es otro parametro que es una funcion anonima con los parametros err y connection
            this.Url, (err, connection: Amqp.Connection) => {
                connection.createChannel((err, ch) => {
                    ch.assertExchange(this.Exchange, 'topic', { durable: false });//crea el cambio
                    ch.publish(this.Exchange, '', new Buffer("Hola tio"));//envia el cambio al receptor
            });
        });
    } 

    /*  emiter  rabbitMQ example with javascript
        
        #!/usr/bin/env node

        var amqp = require('amqplib/callback_api');

        amqp.connect('amqp://localhost', function(err, conn) {
          conn.createChannel(function(err, ch) {
            var ex = 'topic_logs';
            var args = process.argv.slice(2);
            var key = (args.length > 0) ? args[0] : 'anonymous.info';
            var msg = args.slice(1).join(' ') || 'Hello World!';

            ch.assertExchange(ex, 'topic', {durable: false});
            ch.publish(ex, key, new Buffer(msg));
            console.log(" [x] Sent %s:'%s'", key, msg);
          });

          setTimeout(function() { conn.close(); process.exit(0) }, 500);
        });
    */
}
