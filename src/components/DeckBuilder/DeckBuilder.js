import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import DeckBuilderItem from './DeckBuilderItem.js';

const mapStateToProps = state => ({
  user: state.user,
  state
});

class DeckBuilder extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type: 'FETCH_NOTECARD'})
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;
    let notecardBuilder = this.props.state.collectionView.deckbuilderReducer.map((notecard)=>{
    console.log('helloo', this.props.state.collectionView.deckbuilderReducer);
      return( <DeckBuilderItem key={notecard.id} notecard={notecard}/> ) 
    })

    if (this.props.user.userName) {
      content = (
        <div>
         {notecardBuilder}
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DeckBuilder);
