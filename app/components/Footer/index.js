import React from 'react';

import messages from './messages';
import A from 'components/A';
import styles from './styles.css';
import { FormattedMessage } from 'react-intl';
import LocaleToggle from 'containers/LocaleToggle';

function Footer() {
  return (
    <footer className={styles.footer}>
      <section>
        <p>
          <FormattedMessage
            {...messages.authorMessage}
            values={{
              author: <A href="//twitter.com/kevinweber">Kevin Weber</A>,
            }}
          />
        </p>
      </section>
      <section>
        <LocaleToggle />
      </section>
    </footer>
  );
}

export default Footer;
