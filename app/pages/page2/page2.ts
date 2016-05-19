import {Page} from 'ionic-angular';
import * as amqp from 'amqplib/callback_api';

@Page({
  templateUrl: 'build/pages/page2/page2.html',
})

export class Page2 {
    
    _connectionUrl: string;
    _exchange: string;
    _connection: amqp.Connection;
    _channel: amqp.Channel;
    
    constructor() {
        this._connectionUrl = 'amqp://regioit:Aachen123.@conan.fev.com:5692/';
        this._exchange = 'cam_messages';
        this.setConnection();
    }

    /** SEE: https://www.rabbitmq.com/tutorials/tutorial-five-javascript.html  **/
    setConnection() {
        amqp.connect(this._connectionUrl, (err: any, connection: amqp.Connection) => {
            this._connection = connection;
            this._connection.createChannel((err: any, channel: amqp.Channel) => {
                this._channel = channel;
                this._channel.assertExchange(this._exchange, 'topic', { durable: false });
            });
        });

        //setTimeout(() => { this._connection.close() }, 2000);
    }

    // Send a message to the server
    sendMessage() {
        this._channel.publish(this._exchange, '', new Buffer('Hello from the Ionic 2 app'));
    }
  
}
