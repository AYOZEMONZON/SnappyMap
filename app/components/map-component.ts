import {Component, Input, ViewChild, Renderer, Query, QueryList, ElementRef} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';

declare var ol: any;

@Component({
  selector: 'map-component',
  template: '<div id="map" class="map"></div>',
  styles:[
	`.map {  
		height: 100%;
		width: 100%;
	}`
  ],
  directives: [IONIC_DIRECTIVES] // makes all Ionic directives available to your component
})

export class MapComponent {

  @ViewChild('map') map;  

  constructor(public renderer: Renderer) {   }

	ngAfterViewInit() {
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
			tracking:true
		});
		
		//to save all layers		
		var layerList = [];
			  
		//the view of the map		  
		var view =  new ol.View({
			//i assigned a initial position with zoom
			center: ol.proj.transform([-15, 27], 'EPSG:4326', projection1),              
			zoom:3
			//Into '[]', the first parameter is the 'x' coordenate 
			//and the second parameter is the 'y' coordenate
		});
		
		var layer = new ol.layer.Tile({
			source: new ol.source.OSM()
		});
				  
		layerList.push(layer);
		
		var marker = new ol.source.Vector({});
		 
			  //when i allow the location it changes the position//cuando permita la ubicacion cambia la posicion
		geolocation.on('change:position',function(){
			var coordenate = geolocation.getPosition();  
			  
			marker.clear();//set clear the marker when you change position
			  
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
			
			if(firstPosition) {
				map.getView().setZoom(17);
				firstPosition = false;
			}
		})
			//
		var markerLayer = new ol.layer.Vector({source:marker});
		
		layerList.push(markerLayer);
		
		
		
		//I create the map with coordinates//creo el mapa con una posicion predefinida
		var map = new ol.Map({
			target: "map",
			layers: layerList,
			renderer:'canvas',
			view: view,
			controls: ol.control.defaults({
				attribution: false,
				rotate: false,
			}),
			interactions: ol.interaction.defaults({
				altShiftDragRotate:false, 
				pinchRotate:false
			})
		});
		//var zoomslider = new.ol.control.ZoomSlider();
		//map.addControl(zoomslider);
		map.addControl(new ol.control.ZoomSlider());	
		
	} 
}