import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionsItem from './CollectionsItem.js';
import './UserPageCss.css';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';


import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


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
  render() {
    let addEdit;
    if(this.state.editing === false){
      addEdit = (
          <div style={{height: '100px', fontSize:'30px'}} onClick={this.handleAddEdit}>Click Me To Add Collection</div>
      )
    } else {
      addEdit = (<div style={{height: '100px'}}><textarea rows='3' cols='60' style={{fontSize:'25px'}} onChange={this.handleCollectionText} placeholder='Type the name of your new collection'></textarea><br/><Button variant="raised" color="primary" onClick={this.handleAddEdit}>Add</Button></div>)
      }

    let collectionItem = this.props.state.collectionView.collectionReducer.map((collection)=>{
      return(<CollectionsItem key={collection.id} collection={collection}/>)
    })
    let content = null;
    if (this.props.user.userName) {
      content = (
        <div>
          <Grid container alignContent={'center'} justify={'center'}>
          <h2 id="welcome">Welcome, { this.props.user.userName }!</h2>
          </Grid>
          <Grid container alignContent={'center'} justify={'center'}>
          {addEdit}
          </Grid>
          {collectionItem}
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
        { this.props.state.collectionReducer}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

