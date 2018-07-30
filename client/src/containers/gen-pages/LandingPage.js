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

    if (sampleStories.length >= 0) {
      return (
        <div className="container">
          <h5>Featured stories</h5>
          <div className="row">
            <div className="col-md-6 p-2" style={{margin: 'auto'}}>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>Capillarity</h5>
                  <p className='card-text'>
                    Nobody could tell you when it started. But everyone in that little town would tell you that it came suddenly and without a warning. It started with a few men who lived in the west end of the town. For each of those men, the process took about a month. At the start of the month, they all had a full head of hair, but thirty days later they were completely bald. Not a single hair left on their heads.
                  </p>
                  <p className='card-text'>
                    At first the “hairless plague”, as the residents called it, only affected men, and in about a year, all of them had gone through the thirty-day balding period. After that, however, the epidemic started to affect women. For them, the process lasted forty-five days, but again after a full year, all of the town’s women were completely bald.
                  </p>
                  <p className='card-text'>
                    The most difficult moment for the residents came when the plague started to affect children. A massive commotion ensued, with the town’s mayor finally declaring the situation a state of emergency.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-12 p-2">
                  <div className='card'>
                    <div className='card-body'>
                      <h5 className='card-title'>Feynman’s Appeal</h5>
                      <p className='card-text'>
                        Since the Great Fracture, I had never seen a rainy day like that one. Droplets hitting the roof sounded like tiny bombs. A familiar sound from the old times. I sat inside listening to the clock ticking irregularly, it was quite annoying. Nobody knew how to fix it. Nobody needed to know the time anymore, just me. I was waiting for the target’s name and location.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 p-2">
                  <div className='card'>
                    <div className='card-body'>
                      <h5 className='card-title'>The present habit</h5>
                      <p className='card-text'>
                        It was his eighteenth birthday. He wasn’t sure his parents would remember it. He definitely was not expecting gifts. They had been busy, it wasn’t negligence. He also didn’t think he was that important anyway. There was no party plans or friends coming over. Standing in front of a mirror he decided to give a gift to himself.
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
              Let your imagination and writing skills take over. In RPW, stories are not just written, they are built. Working together, writers can build stories by creating new storylines and contributing to each other stories. The community then votes on whether or not proposed contributions should become part of the main storylines. Better writing increases the chances of your contributions being accepted and improve your reputation, giving you more privileges within the community.
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
