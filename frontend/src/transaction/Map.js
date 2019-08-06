import React, { Component } from 'react';
import defaultMarker from '../assets/img/marker_default.svg';
import retailMarker from '../assets/img/marker_retail.svg';
import onlineRetailMarker from '../assets/img/marker_online_retail.svg';
import foodMarker from '../assets/img/marker_food.svg';

const getMapMarker = category => {
  console.log(category)
  switch (category) {
    case 'retail': return retailMarker;
    case 'online_retail': return onlineRetailMarker;
    case 'food': return foodMarker;
    default: return defaultMarker;
  }
}

export default class Map extends Component {


  constructor(props) {
    super(props);

    this.initMap = this.initMap.bind(this);
  }

  componentWillUnmount() {
    if (this.script) {
      this.script.remove();
    }
  }

  componentDidMount() {
    if (window.google){
      window.google = undefined;
    }

    window.initMap = this.initMap;

    this.script = document.createElement("script");

    this.script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_KEY}&libraries=places&callback=initMap`;
    this.script.async = true;

    document.body.appendChild(this.script);

  }

  initMap() {
    const {lat = 40.7128, lng = 74.0060, label = '[merchant]', category} = this.props;

    let pos = { lat, lng};

    const google = window.google;
    const map = new google.maps.Map(document.getElementById('map'), {
      center: pos,
      zoom: 12
    });


    var marker = new google.maps.Marker({
      map: map,
      title: label,
      icon: getMapMarker(category)
    });
    marker.setPosition(pos);

  }


  render() {
    return (
      <div id='map'>...</div>
    );
  }
}
