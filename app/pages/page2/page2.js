"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_angular_1 = require('ionic-angular');
var amqp = require('amqplib/callback_api');
var Page2 = (function () {
    function Page2() {
        this.connectionUrl = 'amqp://regioit:Aachen123.@conan.fev.com:5692/';
        this.exchange = 'cam_messages';
        this.setConnection();
    }
    /** SEE: https://www.rabbitmq.com/tutorials/tutorial-five-javascript.html  **/
    Page2.prototype.setConnection = function () {
        var _this = this;
        amqp.connect(this.connectionUrl, function (err, connection) {
            _this.connection = connection;
            _this.connection.createChannel(function (err, channel) {
                _this.channel = channel;
                _this.channel.assertExchange(_this.exchange, 'topic', { durable: false });
            });
        });
        setTimeout(function () { _this.connection.close(); }, 2000);
    };
    // Send a message to the server
    Page2.prototype.sendMessage = function () {
        this.channel.publish(this.exchange, '', new Buffer('Hello from the Ionic 2 app'));
    };
    Page2 = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/page2/page2.html',
        }), 
        __metadata('design:paramtypes', [])
    ], Page2);
    return Page2;
}());
exports.Page2 = Page2;
