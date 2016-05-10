import {Component, Input, ViewChild, Renderer, Query, QueryList, ElementRef} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
//AMQP for RabbitMQ
//import * as Amqp from 'amqp-ts';

declare var ol: any;

@Component({
  selector: 'map-component',
  template: '<div id="map" #map class="map"></div>',
  styles:[`
	.map {
		width: 100%;
		height: 100%;
	}`],
  directives: [IONIC_DIRECTIVES] // makes all Ionic directives available to your component
})

export class MapComponent {
	
	centerPosition: any;
	@ViewChild('map') mapElement;

	constructor(public renderer: Renderer) {}
	
	//map is updated once the view has been initialized
	ngAfterViewInit() {
		var firstPosition = true;
		var layersList = [];
		var projection = ol.proj.get('EPSG:3857');
		
		//SET geolocation
		var geolocation = new ol.Geolocation({
			projection: projection,
			trackingOptions: {
				enableHighAccuracy: true,
				maximumAge: 0
			},
			tracking: true	  
		});
		
		//set the default position of the map
		var view = new ol.View({
			center: ol.proj.transform([0,0], 'EPSG:4326', projection),
			zoom: 3,
			maxZoom: 19,
			minZoom: 3
		});
				   
		//set the layer (type of map layout)
		var layer = new ol.layer.Tile({
			source: new ol.source.OSM() 
		});
		
		layersList.push(layer);
				
		//1. create vector
		var marker = new ol.source.Vector({});
		
		geolocation.on('change:position', function () {
			/* Longitude - Latitude format
			var lonlat = ol.proj.transform(coordinates, projection, 'EPSG:4326');
			console.log(lonlat);
			*/
			var coordinates = geolocation.getPosition();
			marker.clear(); //clear previous markers
			
			//2. create feature
			var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(coordinates)
            });

			//3. create feature's style and link each other
            var iconStyle = new ol.style.Style({
				image: new ol.style.Circle({
					radius: 5,
                    fill: new ol.style.Fill({
                    color: 'rgba(0,1,30,0.7)'
                    })
				})
            });
			
			/*
			var iconStyle = new ol.style.Style({
				image: new ol.style.Icon(({  
				anchor: [0.5, 46],
				anchorXUnits: 'fraction',
				anchorYUnits: 'pixels',
				opacity: 0.75,
				src: 'img/vehicle.png'
				}))
			});
			*/
			
            iconFeature.setStyle(iconStyle);

			//4. add feature to vector
			marker.addFeature(iconFeature);

			if (firstPosition){
				map.getView().setCenter(coordinates); 
				map.getView().setZoom(17);
				firstPosition = false;
			}
		})
		
		//5. create layer with custom marker
		var markerLayer = new ol.layer.Vector({ source: marker });
		
		//6. add to layers
		layersList.push(markerLayer);
		
		//create the map itself			
		var map = new ol.Map({
			target: "map",
			layers: layersList,
			renderer: 'canvas',
			view: view,
			controls: ol.control.defaults({
				attribution:false
			}),
			interactions: ol.interaction.defaults({altShiftDragRotate:false, pinchRotate:false})
		});
		map.addControl(new ol.control.ZoomSlider());
	}
	
}