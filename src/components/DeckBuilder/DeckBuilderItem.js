import React, { Component } from 'react';
import { connect } from 'react-redux';

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
            {this.props.notecard.frontside}
        </div>
      )
    }
  }
  
  export default connect(mapStateToProps)(DeckBuilderItem);
  