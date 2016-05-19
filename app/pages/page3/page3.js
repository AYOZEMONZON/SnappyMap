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
//import {Amqp} from 'amqplib/callback_api';
var Amqp = require('amqplib/callback_api');
var Page3 = (function () {
    function Page3() {
        //es el usuario y contrasena de FEV junto al puerto
        this.Url = "amqp://regioit:Aachen123.@conan.fev.com:5692/";
        //a quien va dirigido
        this.Exchange = "cam_messages";
        this.initApp();
    }
    Page3.prototype.initApp = function () {
        var _this = this;
        //creo la conexion al servidor de FEV
        Amqp.connect(
        //paso la direccion al metodo y creo un metodo anonimo con los parametros err y connection donde err sirve para los errores de conexion y conexion si la coneccion se ha realizado con exito.
        //this.Url es un parametro y el parentesis siguiente es otro parametro que es una funcion anonima con los parametros err y connection
        this.Url, function (err, connection) {
            connection.createChannel(function (err, ch) {
                ch.assertExchange(_this.Exchange, 'topic', { durable: false }); //crea el cambio
                ch.publish(_this.Exchange, '', new Buffer("Hola tio")); //envia el cambio al receptor
            });
        });
    };
    Page3 = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/page3/page3.html'
        }), 
        __metadata('design:paramtypes', [])
    ], Page3);
    return Page3;
}());
exports.Page3 = Page3;
