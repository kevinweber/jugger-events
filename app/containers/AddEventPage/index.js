/*
 * Page to add events
 */
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

import messages from './messages';
import { FormattedMessage } from 'react-intl';
import Button from 'components/Button';
import H1 from 'components/H1';

import styles from './styles.css';

export class AddEventPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet
          title="Add Event"
          meta={[
            { name: 'description', content: 'Announce your own event on jugger.events' },
          ]}
        />
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <p className={styles.listItemTitle}>
              Placeholder
            </p>

            <p>
              Text
            </p>
          </li>
        </ul>
      </div>
    );
  }
}
AddEventPage.propTypes = {
  
};

function mapDispatchToProps(dispatch) {
  return {
    
  };
}

export default connect(null, mapDispatchToProps)(AddEventPage);