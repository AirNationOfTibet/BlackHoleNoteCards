import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './UserPageCss.css';
import { Delete } from '@material-ui/icons';
import { IconButton, Grid, Tooltip, withStyles} from 'material-ui';
import PropTypes from 'prop-types';


const mapStateToProps = state => ({
    state
});


const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});


class CollectionsItemStart extends Component {
  

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
          <Tooltip id="tooltip-icon" title="Delete">
            <IconButton>
              <Delete onClick={this.handleDeleteClick} />
            </IconButton>
          </Tooltip>
        </div>
      </Grid>
      </div>
    )
  }
}

CollectionsItemStart.propTypes = {
  classes: PropTypes.object.isRequired,
};

const CollectionsItem = withStyles(styles)(CollectionsItemStart);

export default connect(mapStateToProps)(CollectionsItem);
