/**
 * A link to a certain page, an anchor tag
 */

import React, { PropTypes } from 'react';

import styles from './styles.css';

function P(props) {
  return (
    <p
      className={
        props.className || styles.paragraph
      }
      {...props}
    />
  );
}

P.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default P;
