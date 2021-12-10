import GeoMapElement from './map-element.js'
import {default_marker_markup, GeoMapMarker} from './map-marker.js'

export class GeoMapLocation extends GeoMapElement {

  initialize(){

    this.markers = [...this.querySelectorAll('map-marker')]
    if(this.markers.length < 1){
      const default_marker = document.createElement('map-marker')
      default_marker.innerHTML = default_marker_markup
      this.markers = [default_marker]
    }

    this.markers.forEach(marker => {
      marker.initialize(this.geo_map.map, [this.longitude, this.latitude])
    })
  }

  static get observedAttributes() {
    return ['latitude','longitude'];
  }

  attributeChangedCallback(name, old_value, new_value){
    switch(name){
      case "latitude":
        this.latitude = new_value
        break
      case "longitude":
        this.longitude = new_value
        break
        break
      default:
        console.warn('do not know how to handle a change in attribute', name)
    }

    if(this.markers){
      this.markers.forEach(marker => {
        marker.setLngLat([this.longitude, this.latitude])
      }) 
    }
  }

  onRemove(){
    this.markers.forEach(marker => marker.remove())
  }
}

customElements.define('map-location', GeoMapLocation)

