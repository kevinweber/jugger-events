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
import P from 'components/P';

import styles from './styles.css';

export class AddEventPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet
          title='Add Event'
          meta={[
            { name: 'description', content: 'Announce your own event on juggerevents.com' },
          ]}
        />
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <P>
          Are you part of a Jugger team or want to start one? We'd love to hear from you!
        </P>
        <P>
          We connect you with the world-wide Jugger community and provide tools to organize and promote everything Jugger-related.
        </P>
        <P className={styles.paragraphWithButton}>
          <Button href={'mailto:temporary2804@juggerevents.com'}>
            Send an email to Kevin
          </Button>
        </P>
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
