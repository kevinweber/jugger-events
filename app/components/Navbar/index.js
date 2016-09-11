import React from 'react';

import messages from './messages';
import styles from './styles.css';
import { FormattedMessage } from 'react-intl';
import A from 'components/A';
import { AddCircleOutline } from 'components/Icons';

function Navbar() {
  return (
    <div className={styles.component}>
      <section>
        <A className={styles.wordmark} href="/">
          <FormattedMessage
            {...messages.wordmarkMessage}
          />
        </A>
      </section>
      <section>
        <A href="/">
          <AddCircleOutline />
        </A>
      </section>
    </div>
  );
}

export default Navbar;
