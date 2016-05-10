import {Page, NavController} from 'ionic-angular';
import {Query, QueryList, Component, ElementRef} from 'angular2/core';
import {MapComponent} from './../../components/map.component';

@Page({
  templateUrl: 'build/pages/map/map.html',
  directives: [MapComponent]
})

export class Map{
	constructor(){}
}