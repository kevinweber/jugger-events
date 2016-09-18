// NOTE: Don't include this component directly in a page.
// It is used to create maps with a more specific purpose.
// Based on: https://github.com/btmills/react-datamaps/blob/master/src/datamap.jsx

import React from 'react';
import Datamaps from 'datamaps';
import styles from './styles.css';

const MAP_CLEARING_PROPS = [
	'height', 'scope', 'setProjection', 'width'
];

const propChangeRequiresMapClear = (oldProps, newProps) => {
  return MAP_CLEARING_PROPS.some((key) =>
    oldProps[key] !== newProps[key]
  );
};

export default class _Datamap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    arc: React.PropTypes.array,
    arcOptions: React.PropTypes.object,
    bubbleOptions: React.PropTypes.object,
    bubbles: React.PropTypes.array,
    data: React.PropTypes.object,
    graticule: React.PropTypes.bool,
    height: React.PropTypes.any,
    labels: React.PropTypes.bool,
    style: React.PropTypes.object,
    updateChoroplethOptions: React.PropTypes.object,
    width: React.PropTypes.any
  };

  static defaultProps = {
    aspectRatio: 0.45,
    responsive: true
  };

  componentDidMount() {
    this.drawMap();
  }

  componentWillReceiveProps(newProps) {
    if (propChangeRequiresMapClear(this.props, newProps)) {
      this.clear();
    }
  }

  componentDidUpdate() {
    this.drawMap();
  }

  componentWillUnmount() {
    this.clear();
  }

  clear() {
    const {
      container
    } = this.refs;

		// NOTE: This part is REMOVED because this breaks the router and throws an error
		// Maybe we have to compensate this removed part later
    // for (const child of Array.from(container.childNodes)) {
    //   container.removeChild(child);
    // }

    delete this.map;
  }

  drawMap() {
    const {
      arc,
      arcOptions,
      bubbles,
      bubbleOptions,
      data,
      graticule,
      labels,
      legend,
      updateChoroplethOptions,
      ...props
    } = this.props;

    let map = this.map;

    if (!map) {
      map = this.map = new Datamaps({
        ...props,
        data,
        element: this.refs.mapElement
      });
    } else {
      map.updateChoropleth(data, updateChoroplethOptions);
    }

    if (this.props.responsive) {
      d3.select(window).on('resize', function() {
          map.resize();
      });
    }

    if (arc) {
      map.arc(arc, arcOptions);
    }

    if (bubbles) {
      map.bubbles(bubbles, bubbleOptions);
    }

    if (graticule) {
      map.graticule();
    }

    if (labels) {
      map.labels();
    }

    if (legend.display && !this.state.isLegendVisible) {
      this.setState({
        isLegendVisible: true
      });
    }
  }

  render() {
    const style = {
      ...this.props.style
    };

    let legend = null;

    if (this.state.isLegendVisible) {
      if (this.props.legend.labels) {
        legend = this.props.legend.labels.map((item, index) => (
          <li className={styles.legendItem} key={`item-${index}`}>
            <span style={{backgroundColor:item.color}}></span>
            <span className={styles.legendText}>{item.text}</span>
          </li>
        ));

        legend = (<ul className={styles.legend}>{legend}</ul>);
      }
    }

    return (
      <div className={styles.container}>
        <div ref='mapElement' className={styles.map} />
        {legend}
      </div>
    )
  }
}
