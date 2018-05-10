import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './UserPageCss.css';
import { Delete } from '@material-ui/icons';
import { IconButton, Grid} from 'material-ui';


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

  handleDeleteClick = (event) => {
    console.log('handleDeleteClicked');
    this.props.deleteItem(this.props.collection); 
  }

            

  render(){
    return(
      <div>
      <Grid container alignContent={'center'} justify={'center'} style={{height:'100px'}}><Link className='aCollection' to="/createcard" onClick={() => this.handleNotecardCollection(this.props.collection)}>
        {this.props.collection.collection}
        </Link>
        <div>
          <IconButton>
            <Delete onClick={this.handleDeleteClick} />
          </IconButton>
        </div>
      </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps)(CollectionsItem);
