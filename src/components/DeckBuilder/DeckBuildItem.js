import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import { IconButton, Typography, Grid, withStyles, Tooltip, TextField, Button } from 'material-ui';
import { Delete, Edit, Favorite, ExpandMore} from '@material-ui/icons';

const mapStateToProps = reduxState => ({
    reduxState,
  });

const styles = theme => ({
  card: {
    textAlign: 'center',
    maxWidth: 700,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

class NotecardCard extends Component {
  state = { 
    expanded: false,
    editMode: false,
    collection: '',
    frontside: '',
    backside: '',
  };

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_NOTECARD'})
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleDeleteClick = (event) => {
    console.log('handleDeleteClicked');
    this.props.deleteNotecard(this.props.notecard); 
  }
  handleEdit = (event) => {
    console.log('handleEdit clicked');
    this.setState({
      editMode: true
    })
  }
  changeEditNormal = (event) => {
    this.setState({
      editMode: false
    })
  }
  handleInputs = (name) => {
    return(event)=>{
      this.setState({
        [name] : event.target.value,
      })
    }
  }

  editNotecard = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type:'UPDATE_NOTECARD',
      payload: {
        editContent:this.state,
        notecard: this.props.notecard
      }
    })
    this.setState({
      editMode: false,
    })
  }

  render() {
    const { classes } = this.props;
    if(this.state.editMode === false){
    return (
      <Grid container direction={'column'} item xs={12}>
        <Card className={classes.card}>
          <CardHeader subheader={this.props.notecard.collection}/>
          <CardContent>
            <Typography>{this.props.notecard.frontside}</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Tooltip id="tooltip-icon" title="Favorite">
              <IconButton>
                <Favorite/>
              </IconButton>
            </Tooltip>
            <Tooltip id="tooltip-icon" title="Delete">
              <IconButton>
                <Delete onClick={this.handleDeleteClick} />
              </IconButton>
            </Tooltip>
            <Tooltip id="tooltip-icon" title="Edit">
              <IconButton>
                <Edit onClick={this.handleEdit} />
              </IconButton>
            </Tooltip>
            <Tooltip id="tooltip-icon" title="View Answer">
              <IconButton className={classnames(classes.expand, {[classes.expandOpen]: this.state.expanded,})} onClick={this.handleExpandClick} aria-expanded={this.state.expanded}>
                <ExpandMore />
              </IconButton>
            </Tooltip>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>{this.props.notecard.backside}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    )} else if(this.state.editMode === true) {
      return(
        <Grid container direction={'column'} item xs={12}>
          <Card className={classes.card}>
            <form onSubmit={this.editNotecard}>
              Front Side:<TextField onChange={this.handleInputs('frontside')} />
              <br/>
              <br/>
              Back Side:<TextField onChange={this.handleInputs('backside')} />
              <br/>
              <br/>
              <br/>
              <br/>
              <Button variant="flat" color="primary" type="submit">Save</Button>
              <Button variant="flat" color="primary" type="button" onClick={this.changeEditNormal}>Cancel</Button>
            </form>
          </Card>
        </Grid>
      )}
  }
}



NotecardCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const NotecardCardWrapped = withStyles(styles)(NotecardCard)

export default connect(mapStateToProps)(NotecardCardWrapped);
