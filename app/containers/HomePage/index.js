/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

import messages from './messages';
import { createStructuredSelector } from 'reselect';

import {
  selectRepos,
  selectLoading,
  selectError,
} from 'containers/App/selectors';

import { loadRepos } from '../App/actions';

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
      return new Date(b.meta_box.jugger_event_datetime_start) - new Date(a.meta_box.jugger_event_datetime_start);
    } else {
      return new Date(a.meta_box.jugger_event_datetime_start) - new Date(b.meta_box.jugger_event_datetime_start);
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
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    this.props.dispatch(this.props.loadRepos());
  }

  render() {
    let mainContent = null;

    // Show a loading indicator when we're loading
    if (this.props.loading) {
      mainContent = (<List component={LoadingIndicator} />);

    // Show an error if there is one
    } else if (this.props.error !== false) {
      const ErrorComponent = () => (
        <ListItem item={'Something went wrong, please try again!'} />
      );
      mainContent = (<List component={ErrorComponent} />);

    // If we're not loading, don't have an error and there are repos, show the repos
    } else if (this.props.repos !== false) {
      let sortedData = sortByDateAsc(this.props.repos);
      
      mainContent = (<List items={sortedData} component={PostListItem} />);
    }

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
            <Map />
          </section>
          <section className={styles.textSection}>
            <H2 className={styles.headingWithIcon}>
              <FormattedMessage {...messages.upcomingHeader} />
              <Button className={styles.refresh}>
                <Autorenew onClick={this.props.refreshPosts} />
              </Button>
            </H2>
            {mainContent}
          </section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  refreshPosts: React.PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return {
    refreshPosts: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },

    loadRepos,
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  repos: selectRepos(),
  loading: selectLoading(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
