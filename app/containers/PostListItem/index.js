/**
 * PostListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

// Documentation: https://github.com/yahoo/react-intl/wiki
import { FormattedDate } from 'react-intl';

import { selectCurrentUser } from 'containers/App/selectors';
import ListItem from 'components/ListItem';
import A from 'components/A';
import Surtitle from 'components/Surtitle';

import styles from './styles.css';

export class PostListItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const item = this.props.item;

    const content = (
      <div className={styles.postWrapper}>
        <Surtitle text={item.meta_box.jugger_event_type} />
        <div className={styles.titleWrapper}>
          <A
            className={styles.titleLink}
            href={item.meta_box.jugger_event_event_link}
            target="_blank"
          >
            {item.title.rendered}
          </A>
        </div>
        <div className={styles.subtitleWrapper}>
          <div className={styles.dateWrapper}>
            <FormattedDate className={styles.date} value={item.meta_box.jugger_event_datetime_start} />
          </div>
        </div>
      </div>
    );

    // Render the content into a list item
    return (
      <ListItem key={`repo-list-item-${item.slug}`} item={content} />
    );
  }
}

PostListItem.propTypes = {
  item: React.PropTypes.object,
  currentUser: React.PropTypes.string,
};

export default connect(createSelector(
  selectCurrentUser(),
  (currentUser) => ({ currentUser })
))(PostListItem);
