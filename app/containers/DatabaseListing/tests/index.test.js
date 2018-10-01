import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import messages from '../messages';
import FeaturePage from '../index';

describe('<DatabaseListing />', () => {
  it('should never re-render the component', () => {
    const renderedComponent = shallow(<DatabaseListing />);
    const inst = renderedComponent.instance();
    expect(inst.shouldComponentUpdate()).toBe(false);
  });
});
