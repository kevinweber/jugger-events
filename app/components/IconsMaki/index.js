/*
 * Selection of material SVG icons
 * from https://design.google.com/icons/
 */

import React from 'react';

import iconData from './data/iconset-all_maki_icons.json';

const DEFAULT_PROPS = {
  fillColor: '#ff6600',
  height: 15,
  stroke: '#fff',
  strokeWidth: 1,
  width: 15
};

export function MakiIcon(props) {
  let sizeInFileName = props.width === 11 ? 11 : 15,  // Only allow 11 and 15
    iconFileName = props.name + '-' + sizeInFileName + '.svg',
    viewBox = '0 0 ' + props.width + ' ' + props.height,
    transform = 'translate(' + props.strokeWidth + ' ' + props.strokeWidth + ')',
    path = iconData.iconGroups[0].svgs[iconFileName].pathData[0].d;

  return (
    <svg height={props.height} viewBox={viewBox} width={props.width} xmlns="http://www.w3.org/2000/svg">
      <path
          d={path}
          fill={props.fillColor}
          transform={transform}
          stroke={props.stroke}
          strokeWidth={props.strokeWidth}></path>
    </svg>
  );
}

MakiIcon.propTypes = {
  name: React.PropTypes.string.isRequired,
};

MakiIcon.defaultProps = DEFAULT_PROPS;
