import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';

import { IntlProvider, FormattedMessage } from 'react-intl';
import messages from '../messages';
import { AddEventPage } from '../index';
import H1 from 'components/H1';

describe('<AddEventPage />', () => {
  it('should render its heading', () => {
    const renderedComponent = shallow(
      <AddEventPage />
    );
    expect(renderedComponent.contains(
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
    )).toEqual(true);
  });

  it('should link to "/"', () => {
    const openRouteSpy = expect.createSpy();

    // Spy on the openRoute method of the AddEventPage
    const openRoute = (dest) => {
      if (dest === '/') {
        openRouteSpy();
      }
    };

    const renderedComponent = mount(
      <IntlProvider locale="en">
        <AddEventPage changeRoute={openRoute} />
      </IntlProvider>
    );
    const button = renderedComponent.find('button');
    button.simulate('click');
    expect(openRouteSpy).toHaveBeenCalled();
  });
});
