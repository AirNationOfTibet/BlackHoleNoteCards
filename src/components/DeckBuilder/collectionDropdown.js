import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    state
  });


class CollectionDropdown extends Component {
  render(){
    return(
        <option>{this.props.collection.collection}</option>
    )
  }
}

export default connect(mapStateToProps)(CollectionDropdown);
