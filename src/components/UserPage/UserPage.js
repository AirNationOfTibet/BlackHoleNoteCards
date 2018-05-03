import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionsItem from './CollectionsItem.js';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
  state,
});

class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: 'false',
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: 'FETCH_COLLECTION'})
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }



  render() {
    let addCollectionEdit = <div>this.</div>

    let collectionItem = this.props.state.collectionView.collectionReducer.map((collection)=>{
      return(<CollectionsItem key={collection.id} collection={collection}/>)
    })
    let content = null;
    if (this.props.user.userName) {
      content = (
        <div>
          <h2
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          </h2>

          {collectionItem}
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
        { this.props.state.collectionReducer}
        <button
            onClick={this.logout}
          >
            Log Out
          </button>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

