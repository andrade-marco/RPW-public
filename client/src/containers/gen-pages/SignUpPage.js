//Sign Up Page
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signingUser, clearingError} from '../../store/actions/auth';
import NavBar from '../../components/NavBar';

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      requesting: false,
      error: ''
    }
  }

  //Lifecycle
  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      requesting: false,
      error: nextProps.error
    });
  }

  //Handling input change
  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value.trim()
    });
  }

  //Handling sign up submit
  handleSignUpSubmit = event => {
    event.preventDefault();
    this.props.clearingError();
    this.props.signingUser('signup', this.state, () => this.props.history.push('/home'));
    this.setState({
      ...this.state,
      requesting: true
    });
  }

  //Show loading while making request
  showMessage = () => {
    const {requesting, error} = this.state;
    if (requesting) return <div style={{paddingTop: '10px'}}>Creating new user...</div>;
    if (error) return <div style={{color: '#C20114', paddingTop: '10px'}}>{error}</div>;
  }

  render () {
    return(
      <div className='page-wrapper'>
        <section>
          <NavBar/>
          <div className='vt-form-container'>
            <form className='signup-form' onSubmit={this.handleSignUpSubmit}>
              <h4>Start building stories!</h4>
              <div className='form-group'>
                <label htmlFor='username'>Pen name</label>
                <input
                  type='text'
                  name='username'
                  className='form-control'
                  onChange={this.handleInputChange}
                  placeholder='Enter your pen name (no spaces)'/>
                <small className="form-text text-muted">What readers and authors will see as your name.</small>
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='text'
                  name='email'
                  className='form-control'
                  onChange={this.handleInputChange}
                  placeholder='e.g. yourname@example.com'/>
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  name='password'
                  className='form-control'
                  onChange={this.handleInputChange}
                  placeholder='At least 6 characters long'/>
              </div>
              <button type="submit" className="btn btn-block std-button">Submit</button>
            </form>
            {this.showMessage()}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    error: state.errors.error
  };
}

export default connect(mapStateToProps, {signingUser, clearingError})(SignUpPage);
