import React from 'react';
import { FormattedMessage } from 'react-intl';
import syled, { css } from 'styled-components';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <div>
        <NavBar>
          <HeaderLink to="/" input="input">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/db" database="database">
            <FormattedMessage {...messages.features} />
          </HeaderLink>
        </NavBar>
      </div>
    );
  }
}

export default Header;
