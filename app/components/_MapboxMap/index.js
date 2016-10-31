// Inspired by: https://github.com/uber/react-map-gl/blob/master/src/map.react.js

import React from 'react';
import styles from './styles.css';
import config from '../../global.config';
import mapboxgl from 'mapbox-gl';

import { encodeSvg } from 'utils/converter';
import { MakiIcon } from 'components/IconsMaki';

const DEFAULT_PROPS = {
  center: [-122.2594471, 37.8000593], // [longitude, latitude]
  dragRotate: false,
  mapboxApiAccessToken: config.MAPBOX_API_ACCESS_TOKEN,
  style: 'mapbox://styles/mapbox/light-v9',
  zoom: 9
};

export default class MapboxMap extends React.Component {

  componentDidMount() {
    mapboxgl.accessToken = this.props.mapboxApiAccessToken;

    // Documentation: https://www.mapbox.com/mapbox-gl-js/api/#Map
    const map = new mapboxgl.Map({
      container: this.refs.mapboxMap,
      dragRotate: this.props.dragRotate,
      center: this.props.center,
      style: this.props.style,
      zoom: this.props.zoom
    });

    map.addControl(new mapboxgl.Navigation());

    map.on('load', () => this._onMapLoad());

    this._map = map;
  }

  componentDidUpdate() {
    this._updateSource("points");
  }

  componentWillUnmount() {
    if (this._map) {
      this._map.remove();
    }
  }

  addSource() {
    // Documentation: https://www.mapbox.com/mapbox-gl-js/api/#Map#addSource
    let source = {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": this.props.data || []
      }
    };

    this._map.addSource("points", source);
  }

  addLayer() {
    // Documentation: https://www.mapbox.com/mapbox-gl-style-spec/#layers
    let layer = {
      "id": "points",
      "type": "symbol", // Alternative: "circle", see https://www.mapbox.com/mapbox-gl-js/example/data-driven-circle-colors/
      "source": "points",
      // Documentation: https://www.mapbox.com/mapbox-gl-style-spec/#layers-symbol
      "layout": {
        // "icon-image": "{icon}-11",
        "text-field": "{title}",
        // "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 1.1],
        "text-size": 12,
        "text-anchor": "top"
      },
      // Documentation: https://www.mapbox.com/mapbox-gl-style-spec/#paint_symbol
      "paint": {
        "text-color": "#ff6600",
        "text-halo-blur": 1,
        "text-halo-color": "#ffffff",
        "text-halo-width": 1
      }
    };

    this._map.addLayer(layer);
  }

  addMarkers() {
    this.props.data.forEach((marker) => {
      let element = document.createElement('div'),
        link = marker.data.link;

      element.className = 'marker';
      element.style.backgroundImage = 'url(' + encodeSvg(
        <MakiIcon name={marker.properties.icon.type} />
      ) + ')';
      element.style.width = marker.properties.icon.iconSize + 'px';
      element.style.height = marker.properties.icon.iconSize + 'px';

      // TODO: Show tooltip or popup
      if (link !== undefined && link.length > 0) {
        element.addEventListener('click', function () {
          window.open(link, '_blank');
        });
      }

      // Add marker to map
      new mapboxgl.Marker(element, {
          offset: [-marker.properties.icon.iconSize / 2, -marker.properties.icon.iconSize / 2]
        })
        .setLngLat(marker.geometry.coordinates)
        .addTo(this._map);
    });
  }

  _onMapLoad() {
    this.addSource();
    this.addLayer();
    this.addMarkers();
  }

  _updateSource(name) {
    let newData = {
        "type": "FeatureCollection",
        "features": this.props.data
      },
      currentSource = this._map.getSource(name);

    if (currentSource !== undefined) {
      currentSource.setData(newData);
    }
  }

  // _getMap() {
  //   return this._map;
  // }

  render() {
		return (
      <div className={styles.mapContainer} ref="mapboxMap"></div>
    );
  }
}

MapboxMap.defaultProps = DEFAULT_PROPS;
