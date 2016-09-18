/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import messages from './messages';
import styles from './styles.css';

import { FormattedMessage } from 'react-intl';
import Button from 'components/Button';
import H1 from 'components/H1';
import Img from 'components/Img';

import Logo from './media/logo.png';

export function NotFound(props) {
  return (
    <article>
      <div className={styles.logoWrapper} href="/">
        <Img className={styles.logo} src={Logo} alt="Jugger Events Logo" />
      </div>
      <H1 className={styles.heading}>
        <FormattedMessage {...messages.header} />
      </H1>
    </article>
  );
}

NotFound.propTypes = {
  changeRoute: React.PropTypes.func,
};

// react-redux stuff
function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(null, mapDispatchToProps)(NotFound);
