import React, { PropTypes } from 'react';

import styles from './styles.css';
import A from 'components/A';
import { injectIntl } from 'react-intl';

function Tooltip(props) {
  let tooltip = null;
  let title = null;

  if (props.data && props.showTooltip) {
    if (props.data.link.length === 0) {
      title = (
        <span className={styles.infoTitle}>{props.data.name}</span>
      );
    } else {
      title = (
        <A
          className={styles.infoTitle}
          href={props.data.link}
          target="_blank"
        >
          {props.data.name}
        </A>
      );
    }

    tooltip = (
      <div className={styles.info}>
        {title}
        <span className={styles.infoDate}>on {props.intl.formatDate(props.data.date)}</span>
      </div>
    );
  }

  return tooltip;
}

export default injectIntl(Tooltip);
