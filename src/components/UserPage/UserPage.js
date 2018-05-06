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
      editing: false,
      collection: '',
    };
  }

  handleAddEdit = () => {
    if(this.state.editing === false){
      console.log('setting state to true');
      this.setState({
        editing:true
      })
    } else {
      console.log('setting state to false');
      if(this.state.collection.length > 0){
        this.props.dispatch({ 
          type: 'POST_COLLECTION',
          payload: this.state
      })
      }
      this.setState({
        editing: false,
      })
    }
  }
  handleCollectionText = (event) => {
    this.setState({
      collection: event.target.value,
    })
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
    let addEdit;
    if(this.state.editing === false){
      addEdit = (
          <div onClick={this.handleAddEdit}>Click on me to Add a New Collection</div>
      )
    } else {
      addEdit = (<div><textarea onChange={this.handleCollectionText} placeholder='Type the name of your new collection'></textarea><br/><button onClick={this.handleAddEdit}>Add To Collection</button></div>)
      }

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
          {addEdit}
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

