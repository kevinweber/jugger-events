/*
 * HomePage
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

import messages from './messages';
import { createStructuredSelector } from 'reselect';

import {
  LOAD_DATA_EVENTS_PAST,
  LOAD_DATA_EVENTS_UPCOMING,
} from 'containers/App/constants';

import {
  selectEventsPast,
  selectEventsUpcoming,
  selectLoading,
  selectError,
} from 'containers/App/selectors';

import { loadData } from '../App/actions';

import {

} from 'containers/App/constants';

import { FormattedMessage } from 'react-intl';
import PostListItem from 'containers/PostListItem';
import Button from 'components/Button';
import H2 from 'components/H2';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import Map from 'components/Map';
import { Autorenew } from 'components/Icons';

import styles from './styles.css';

function sortByDate(data, direction) {
  return data.sort(function(a, b){
    if (direction === 'desc') {
      return new Date(b.dateTimeStart) - new Date(a.dateTimeStart);
    } else {
      return new Date(a.dateTimeStart) - new Date(b.dateTimeStart);
    }

  });
}

function sortByDateAsc(data) {
  return sortByDate(data, 'asc');
}

function sortByDateDesc(data) {
  return sortByDate(data, 'desc');
}

export class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(this.props.loadData(LOAD_DATA_EVENTS_UPCOMING));
    this.props.dispatch(this.props.loadData(LOAD_DATA_EVENTS_PAST));
  }

  // TODO: Make this an actual component
  eventSection(eventData) {
    let component = null;

    // Show a loading indicator when we're loading
    if (this.props.loading) {
      component = (<List component={LoadingIndicator} />);

    // Show an error if there is one
    } else if (this.props.error !== false) {
      const ErrorComponent = () => (
        <ListItem className={styles.error}>
          <FormattedMessage {...messages.noResultsError} />
        </ListItem>
      );
      component = (<List component={ErrorComponent} />);

    } else if (eventData.length === 0) {
      const NoResultsComponent = () => (
        <ListItem className={styles.noResults}>
          <FormattedMessage {...messages.noResultsUpcoming} />
        </ListItem>
      );
      component = (<List component={NoResultsComponent} />);

    // If we're not loading, don't have an error and there are component, show the component
    } else if (eventData !== false) {
      let sortedData = sortByDateAsc(eventData);

      component = (<List items={sortedData} component={PostListItem} />);
    }

    return component;
  }

  render() {
    return (
      <article>
        <Helmet
          title="Jugger Events"
          meta={[
            { name: 'description', content: '' },
          ]}
        />
        <div>
          <section>
            <Map data={this.props.eventsUpcoming} />
          </section>
          <section className={styles.textSection}>
            <H2 className={styles.headingWithIcon}>
              <FormattedMessage {...messages.upcomingHeader} />
              <Button className={styles.refresh}>
                <Autorenew onClick={this.props.refreshEvents} />
              </Button>
            </H2>
            {this.eventSection(this.props.eventsUpcoming)}
          </section>

          <section className={styles.textSection}>
            <H2 className={styles.headingWithIcon}>
              <FormattedMessage {...messages.pastHeader} />
            </H2>
            {this.eventSection(this.props.eventsPast)}
          </section>
        </div>
      </article>
    );
  }
}

const arrayOrBool = React.PropTypes.oneOfType([
  React.PropTypes.array,
  React.PropTypes.bool,
]);

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  eventsPast: arrayOrBool,
  eventsUpcoming: arrayOrBool,
  refreshEvents: React.PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return {
    refreshEvents: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadData(LOAD_DATA_EVENTS_PAST));
      dispatch(loadData(LOAD_DATA_EVENTS_UPCOMING));
    },

    loadData,
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  eventsPast: selectEventsPast(),
  eventsUpcoming: selectEventsUpcoming(),
  loading: selectLoading(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
