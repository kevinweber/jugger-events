/*
 * Map with all Jugger events
 */

// TODO: Zooming: https://github.com/markmarkoh/datamaps/blob/master/README.md#zooming
// TODO: Lighten/darken country's color based on amount of jugger events, example: https://github.com/markmarkoh/datamaps/blob/master/README.md#choropleth-with-auto-calculated-color
// More map examples: https://github.com/btmills/react-datamaps/tree/master/examples
// List with default options: https://github.com/markmarkoh/datamaps/blob/master/README.md#default-options

import React from 'react';

import Datamap from 'components/_Datamap';

export default class Map extends React.Component {
	render() {
		return (
            <Datamap
                geographyConfig={{
                    popupOnHover: false,
                    highlightOnHover: false,
                    borderWidth: 0.2,
                    borderColor: '#c5ddee'
                }}
          
                fills = {{
                    defaultFill: '#4e97cc',
                    tournament: '#ff6600',
                    practice: '#2c2c29',
                    other: '#54544e'
                }}
          
                bubbles={[
                    {
                        name: 'Castle Bravo',
                        radius: 5,
                        yeild: 100,
                        country: 'USA',
                        significance: 'First dry fusion fuel "staged" thermonuclear weapon; a serious nuclear fallout accident occurred',
                        fillKey: 'tournament',
                        borderWidth: 0,
//                        borderColor: '',
//                        borderOpacity: 1,
                        fillOpacity: 0.8,
                        date: '1954-03-01',
                        latitude: 39.8117865,
                        longitude: -105.1554504
                    }, {
                        name: 'Tsar Bomba',
                        radius: 10,
                        yeild: 300,
                        country: 'USSR',
                        fillKey: 'practice',
                        borderWidth: 0,
//                        borderColor: '',
//                        borderOpacity: 1,
                        fillOpacity: 0.8,
                        significance: 'Largest thermonuclear weapon ever tested-scaled down from its initial 100Mt design by 50%',
                        date: '1961-10-31',
                        latitude: 37.8715926,
                        longitude: -122.27274699999998
                    }
                ]}
          
                bubbleOptions={{
                    popupTemplate: (geo, data) =>
                        `<div class="hoverinfo">Yield: ${data.yeild}\nExploded on ${data.date} by the ${data.country}`
                }}
            />
		);
	}

}