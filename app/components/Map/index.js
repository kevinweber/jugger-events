/*
 * Map with all Jugger events
 */

// TODO: Zooming: https://github.com/markmarkoh/datamaps/blob/master/README.md#zooming
// TODO: Lighten/darken country's color based on amount of jugger events, example: https://github.com/markmarkoh/datamaps/blob/master/README.md#choropleth-with-auto-calculated-color
// More map examples: https://github.com/btmills/react-datamaps/tree/master/examples
// List with default options: https://github.com/markmarkoh/datamaps/blob/master/README.md#default-options
// formatDate API: https://github.com/yahoo/react-intl/wiki/API#formatdate

import React from 'react';
import Datamap from 'components/_Datamap';
import styles from './styles.css';

export default class Map extends React.Component {
    static fills = {
      defaultFill: '#4e97cc',
      tournament: '#ff6600',
      practice: '#2c2c29',
      other: '#54544e'
    }

    renderData(data) {
      return Object.values(data).map(function (currentEvent) {
        return {
          date: currentEvent.dateTimeStart,
          fillColor: Map.fills[currentEvent.type] || Map.fills.defaultFill, // Used when hovering event's bubble
          fillKey: currentEvent.type,
          fillOpacity: 0.5,
          latitude: currentEvent.location.latitude,
          link: currentEvent.link,
          longitude: currentEvent.location.longitude,
          name: currentEvent.title
        };
      });
    }

	render() {
    let data = this.renderData(this.props.data);

		return (
      <Datamap
          geographyConfig={{
              popupOnHover: false,
              highlightOnHover: false,
              borderWidth: 0.5,
              borderColor: '#c5ddee'
          }}

          fills = {Map.fills}
          bubbles = {data}

          legend = {{
            display: true,
            labels: [{
              text: "Tournament",
              color: Map.fills.tournament
            }, {
              text: "Practice",
              color: Map.fills.practice
            }, {
              text: "Other",
              color: Map.fills.other
            }]
          }}

          bubbleOptions={{
              borderWidth: 0,
              highlightFillColor: function (eventData) {
                return eventData.fillColor;
              },
              highlightBorderWidth: 0,
              highlightFillOpacity: 0.95,
              // Don't use the default popup functionality because it's too inflexible
              popupOnHover: false,
              radius: 4
          }}
      />
		);
	}
}
