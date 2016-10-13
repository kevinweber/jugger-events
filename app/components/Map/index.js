/*
 * Map with all Jugger events
 */

import React from 'react';
// import Datamap from 'components/_Datamap';

import MapboxMap from 'components/_MapboxMap';
import mapboxgl from 'mapbox-gl';

const DATA_TYPES = {
  defaultType: {
    color: '#4e97cc',
    icon: 'circle'
  },
  charity: {
    color: '#ff6666',
    icon: 'star'
  },
  tournament: {
    color: '#ff6600',
    icon: 'marker'
  },
  practice: {
    color: '#2c2c29',
    icon: 'circle'
  },
  info: {
    color: '#ff6666',
    icon: 'information'
  },
  other: {
    color: '#54544e',
    icon: 'circle'
  }
};

export default class Map extends React.Component {

  // renderData(data) {
  //   return Object.values(data).map(function (currentEvent) {
  //     return {
  //       date: currentEvent.dateTimeStart,
  //       fillColor: Map.fills[currentEvent.type] || Map.fills.defaultFill, // Used when hovering event's bubble
  //       fillKey: currentEvent.type,
  //       fillOpacity: 0.5,
  //       link: currentEvent.link
  //     };
  //   });
  // }

  renderData(data) {
    return Object.values(data).map(function (currentEvent) {
      return {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [currentEvent.location.longitude, currentEvent.location.latitude]
        },
        "properties": {
          "title": currentEvent.title,
          // Icons: https://www.mapbox.com/maki-icons/
          "icon": (DATA_TYPES[currentEvent.type] && DATA_TYPES[currentEvent.type].icon) || DATA_TYPES[currentEvent.defaultType].icon
        }
      };
    });
  }


  render() {
    let data = this.renderData(this.props.data);

		return (
      <MapboxMap data={data} />

      // <Datamap
      //     geographyConfig={{
      //         popupOnHover: false,
      //         highlightOnHover: false,
      //         borderWidth: 0.5,
      //         borderColor: '#c5ddee'
      //     }}
      //
      //     fills = {Map.fills}
      //     bubbles = {data}
      //
      //     legend = {{
      //       display: true,
      //       labels: [{
      //         text: "Tournament",
      //         color: Map.fills.tournament
      //       }, {
      //         text: "Practice",
      //         color: Map.fills.practice
      //       }, {
      //         text: "Other",
      //         color: Map.fills.other
      //       }]
      //     }}
      //
      //     bubbleOptions={{
      //         borderWidth: 0,
      //         highlightFillColor: function (eventData) {
      //           return eventData.fillColor;
      //         },
      //         highlightBorderWidth: 0,
      //         highlightFillOpacity: 0.95,
      //         // Don't use the default popup functionality because it's too inflexible
      //         popupOnHover: false,
      //         radius: 4
      //     }}
      // />
    );
  }
}
