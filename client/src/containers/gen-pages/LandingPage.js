//Home Page
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {signingUser, clearingError} from '../../store/actions/auth';
import {fetchingSampleStories} from '../../store/actions/stories';
import NavBar from '../../components/NavBar';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      sampleStories: [],
      menuVisible: false,
      error: ''
    }
  }

  //Lifecycle methods
  componentWillMount() {
    this.props.fetchingSampleStories();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      ...this.state,
      sampleStories: nextProps.sampleStories,
      error: nextProps.error
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  //Helper methods
  renderStories = () => {
    const {sampleStories} = this.state;
    console.log(sampleStories);

    if (sampleStories.length > 0) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-6 p-2" style={{margin: 'auto'}}>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>Seven billion unicorns</h5>
                  <p className='card-text'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p className='card-text'>
                    Maecenas at diam in nulla maximus fermentum ac quis enim. Cras ut velit ornare, venenatis justo quis, mollis metus. Nulla nibh lorem, tristique non rutrum et, ultricies ut urna. Aliquam dignissim massa id metus tincidunt efficitur. Suspendisse convallis sapien sed dolor consequat, sit amet viverra urna ultricies. Cras erat risus, elementum eget molestie ac, hendrerit et magna. Mauris facilisis turpis enim, vitae pulvinar est gravida tempus. Ut nec quam scelerisque, vestibulum elit at, tincidunt justo. Donec quis augue finibus, faucibus enim sit amet, maximus sem. Cras non magna purus. Nam convallis orci et tempor pharetra.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-12 p-2">
                  <div className='card'>
                    <div className='card-body'>
                      <h5 className='card-title'>The Feynman Appeal</h5>
                      <p className='card-text'>
                        Vestibulum nec lacus non sem lacinia aliquet. Praesent varius, ante vel ultrices pulvinar, lectus nibh laoreet arcu, a commodo magna lorem eget leo. Fusce risus enim, tincidunt sit amet maximus sit amet, mattis non diam. Ut id ex sed nisi facilisis suscipit et vitae odio. Aliquam massa augue, fringilla eu tincidunt et, ultricies sed ex. Proin venenatis, odio at euismod faucibus, velit eros maximus tortor, quis consequat dolor ipsum at ipsum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 p-2">
                  <div className='card'>
                    <div className='card-body'>
                      <h5 className='card-title'>The never ending story</h5>
                      <p className='card-text'>
                        In vehicula libero molestie egestas bibendum. Duis eget justo nibh. Nulla dignissim ligula ut neque gravida, vitae facilisis sem posuere. Quisque cursus interdum risus. Morbi nibh purus, lacinia nec arcu ut, suscipit egestas sapien. Cras sodales vestibulum augue vitae lacinia. Integer sed tortor pellentesque, fermentum mi ut, rhoncus ante. Donec vulputate viverra libero. Suspendisse ut mi et arcu mattis tempor eu sed nibh. Donec gravida orci in purus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  //Event handlers
  //Handling input change
  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  //Signing in users
  handleSignIn = event => {
    event.preventDefault();
    this.props.signingUser('signin', this.state, () => this.props.history.push('/home'));
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

  //Clearing error
  handleClearError = () => {
    this.props.clearingError();
  }

  render () {
    return (
      <div className='page-wrapper'>
        <NavBar
          navType='out-app'
          error={this.state.error}
          onSubmit={this.handleSignIn}
          onChange={this.handleInputChange}
          clearError={this.handleClearError}
          onMenuClick={this.handleMenuClick}
          menuVisible={this.state.menuVisible}/>
        <section style={styles.landingImage} className='opening-section'>
          <h2>Amazing stories. Built together.</h2>
        </section>
        <section className='page-section'>
          <div className='container section-content'>
            <h6 style={{color: '#C7D6D5'}} className='text-uppercase text-center'>About</h6>
            <h3 className='text-center'>
              Collectively create stories
            </h3>
            <p className="text-center p-3">
              Let your imagination and writing skills take over. In RPW, writers create stories and contribute to each other stories. The community votes on whether or not proposed contributions should become part of the main storyline. Better writing and more accepted contributions increase your reputation, giving you more priviledges within the community.
            </p>
            {this.renderStories()}
            <div className="container text-center" style={{marginTop: '20px'}}>
              <Link to='/signup'>
                <button className="btn std-button">Start writing stories</button>
              </Link>
            </div>
          </div>
        </section>
        <footer style={styles.footerStyle}>
          <div style={{fontSize: '0.85em'}}>Role Playing Words | 2018</div>
        </footer>
      </div>);
    }
}

const styles = {
  landingImage: {
    backgroundImage: "url('/images/typewriter.jpg')"
  },
  footerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0C120C',
    height: '60px',
    color: '#FFF',
    padding: '5px 20px'
  }
}

const mapStateToProps = state => {
  return {
    sampleStories: state.stories.sampleStories,
    error: state.errors.error
  };
}

export default connect(mapStateToProps, {
  signingUser,
  clearingError,
  fetchingSampleStories
})(LandingPage);
