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
    let title;

    if (item.link.length === 0) {
      title = (
        <span className={styles.titleLink}>{item.title}</span>
      );
    } else {
      title = (
        <A
          className={styles.titleLink}
          href={item.link}
          target="_blank"
        >
          {item.title}
        </A>
      );
    }


    const content = (
      <div className={styles.postWrapper}>
        <Surtitle text={item.type} />
        <div className={styles.titleWrapper}>{title}</div>
        <div className={styles.subtitleWrapper}>
          <div className={styles.dateWrapper}>
            <FormattedDate className={styles.date} value={item.dateTimeStart} />
          </div>
        </div>
      </div>
    );

    // Render the content into a list item
    return (
      <ListItem key={`repo-list-item-${item.id}`} item={content} />
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
