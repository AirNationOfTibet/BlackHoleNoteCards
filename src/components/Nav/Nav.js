import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { triggerLogout } from '../../redux/actions/loginActions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user,
})




class Nav extends Component {
  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }
  render(){
    return(
      <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/mycollection">
            My Collections
          </Link>
        </li>
        <li onClick={this.logout}>
          <Link to='/home'>Log Out
          </Link>
        </li>
      </ul>
    </div>
  </div>
    )
  }
}

export default connect(mapStateToProps)(Nav);
