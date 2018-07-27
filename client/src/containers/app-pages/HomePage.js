//Home Page
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchingStories} from '../../store/actions/stories';
import PageFrame from '../PageFrame';
import ItemList from '../../components/ItemList';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: {
        subscribers: true
      },
      currentUser: {},
      stories: []
    };
  }

  //Lifecycle methods
  componentWillMount() {
    this.props.fetchingStories();
    this.setState({...this.state, stories: this.props.stories});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, stories: nextProps.stories});
  }

  //Helper methods
  //Setting button class
  setButtonClass = buttonName => {
    const {activeButton} = this.state;
    return activeButton[buttonName] ? 'btn btn-light active' : 'btn btn-light';
  }

  //Handling click on group button filtering
  handleFilterClick = event => {
    let updateState = {
      ...this.state,
      activeButton: {}
    }
    updateState.activeButton[event.target.name] = true;
    this.setState(updateState)
  }

  //Rendering component
  render () {
    return (
      <PageFrame history={this.props.history}>
        <section className='content-header width-restriction'>
          <h4>Top stories</h4>
          <div className="btn-group btn-group-sm" role="group">
            <button
              type="button"
              name='subscribers'
              className={this.setButtonClass('subscribers')}
              onClick={this.handleFilterClick}>
              Subscribers
            </button>
            <button
              type="button"
              name='rating'
              className={this.setButtonClass('rating')}
              onClick={this.handleFilterClick}>
              Rating
            </button>
          </div>
        </section>
        <ItemList data={this.state.stories} emptyMessage='stories'/>
      </PageFrame>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    stories: state.stories.allStories
  };
}

export default connect(mapStateToProps, {fetchingStories})(HomePage);
