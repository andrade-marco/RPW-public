//Home Page
//Displays all stories available for subscribing and reading
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchingStories} from '../../store/actions/stories';
import PageFrame from '../PageFrame';
import ItemList from '../../components/ItemList';

//Component
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
  //Call action to fetch stories from API
  //Note: CWM should be replaced by CDM
  componentWillMount() {
    this.props.fetchingStories();
    this.setState({...this.state, stories: this.props.stories});
  }

  //Updates local state when stories from API are received
  //Note: CWRP should be replaced by CDU
  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, stories: nextProps.stories});
  }

  //Helper methods
  //Setting filtering buttons class to indicate which one is selected
  //Note: filtering functionality not implemented yet
  setButtonClass = buttonName => {
    const {activeButton} = this.state;
    return activeButton[buttonName] ? 'btn btn-light active' : 'btn btn-light';
  }

  //Handling click on group button filtering
  //Note: filtering functionality not implemented yet
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

//React-Redux: mapping global state to props
const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    stories: state.stories.allStories
  };
}

//Export
export default connect(mapStateToProps, {fetchingStories})(HomePage);
