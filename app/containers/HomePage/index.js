/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';

import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';

import { loadRepos, loadUserInputPending } from '../App/actions';
import { changeUsername, changeUserInput } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  clearUserInput() {}

  render() {
    const { onSubmitUserInput, input, onChangeUserInput } = this.props;

    return (
      <article>
        <div>
          <CenteredSection>
            <h2>Enter Text Be Stored</h2>
            <Form onSubmit={onSubmitUserInput}>
              <Input
                type="text"
                placeholder="enter text here..."
                value={input}
                onChange={onChangeUserInput}
              />
            </Form>
          </CenteredSection>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  onSubmitUserInput: PropTypes.func,
  onChangeUserInput: PropTypes.func,
  input: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUserInput: evt => dispatch(changeUserInput(evt.target.value)),
    onSubmitUserInput: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadUserInputPending());
    },
  };
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
