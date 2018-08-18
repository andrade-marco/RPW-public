//In-app page frame
//Sets up and display pages frame, which consists of navbar, sidebar, and main content area
import React, { Component } from 'react';
import {connect} from 'react-redux';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import {signingOutUser} from '../store/actions/auth';

//Component
class PageFrame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      contentTransition: {
        opacity: 0,
        transition: 'all 1s ease'
      },
      menuVisible: false
    };
  }

  //Lifecycle methods
  //Sets up current user and smooth transition for main content
  //Note: CWM should be replaced with CDM
  componentWillMount() {
    this.setState({ currentUser: this.props.currentUser });
    setTimeout(() => {
      this.setState({
        contentTransition: {
          opacity: 1,
          transition: 'all 1s ease'
        }
      });
    }, 10);
    window.addEventListener('resize', this.handleResize);
  }

  //Update current user when data is received
  componentWillReceiveProps(nextProps) {
    this.setState({ currentUser: nextProps.currentUser });
  }

  //Remove resizing event listener
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  //Handlers
  //Handles user sign out
  handleSignOut = () => {
    this.props.signingOutUser(() => {
      this.props.history.push('/');
    });
  }

  //Handles responsive menu icon click
  handleMenuClick = event => {
    event.stopPropagation();
    this.setState(prevState => ({
      ...prevState,
      menuVisible: !prevState.menuVisible
    }));
  }

  //Handles resizing and hides responsive menu if user left it open while resizing
  handleResize = () => {
    this.setState({...this.state, menuVisible: false});
  }

  //Render component
  render () {
    const {contentTransition} = this.state;
    return (
      <div className='page-wrapper'>
        <NavBar
          navType='in-app'
          user={this.state.currentUser}
          signOut={this.handleSignOut}
          onMenuClick={this.handleMenuClick}
          menuVisible={this.state.menuVisible}/>
        <section className='content-section'>
          <SideBar/>
          <div style={contentTransition} className='main-content'>
            {this.props.children}
          </div>
        </section>
      </div>
    );
  }
}

//React-Redux: mapping global state to props
const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  };
}

//Export
export default connect(mapStateToProps, {signingOutUser})(PageFrame);
