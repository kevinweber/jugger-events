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

import styles from './styles.css';

export class PostListItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const item = this.props.item;

    // Put together the content of the repository
    const content = (
      <div className={styles.linkWrapper}>
        <A
          className={styles.linkPost}
          href={item.link}
          target="_blank"
        >
          {item.title.rendered}
        </A>
        <div className={styles.dateWrapper}>
          <FormattedDate className={styles.date} value={item.date_gmt} />
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
