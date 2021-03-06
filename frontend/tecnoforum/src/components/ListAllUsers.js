import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

import Row from './Row';
import Spinner from './Spinner';
import { getContacts } from '../actions/contactActions';

class ListAllUsers extends React.Component {
  
  componentDidMount (){
    this.props.dispatch(getContacts(this.props.token,""));
  }
  
  render() {
    const isLoading = this.props.loading && <Spinner />;
    let users = this.props.list.map((user) => {
      return <Row key={user.id} item={user} />;
    });
    return (
      <div>
        {isLoading}
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Fullname</Table.HeaderCell>
              <Table.HeaderCell>Password</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Nickname</Table.HeaderCell>
              <Table.HeaderCell>Id</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{users}</Table.Body>
        </Table>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    loading: state.login.loading,
    token: state.login.token,
	list: state.contact.list
  };
};

const mapDispatchToProps = (dispatch) => ({
	dispatch
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListAllUsers));
