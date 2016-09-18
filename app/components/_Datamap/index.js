// NOTE: Don't include this component directly in a page.
// It is used to create maps with a more specific purpose.
// Based on: https://github.com/btmills/react-datamaps/blob/master/src/datamap.jsx

import React from 'react';
import Datamaps from 'datamaps';

const MAP_CLEARING_PROPS = [
	'height', 'scope', 'setProjection', 'width'
];

const propChangeRequiresMapClear = (oldProps, newProps) => {
  return MAP_CLEARING_PROPS.some((key) =>
    oldProps[key] !== newProps[key]
  );
};

export default class _Datamap extends React.Component {

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

    for (const child of Array.from(container.childNodes)) {
      container.removeChild(child);
    }

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
      updateChoroplethOptions,
      ...props
    } = this.props;

    let map = this.map;

    if (!map) {
      map = this.map = new Datamaps({
        ...props,
        data,
        element: this.refs.container
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
  }

  render() {
    const style = {
      height: '100%',
      position: 'relative',
      width: '100%',
      ...this.props.style
    };

    return <div ref = "container"
    style = {
      style
    }
    />;
  }

}