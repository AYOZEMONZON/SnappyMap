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
var core_1 = require('angular2/core');
var ionic_angular_1 = require('ionic-angular');
var MapComponent = (function () {
    function MapComponent(renderer) {
        this.renderer = renderer;
    }
    MapComponent.prototype.ngAfterViewInit = function () {
        console.log(this.map);
        var firstPosition = true;
        //I assigned a initial projection whith the correct type of map//Asigno una posicion inicial con el tipo de mapa correcto (3857)
        var projection1 = ol.proj.get('EPSG:3857');
        //  to allow the position
        var geolocation = new ol.Geolocation({
            projection: projection1,
            trackingOptions: {
                enableHighAccuracy: true,
                maximumAge: 0
            },
            tracking: true
        });
        //to save all layers		
        var layerList = [];
        //the view of the map		  
        var view = new ol.View({
            //i assigned a initial position with zoom
            center: ol.proj.transform([-15, 27], 'EPSG:4326', projection1),
            zoom: 3
        });
        var layer = new ol.layer.Tile({
            source: new ol.source.OSM()
        });
        layerList.push(layer);
        var marker = new ol.source.Vector({});
        //when i allow the location it changes the position//cuando permita la ubicacion cambia la posicion
        geolocation.on('change:position', function () {
            var coordenate = geolocation.getPosition();
            marker.clear(); //set clear the marker when you change position
            //declare that the point will go in this coordenate
            var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(coordenate)
            });
            //example with openlayer circle
            /*
            var iconStyle = new ol.style.Style({
                image: new ol.style.Circle({
                    radius:5,
                    fill: new ol.style.Fill({
                    color:'rgba(255,255,51,0.7)'
                    })
                })
            });*/
            //style with an image
            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon(({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    opacity: 0.75,
                    src: 'img/orange.png'
                }))
            });
            //add iconStyle into iconFeature
            iconFeature.setStyle(iconStyle);
            //add iconFeature into marker
            marker.addFeature(iconFeature);
            map.getView().setCenter(coordenate);
            if (firstPosition) {
                map.getView().setZoom(17);
                firstPosition = false;
            }
        });
        //
        var markerLayer = new ol.layer.Vector({ source: marker });
        layerList.push(markerLayer);
        //I create the map with coordinates//creo el mapa con una posicion predefinida
        var map = new ol.Map({
            target: "map",
            layers: layerList,
            renderer: 'canvas',
            view: view,
            controls: ol.control.defaults({
                attribution: false,
                rotate: false,
            }),
            interactions: ol.interaction.defaults({
                altShiftDragRotate: false,
                pinchRotate: false
            })
        });
        //var zoomslider = new.ol.control.ZoomSlider();
        //map.addControl(zoomslider);
        map.addControl(new ol.control.ZoomSlider());
    };
    __decorate([
        core_1.ViewChild('map'), 
        __metadata('design:type', Object)
    ], MapComponent.prototype, "map", void 0);
    MapComponent = __decorate([
        core_1.Component({
            selector: 'map-component',
            template: '<div id="map" class="map"></div>',
            styles: [
                ".map {  \n\t\theight: 100%;\n\t\twidth: 100%;\n\t}"
            ],
            directives: [ionic_angular_1.IONIC_DIRECTIVES] // makes all Ionic directives available to your component
        }), 
        __metadata('design:paramtypes', [core_1.Renderer])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
