import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import { IconButton, Typography, Grid, withStyles } from 'material-ui';
import red from 'material-ui/colors/red';
import { Delete, Edit, Favorite, ExpandMore} from '@material-ui/icons';

const mapStateToProps = reduxState => ({
    reduxState,
  });

const styles = theme => ({
  card: {
    textAlign: 'center',
    maxWidth: 500,
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
  state = { expanded: false };

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

  render() {
    const { classes } = this.props;
    return (
      <Grid container direction={'column'} item xs={12}>
        <Card className={classes.card}>
          <CardHeader
           subheader={this.props.notecard.collection}
          />
          <CardContent>
            <Typography>
                {this.props.notecard.frontside}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton>
              <Favorite/>
            </IconButton>
            <IconButton>
              <Delete onClick={this.handleDeleteClick} />
            </IconButton>
            <IconButton>
              <Edit />
            </IconButton>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
            >
              <ExpandMore />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>
                {this.props.notecard.backside}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    );
  }
}

NotecardCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const NotecardCardWrapped = withStyles(styles)(NotecardCard)

export default connect(mapStateToProps)(NotecardCardWrapped);
