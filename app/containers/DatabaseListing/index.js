import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { loadDatabasePending } from '../App/actions';

import {
  makeSelectLoadReadDatabasePending,
  makeSelectLoadReadDatabaseSuccess,
  makeSelectLoadReadDatabaseError,
} from 'containers/App/selectors';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from '../HomePage/reducer';
import saga from '../HomePage/saga';

import H1 from 'components/H1';
import messages from './messages';
import List from './List';
import ListItem from './ListItem';
import ListItemTitle from './ListItemTitle';

export class DatabaseListing extends React.Component {
  componentWillMount() {
    this.props.onSubmitRequest();
  }
  render() {
    const list = this.props.dbsuccess;
    const display =
      !!list && list.length
        ? list.map(el => <ListItem key={el._id}>{el.input}</ListItem>)
        : 'No Entries to display';
    return (
      <div>
        <button onClick={this.props.onSubmitRequest}>
          <h2>All Datbase Entries</h2>
        </button>
        {console.log(this.props)}
        {this.props.dbpending === true ? (
          <h3>Loading...</h3>
        ) : this.props.dberror === true ? (
          <h3>Database error, contact support.</h3>
        ) : (
          <div>{display}</div>
        )}
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'saga', saga });

const mapStateToProps = createStructuredSelector({
  dbpending: makeSelectLoadReadDatabasePending(),
  dbsuccess: makeSelectLoadReadDatabaseSuccess(),
  dberror: makeSelectLoadReadDatabaseError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitRequest: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadDatabasePending());
    },
  };
}

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(DatabaseListing);
