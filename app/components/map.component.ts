import {Component} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';

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

    constructor() {}
	
	ngAfterViewInit() {
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
			center: ol.proj.transform([0,0], 'EPSG:4326', projection),
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

			if (firstPosition){
				map.getView().setCenter(coordinates); 
				map.getView().setZoom(17);
				firstPosition = false;
			}
		})
		
		//5. create layer with custom marker
		var markerLayer = new ol.layer.Vector({ source: marker });
		
		//create the map itself			
		var map = new ol.Map({
			target: "map",
            layers: [
                new ol.layer.Group({
                    'title': 'Base maps',
                    layers: [
                        new ol.layer.Tile({
                            title: 'Stamen - Toner',
                            type: 'base',
                            visible: false,
                            source: new ol.source.Stamen({
                                layer: 'toner'
                            })
                        }),
                        new ol.layer.Tile({
                            title: 'OSM',
                            type: 'base',
                            visible: true,
                            source: new ol.source.OSM()
                        }),
                        markerLayer                                
                    ],                       
                }),
            ],            
			renderer: 'canvas',
			view: view,
			controls: ol.control.defaults({
				attribution:false
			}),
			interactions: ol.interaction.defaults({altShiftDragRotate:false, pinchRotate:false})
        });

        // adding custom controls
        map.addControl(new ol.control.ZoomSlider());
        map.addControl(new ol.control.LayerSwitcher());
	}
	
}