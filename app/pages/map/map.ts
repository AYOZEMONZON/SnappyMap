import {Page, NavController} from 'ionic-angular';
import {Query, QueryList, Component, ElementRef} from 'angular2/core';
import {MapComponent} from './../../components/map-component';


/*
  Generated class for the MapPagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/map/map.html',
  directives: [MapComponent]
})

export class Map{
	constructor(){}
}