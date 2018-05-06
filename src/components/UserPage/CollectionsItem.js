import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
    state
  });


class CollectionsItem extends Component {

  handleNotecardCollection = (collection) =>{
    this.props.dispatch({
      type: "SET_DECKBUILDER_COLLECTION",
      payload: collection
    })
  }

  render(){
    return(
      <div><Link to="/createcard" onClick={() => this.handleNotecardCollection(this.props.collection)}>
        {this.props.collection.collection}
        </Link>
      </div>
    )
  }
}

export default connect(mapStateToProps)(CollectionsItem);
