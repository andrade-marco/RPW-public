//App Navigation
import React from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

//General pages
import LandingPage from './gen-pages/LandingPage';
import SignUpPage from './gen-pages/SignUpPage';

//App pages
import HomePage from './app-pages/HomePage';
import ProfilePage from './app-pages/ProfilePage';
import StoriesPage from './app-pages/StoriesPage';
import SegmentsPage from './app-pages/SegmentsPage';
import NewStoryPage from './app-pages/NewStoryPage';
import SingleStoryPage from './app-pages/SingleStoryPage';

//Determine end-point based on user authentication
const routing = function(page, isReversed) {
  const hasToken = localStorage.jwtToken;
  const endPoint = (hasToken && isReversed) ? <Redirect to='/home'/> :
                   (!hasToken && !isReversed) ? <Redirect to='/'/> : page;
  return endPoint;
}

const AppNavigation = (props) => {
  return (
    <Switch>
      <Route exact path='/' render={props => routing(<LandingPage {...props}/>, true)}/>
      <Route exact path='/signup' render={props => routing(<SignUpPage {...props}/>, true)}/>
      <Route exact path='/home' render={props => routing(<HomePage {...props}/>)}/>
      <Route exact path='/profile' render={props => routing(<ProfilePage {...props}/>)}/>
      <Route exact path='/stories' render={props => routing(<StoriesPage {...props}/>)}/>
      <Route exact path='/segments' render={props => routing(<SegmentsPage {...props}/>)}/>
      <Route exact path='/stories/new' render={props => routing(<NewStoryPage {...props}/>)}/>
      <Route path='/stories/:id' render={props => routing(<SingleStoryPage {...props}/>)}/>
      <Route render={() => <Redirect to='/'/>}/>
    </Switch>);
  }

export default withRouter(AppNavigation);
