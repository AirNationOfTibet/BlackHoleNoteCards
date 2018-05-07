import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';

const mapStateToProps = state => ({
    state,
  });

class DeckBuilderItem extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_NOTECARD'})
      }
    render(){
      return(
        <div>
          <Grid container alignContent={'center'} justify={'center'}>
          <h2>{this.props.notecard.collection_name}</h2>
          </Grid>
          <Grid container alignContent={'center'} justify={'center'}>
            {this.props.notecard.frontside}
          </Grid>
        </div>
      )
    }
  }
  
  export default connect(mapStateToProps)(DeckBuilderItem);
  