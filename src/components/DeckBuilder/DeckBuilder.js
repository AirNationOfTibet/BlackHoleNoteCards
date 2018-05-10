import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Grid from 'material-ui/Grid';
import SimpleModalWrapped from './CardModal.js'
import NotecardCard from './DeckBuildItem.js'


const mapStateToProps = reduxState => ({
  user: reduxState.user,
  reduxState
});

class DeckBuilder extends Component {
  constructor(props){
    super(props); 
    this.state = {
        open: 'false',
    }
}

  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type: 'FETCH_NOTECARD'})
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  deleteNotecard = (notecard) => {
    console.log('reached deleteNotecard', notecard);
    this.props.dispatch({
        type: 'DELETE_NOTECARD',
        payload: {
            notecard: notecard,
        }
    });
  }

  render() {
    let content = null;
    let notecardBuilder = this.props.reduxState.collectionView.deckbuilderReducer.map((notecard)=>{
      return( <NotecardCard key={notecard.id} notecard={notecard} deleteNotecard={this.deleteNotecard} /> ) 
    })

    if (this.props.user.userName) {
      content = (
        <div>
         {notecardBuilder}
         <Grid container alignContent={'center'} justify={'center'}>
         </Grid>
         <SimpleModalWrapped/>
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
