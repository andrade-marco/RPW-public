//Navigation bar
//Application's navigation bar has three types: in-app, out-app, and simple
//In-version includes user profile summary, while out-app includes login form and sign up link
//Simple version contains only app logo
import React from 'react';
import {NavLink} from 'react-router-dom';
import LoginForm from './LoginForm';
import Divider from './Divider';
import ProfileSummary from './ProfileSummary';

//Component
const NavBar = ({
  navType,
  user,
  error,
  onSubmit,
  onChange,
  clearError,
  signOut,
  onMenuClick,
  menuVisible}) => {

  //Check for version of the navbar and add appropriate classes/logo
  const navClass = (navType) ? 'navbar '+ navType + '-navbar' : 'navbar';
  const imgUrl = (navType === 'out-app') ? "/images/rpw_logo.svg" : "/images/rpw_icon.svg";
  const imgHeight = (navType === 'out-app') ? 50 : 40;

  //Generating content of right panel of navbar
  function generateNavContent() {
    if (navType === 'out-app') {
      return ([
        <li key={1} className="nav-item resp-hide" style={{position: 'relative'}}>
          <div className='general-error navbar-error'>{error}</div>
          <LoginForm onChange={onChange} onSubmit={onSubmit} onFocus={clearError} horizontal/>
        </li>,
        <li key={2} className='resp-hide'>
          <Divider vertical/>
        </li>,
        <li key={3} className="nav-item resp-hide">
          <NavLink className='nav-link' exact to='/signup'>Sign up</NavLink>
        </li>,
        <li key={4} className='nav-item centered-item resp-show'>
          <i onClick={onMenuClick} style={styles.barMenu} className="fas fa-bars"/>
        </li>
      ]);

    } else if (navType === 'in-app') {
      return ([
        <li key={1} className="nav-item resp-hide">
          <ProfileSummary user={user}/>
        </li>,
        <li key={2} className="nav-item centered-item resp-hide" onClick={signOut}>
          <i className="fa fa-sign-out signout-link"/>
        </li>,
        <li key={3} className='nav-item centered-item resp-show'>
          <i onClick={onMenuClick} style={styles.barMenu} className="fas fa-bars"/>
        </li>
      ]);
    }
  }

  //Showing/hiding dropdown menu (responsive)
  function renderMenu(isVisible) {
    const {dropdownStyle} = styles;

    if (isVisible) {
      //Out app version includes the login form and signup link in responsive dropdown
      if (navType === 'out-app') {
        return (
          <div className='card nav-dropdown-menu' style={dropdownStyle}>
            <LoginForm
              header='Sign in'
              onChange={onChange}
              onSubmit={onSubmit}/>
            <div className='general-error'>{error}</div>
            <Divider/>
            <NavLink className='nav-link text-center' exact to='/signup'>
              Sign up
            </NavLink>
          </div>
        );
      } else {
        //In-app version contains same links found in fullscreen sidebar
        return (
          <div className='card nav-dropdown-menu' style={dropdownStyle}>
            <ProfileSummary user={user}/>
            <hr/>
            <NavLink className='nav-link' exact to='/'>
              Home
            </NavLink>
            <NavLink className='nav-link' exact to='/stories'>
              My stories
            </NavLink>
            <NavLink className='nav-link' exact to='/segments'>
              My contributions
            </NavLink>
            <hr/>
            <NavLink className='nav-link' exact to='/stories/new'>
              <i className='fa fa-plus'></i>Create new story
            </NavLink>
            <hr/>
            <div className="nav-link" onClick={signOut}>
              <i className="fa fa-sign-out"/> Sign out
            </div>
          </div>
        );
      }
    }
  }

  //Return navbar
  return (
    <nav className={navClass}>
      <NavLink className='navbar-brand' exact to='/'>
        <img src={imgUrl} height={imgHeight} alt="RPW logo"/>
      </NavLink>
      <ul className='nav justify-content-end'>
        {generateNavContent()}
      </ul>
      {renderMenu(menuVisible)}
    </nav>
  );
}

//Styles
const styles = {
  barMenu: {
    color: '#C20114',
    cursor: 'pointer'
  },
  dropdownStyle: {
    minWidth: '240px',
    padding: '12px',
    position: 'absolute',
    top: 50,
    right: 22,
    backgroundColor: '#FFF',
    zIndex: 99
  }
}

//Export
export default NavBar;
