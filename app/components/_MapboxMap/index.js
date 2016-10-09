// Inspired by: https://github.com/uber/react-map-gl/blob/master/src/map.react.js

import React, {PropTypes} from 'react';
import styles from './styles.css';
import config from '../../global.config';
import mapboxgl from 'mapbox-gl';

const DEFAULT_PROPS = {
  center: [-105.1554504, 39.8117865], // [longitude, latitude]
  dragRotate: false,
  mapboxApiAccessToken: config.MAPBOX_API_ACCESS_TOKEN,
  style: 'mapbox://styles/mapbox/light-v9',
  zoom: 2
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
    }

	render() {
		return (
      <div className={styles.mapContainer} ref="mapboxMap"></div>
		);
	}
}

MapboxMap.defaultProps = DEFAULT_PROPS;
