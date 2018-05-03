import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    state
  });

class CollectionsItem extends Component {
  render(){
    return(
      <div>
        {this.props.collection.collection}
      </div>
    )
  }
}

export default connect(mapStateToProps)(CollectionsItem);