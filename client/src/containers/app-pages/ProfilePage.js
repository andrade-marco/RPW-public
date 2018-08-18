//Profile page
//User's profile page showing information on user's account and forms for changing information
//Note: this page is not currently being used
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PageFrame from '../PageFrame';
import {retrievingProfile} from '../../store/actions/profile';

//Component
class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: {}
    };
  }

  //Lifecycle methods
  //Calls action for retrieving user information
  //Note: CWM should be replaced with CDM
  componentWillMount() {
    const {_id} = this.props.currentUser;
    this.props.retrievingProfile(_id);
  }

  //Updates component once user profile information is received
  //Note: CWRP should be replaced with CDU
  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      userProfile: nextProps.userProfile
    });
  }

  //Event handlers
  //Handles changes in form inputs
  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  //Handles form submit
  handleStorySubmit = event => {
    event.preventDefault();

  }

  //Rendering component
  render () {
    const {avatarStyle, repStyle} = styles;
    const {username, reputation} = this.state.userProfile;
    const repScore = (reputation) ? reputation.score : 0;
    const repDesignation = (reputation) ? reputation.designation : '';

    return (
      <PageFrame history={this.props.history}>
        <h4>Profile</h4>
        <section
          className='d-flex flex-row align-items-center card p-3 rounded width-restriction'>
          <img
            style={avatarStyle}
            src='/images/avatar_placeholder.png'
            alt=''/>
          <div>
            <h4>{username}</h4>
            <h6 style={repStyle}>WR: {repScore} | {repDesignation}</h6>
          </div>
        </section>
        <section className='container'>
          <div className='row'>
            <div className='col-md-6 p-3'></div>
          </div>
        </section>
      </PageFrame>
    );
  }
}

//Styles
const styles = {
  avatarContainer: {
    padding: '15px 5px'
  },
  avatarStyle: {
    width: '100px',
    height: '100px',
    borderRadius: '100px',
  },
  profileContainer: {
    alignItems: 'center'
  },
  labelStyle: {
    fontSize: '0.9em',
    color: '#C7D6D5'
  },
  repStyle: {
    color: '#C20114',
    fontWeight: 'lighter',
    marginBottom: '8px'
  }
}

//React-Redux: mapping global state to props
const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    userProfile: state.user.userProfile
  };
}

//Export
export default connect(mapStateToProps, {retrievingProfile})(ProfilePage);
