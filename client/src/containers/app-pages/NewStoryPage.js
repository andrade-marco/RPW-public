import React, { Component } from 'react';
import {connect} from 'react-redux';
import PageFrame from '../PageFrame';
import {creatingNewStory, clearingError} from '../../store/actions/stories';

class NewStoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      genre: '',
      initialText: '',
      error: ''
    };
  }

  //Lifecycle methods
  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      error: nextProps.error
    });
  }

  //Handle changes in inputs
  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  //Handle form submit
  handleStorySubmit = event => {
    event.preventDefault();
    this.props.clearingError();
    this.props.creatingNewStory(this.state, () => {
      this.props.history.push('/stories');
    });
  }

  render () {
    return (
      <PageFrame history={this.props.history}>
        <h5 className='page-title'>Create a new story</h5>
        <form className='width-restriction' onSubmit={this.handleStorySubmit}>
          <div className='form-row'>
            <div className='form-group col-md-8'>
              <label className='page-subtitle' htmlFor='title'>Story title</label>
              <input
                name='title'
                type='text'
                className='form-control'
                placeholder='Enter a title for your story'
                onChange={this.handleInputChange}
                onFocus={this.props.clearingError}/>
            </div>
            <div className='form-group col-md-4'>
              <label htmlFor="genre" className='page-subtitle'>Genre</label>
              <select
                name='genre'
                className="form-control"
                onChange={this.handleInputChange}
                onFocus={this.props.clearingError}>
                <option defaultValue>Choose a genre</option>
                <option>Crime/detective</option>
                <option>Fable</option>
                <option>Fairy tale</option>
                <option>Fan fiction</option>
                <option>Fantasy</option>
                <option>Folklore</option>
                <option>Historical fiction</option>
                <option>Horror</option>
                <option>Humor</option>
                <option>Legend</option>
                <option>Magical realism</option>
                <option>Meta fiction</option>
                <option>Mystery</option>
                <option>Mythology</option>
                <option>Mythopoeia</option>
                <option>Realistic fiction</option>
                <option>Science fiction</option>
                <option>Suspense/thriller</option>
                <option>Tall tale</option>
                <option>Western</option>
              </select>
            </div>
          </div>
          <div className='form-group'>
            <label className='page-subtitle' htmlFor='initialText'>
              How does it start? <span style={{fontStyle: 'italic'}} className='page-footnotes'> (You will NOT be able to edit the initial text, once the new story is created)</span>
          </label>
          <textarea
            name='initialText'
            type='text'
            className='form-control'
            placeholder='Tell us how it all begins...'
            onChange={this.handleInputChange}
            onFocus={this.props.clearingError}/>
            <div className='text-right page-footnotes'>0 out 250 words</div>
          </div>
          <div className='text-right'>
            <button type='submit' className='btn std-button'>Create new story</button>
            <div style={{marginTop: '5px'}} className='general-error'>{this.state.error}</div>
          </div>
        </form>
      </PageFrame>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    error: state.errors.error
  };
}

export default connect(mapStateToProps, {creatingNewStory, clearingError})(NewStoryPage);
