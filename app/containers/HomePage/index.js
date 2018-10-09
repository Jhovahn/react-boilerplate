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

import { loadUserInputPending } from '../App/actions';
import {
  makeSelectLoadWriteUserInputPending,
  makeSelectLoadWriteUserInputSuccess,
  makeSelectLoadWriteUserInputError,
} from '../App/selectors';
import { changeUsername, changeUserInput } from './actions';
import { makeSelectInput } from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  constructor() {
    super();
  }
  /**
   * when initial state username is not null, submit the form to load repos
   */

  confirmation() {
    this.props.writePending
      ? `<h4>Storing data...</h4>`
      : this.props.writeSuccess
        ? `<h4>Data stored!</h4>`
        : '';
  }

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
            {this.props.writePending ? (
              <h4>Storing data...</h4>
            ) : this.props.writeSuccess ? (
              <h4>Data stored!</h4>
            ) : (
              ''
            )}
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
      evt.target.reset();
    },
  };
}

const mapStateToProps = createStructuredSelector({
  writePending: makeSelectLoadWriteUserInputPending(),
  writeSuccess: makeSelectLoadWriteUserInputSuccess(),
  writeError: makeSelectLoadWriteUserInputError(),
  input: makeSelectInput(),
});

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
