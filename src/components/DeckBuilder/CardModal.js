import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import CollectionDropdown from './collectionDropdown.js'

const mapStateToProps = reduxState => ({
  reduxState,
});


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 70,
    height: theme.spacing.unit * 55,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends Component {
  state = {
    open: false,
    frontside: '',
    backside: '',
    collection: '',
  };
  

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleNotecard = (name) => {
    return (event) => {
      this.setState({
        [name]: event.target.value,
      })
    }
  }

  addNewNotecard = event => {
    event.preventDefault();
    this.props.dispatch({ 
      type: 'ADD_NOTECARD', 
      payload: this.state
    })
    this.setState({
      open: false,
      frontside: '',
      backside: '',
      collection: '',
    })
  }
  

  render() {
    let collectionDropdown = this.props.reduxState.collectionView.collectionReducer.map((collection)=>{
      return(<CollectionDropdown key={collection.id} collection={collection}/>)
    })

    const { classes } = this.props;
    return (
      <div>
        <Button variant="raised" color="primary" onClick={this.handleOpen}>Add a New Card</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography>Front Side<br/><textarea rows='4' cols='50' style={{fontSize:'20px'}} onChange={this.handleNotecard('frontside')} placeholder='Your front notecard'></textarea></Typography>
            <Typography>Back Side<br/><textarea rows='4' cols='50' style={{fontSize:'20px'}} onChange={this.handleNotecard('backside')} placeholder='Your back notecard'></textarea></Typography>
            <Typography variant="subheading" id="simple-modal-description">
            <select style={{fontSize:'30px'}} onChange={this.handleNotecard('collection')}>
            <option>Choose collection</option>
             {collectionDropdown}
            </select>
            </Typography>
            <br/>
            <Button variant="raised" color="primary" size="small" onClick={this.addNewNotecard}>add</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default connect(mapStateToProps)(SimpleModalWrapped);

