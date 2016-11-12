/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  startProjectHeader: {
    id: 'boilerplate.containers.HomePage.start_project.header',
    defaultMessage: 'Start your next react project in seconds',
  },
  startProjectMessage: {
    id: 'boilerplate.containers.HomePage.start_project.message',
    defaultMessage: 'A highly scalable, offline-first foundation with the best DX and a focus on performance and best practices',
  },
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
    defaultMessage: 'Upcoming events to be announced. Keep coming back. Check out past events to get a feeling when the next events will take place.',
  },
});
