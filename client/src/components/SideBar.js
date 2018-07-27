//In-app sidebar
import React from 'react';
import {NavLink} from 'react-router-dom';

const SideBar = (props) => {
  return (
    <nav className="nav flex-column side-bar">
      <NavLink className='nav-link' exact to='/home' activeStyle={{color: '#C20114'}}>
        Home
      </NavLink>
      <NavLink className='nav-link' exact to='/stories' activeStyle={{color: '#C20114'}}>
        My stories
      </NavLink>
      <NavLink className='nav-link' exact to='/segments' activeStyle={{color: '#C20114'}}>
        My contributions
      </NavLink>
      <div className='nav-divider'></div>
      <NavLink className='nav-link' exact to='/stories/new' activeStyle={{color: '#C20114'}}>
        <i className='fa fa-plus'></i>Create new story
      </NavLink>
    </nav>
  );
}

export default SideBar;
