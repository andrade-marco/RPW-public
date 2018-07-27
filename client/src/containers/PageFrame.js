//In-app page fram
import React, { Component } from 'react';
import {connect} from 'react-redux';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import {signingOutUser} from '../store/actions/auth';

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

  componentWillReceiveProps(nextProps) {
    this.setState({ currentUser: nextProps.currentUser });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  //Event handlers
  //Handling sign out
  handleSignOut = () => {
    this.props.signingOutUser(() => {
      this.props.history.push('/');
    });
  }

  //Handle menu click
  handleMenuClick = event => {
    event.stopPropagation();
    this.setState(prevState => ({
      ...prevState,
      menuVisible: !prevState.menuVisible
    }));
  }

  //Resizing handler
  handleResize = () => {
    this.setState({...this.state, menuVisible: false});
  }

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

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  };
}

export default connect(mapStateToProps, {signingOutUser})(PageFrame);
