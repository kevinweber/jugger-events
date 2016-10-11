// Inspired by: https://github.com/uber/react-map-gl/blob/master/src/map.react.js

import React, {
  PropTypes
} from 'react';
import styles from './styles.css';
import config from '../../global.config';
import mapboxgl from 'mapbox-gl';

const DEFAULT_PROPS = {
  center: [-112.1554504, 39.8117865], // [longitude, latitude]
  dragRotate: false,
  mapboxApiAccessToken: config.MAPBOX_API_ACCESS_TOKEN,
  style: 'mapbox://styles/mapbox/light-v9',
  zoom: 4
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

  _onMapLoad() {
    // Documentation: https://www.mapbox.com/mapbox-gl-js/api/#Map#addSource
    let source = {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": this.props.data || []
      }
    };

    this._map.addSource("points", source);

    // Documentation: https://www.mapbox.com/mapbox-gl-style-spec/#layers
    let layer = {
      "id": "points",
      "type": "symbol", // Alternative: "circle", see https://www.mapbox.com/mapbox-gl-js/example/data-driven-circle-colors/
      "source": "points",
      // Documentation: https://www.mapbox.com/mapbox-gl-style-spec/#layers-symbol
      "layout": {
        "icon-image": "{icon}-11",
        "text-field": "{title}",
        // "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.6],
        "text-size": 12,
        "text-anchor": "top"
      }
    };

    this._map.addLayer(layer);
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
