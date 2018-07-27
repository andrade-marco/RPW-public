//Stories Page
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchingStories} from '../../store/actions/stories';
import PageFrame from '../PageFrame';
import ItemList from '../../components/ItemList';

class StoriesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: {
        subscribers: true
      },
      currentUser: {},
      myStories: []
    };
  }

  //Lifecycle methods
  componentWillMount() {
    this.props.fetchingStories(null, this.props.currentUser._id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, myStories: nextProps.myStories});
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

  render () {
    return (
      <PageFrame history={this.props.history}>
        <section className='content-header width-restriction'>
          <h4>My Stories</h4>
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
        <ItemList data={this.state.myStories} emptyMessage='myStories'/>
      </PageFrame>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    myStories : state.stories.myStories
  };
}

export default connect(mapStateToProps, {fetchingStories})(StoriesPage);
