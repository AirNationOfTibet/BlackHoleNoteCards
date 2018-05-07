import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './UserPageCss.css';
import Grid from 'material-ui/Grid';


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
      <Grid container alignContent={'center'} justify={'center'} style={{height:'100px'}}><Link className='aCollection' to="/createcard" onClick={() => this.handleNotecardCollection(this.props.collection)}>
        {this.props.collection.collection}
        </Link>
      </Grid>
    )
  }
}

export default connect(mapStateToProps)(CollectionsItem);
