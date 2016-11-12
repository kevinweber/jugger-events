/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  upcomingHeader: {
    id: 'boilerplate.containers.HomePage.upcoming.header',
    defaultMessage: 'Upcoming',
  },
  featuresButton: {
    id: 'boilerplate.containers.HomePage.features.Button',
    defaultMessage: 'Features',
  },
  noResultsError: {
    id: 'boilerplate.containers.HomePage.noResults.error',
    defaultMessage: 'Something went wrong, please try again!',
  },
  noResultsUpcoming: {
    id: 'boilerplate.containers.HomePage.noResults.upcoming',
    defaultMessage: 'Upcoming events to be announced. Keep coming back.',
  },
});
