/**
 * PostListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import messages from './messages';

// Documentation: https://github.com/yahoo/react-intl/wiki
import { FormattedDate, FormattedTime, FormattedMessage } from 'react-intl';

import { selectCurrentUser } from 'containers/App/selectors';
import ListItem from 'components/ListItem';
import A from 'components/A';
import Surtitle from 'components/Surtitle';

import styles from './styles.css';

export class PostListItem extends React.Component { // eslint-disable-line react/prefer-stateless-function

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  removeNumbers(string) {
    return string.replace(/[0-9](\ )*/g, '');
  }

  cityFromAddress(address) {
    let splittedAddress = address.split(', ');

    if (splittedAddress.length > 3) {
      // Covers case "6350 Eldridge St, Arvada, CO 80004, USA"
      return splittedAddress[splittedAddress.length - 3];
    } else if (splittedAddress.length === 3) {
      // Covers case "Alexanderstraße 2B, 23566 Lübeck, Deutschland"
      return this.removeNumbers(splittedAddress[splittedAddress.length - 2]);
    } else {
      // Covers case "Berkley, California"
      return splittedAddress[0];
    }
  }

  surtitleText() {
    let type = this.capitalizeFirstLetter(this.props.item.type),
      address = this.props.item.location.address,
      city = this.cityFromAddress(address);

    if (city.length > 0) {
      return type + ' in ' + city;
    }

    return type;
  }

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

    const subtitle = (
      <div className={styles.subtitleWrapper}>
        <div className={styles.dateWrapper}>
          <FormattedDate
              className={styles.date}
              value={item.dateTimeStart}
              weekday='long'
              // year='numeric'
              month='long'
              day='2-digit' />
          <span> <FormattedMessage {...messages.timeAt} /> </span>
          <FormattedTime className={styles.time} value={item.dateTimeStart} />
        </div>
      </div>
    );

    const content = (
      <div className={styles.postWrapper}>
        <Surtitle text={this.surtitleText()} />
        <div className={styles.titleWrapper}>{title}</div>
        {subtitle}
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
