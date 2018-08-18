//Profile Summary
//Displays the user profile summary on the navbar or responsive dropdown menu
import React from 'react';
import {NavLink} from 'react-router-dom';

//Component
const ProfileSummary = ({user}) => {
  const {username, reputation} = user;
  const {avatar, repContainer} = styles;

  //Component shows user name, avatar, and reputation
  //Note: current avatar is a placeholder - functionality to upload photo not implemented yet
  return (
    <NavLink className='nav-link' exact to='/'>
      <div className='user-summary'>
        <img
          style={avatar}
          src='/images/avatar_placeholder.png'
          alt=''/>
          <div>
            <div>{username}</div>
            <div style={repContainer}>
              WR: {reputation.score} | {reputation.designation}
            </div>
          </div>
      </div>
    </NavLink>
  );
}

//Styles
const styles = {
  avatar: {
    width: '38px',
    height: '38px',
    borderRadius: '38px',
    border: '2px solid #CDCDCD',
    marginRight: '8px'
  },
  repContainer: {
    fontSize: '0.78em',
    color: '#C20114'
  }
}

//Export
export default ProfileSummary;
