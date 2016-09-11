import React from 'react';

import styles from './styles.css';

function Surtitle(props) {
  return (
    <div className={styles.component}>
      {props.text}
    </div>
  );
}

export default Surtitle;
