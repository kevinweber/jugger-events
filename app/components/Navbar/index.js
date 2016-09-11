import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import messages from './messages';
import styles from './styles.css';
import { FormattedMessage } from 'react-intl';
import A from 'components/A';
import Button from 'components/Button';
import { AddCircleOutline } from 'components/Icons';

function Navbar(props) {
  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  let openRoute = (route) => {
    props.changeRoute(route);
  };

  /**
   * Changed route to '/'
   */
  let openHomePage = () => {
    openRoute('/');
  };

  return (
    <div className={styles.component}>
      <section>
        <Button className={styles.wordmark} handleRoute={openHomePage}>
          <FormattedMessage
            {...messages.wordmarkMessage}
          />
        </Button>
      </section>
      <section>
        <Button className={styles.add} handleRoute={openHomePage}>
          <AddCircleOutline />
        </Button>
      </section>
    </div>
  );
}

Navbar.propTypes = {
  changeRoute: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default connect(null, mapDispatchToProps)(Navbar)