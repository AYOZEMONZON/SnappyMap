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
    function MapComponent() {
    }
    MapComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var firstPosition = true;
        var projection = ol.proj.get('EPSG:3857');
        // Enable geolocation
        var geolocation = new ol.Geolocation({
            projection: projection,
            trackingOptions: {
                enableHighAccuracy: true,
                maximumAge: 0
            },
            tracking: true
        });
        // set the default position of the map
        var view = new ol.View({
            center: ol.proj.transform([0, 0], 'EPSG:4326', projection),
            zoom: 3,
            maxZoom: 19,
            minZoom: 3
        });
        // HOW TO CREATE A CUSTOM MARKER 
        // 1. create vector
        var marker = new ol.source.Vector({});
        // move the marker when changing position
        geolocation.on('change:position', function () {
            var coordinates = geolocation.getPosition();
            marker.clear(); // clear previous markers
            // 2. create feature
            var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(coordinates)
            });
            // 3. create feature's style and link each other
            var iconStyle = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 5,
                    fill: new ol.style.Fill({
                        color: 'rgba(0,1,30,0.7)'
                    })
                })
            });
            iconFeature.setStyle(iconStyle);
            //4. add feature to vector
            marker.addFeature(iconFeature);
            if (firstPosition) {
                map.getView().setCenter(coordinates);
                map.getView().setZoom(17);
                firstPosition = false;
            }
        });
        //5. create layer with custom marker
        var markerLayer = new ol.layer.Vector({ source: marker });
        var osm = new ol.layer.Tile({
            source: new ol.source.OSM()
        });
        //create the map itself			
        var map = new ol.Map({
            target: "map",
            layers: [
                osm,
                markerLayer
            ],
            renderer: 'canvas',
            view: view,
            controls: ol.control.defaults({
                attribution: false
            }),
            interactions: ol.interaction.defaults({ altShiftDragRotate: false, pinchRotate: false })
        });
        // adding custom controls
        map.addControl(new ol.control.ZoomSlider());
        map.addControl(new ol.control.LayerSwitcher());
        // transform the map tile to gray scale
        osm.on('postcompose', function (event) {
            _this.Canvas2GrayScale(event);
        });
    };
    MapComponent.prototype.Canvas2GrayScale = function (event) {
        var context = event.context;
        var canvas = context.canvas;
        var image = context.getImageData(0, 0, canvas.width, canvas.height);
        var data = image.data;
        for (var i = 0, ii = data.length; i < ii; i += 4) {
            data[i] = data[i + 1] = data[i + 2] = (3 * data[i] + 4 * data[i + 1] + data[i + 2]) / 8;
        }
        context.putImageData(image, 0, 0);
    };
    MapComponent = __decorate([
        core_1.Component({
            selector: 'map-component',
            template: '<div id="map" #map class="map"></div>',
            styles: ["\n\t.map {\n\t\twidth: 100%;\n\t\theight: 100%;\n\t}"],
            directives: [ionic_angular_1.IONIC_DIRECTIVES] // makes all Ionic directives available to your component
        }), 
        __metadata('design:paramtypes', [])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
