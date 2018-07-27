//Home Page
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Rating} from 'semantic-ui-react';
import {
  fetchingStories,
  updatingSubscribers,
  creatingNewSegment,
  updatingVote,
  clearingError
} from '../../store/actions/stories';
import PageFrame from '../PageFrame';
import NewSegmentForm from '../../components/NewSegmentForm';
import VotingPanel from '../../components/VotingPanel';
import EmptyPanel from '../../components/EmptyPanel';

class SingleStoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStory: {},
      pages: [],
      selectedPage: 1,
      newSegment: '',
      hasVoted: false,
      error: ''
    };
  }

  //Lifecycle methods
  componentWillMount() {
    const {id} = this.props.match.params;
    this.props.fetchingStories(id);
  }

  componentWillReceiveProps(nextProps) {
    const {initialText, segments} = nextProps.currentStory;
    let pagesArray = [];
    let segmentsCopy = segments.filter(val => val.status === 'accepted');
    pagesArray[0] = [{content: initialText}, segmentsCopy[0], segmentsCopy[1]];

    segmentsCopy = segmentsCopy.slice(2);
    while (segmentsCopy.length) {
      var newPage = segmentsCopy.splice(0,3);
      pagesArray.push(newPage);
    }

    this.setState({
      ...this.state,
      currentStory: nextProps.currentStory,
      pages: pagesArray,
      error: nextProps.error
    });
  }

  //Helper methods
  //Setting control buttons
  settingStoryControls = () => {
    if ('subscribers' in this.state.currentStory) {
      const {pages} = this.state;
      const {_id} = this.props.currentUser;
      const {subscribers} = this.state.currentStory || {};
      const isSubscriber = subscribers.findIndex(val => val === _id) !== -1 || false;
      const btnText = (isSubscriber) ? 'Unsubscribe' : 'Subscribe';
      const btnClass = (isSubscriber) ? 'btn btn-light' : 'btn std-button';
      const subNum = subscribers.length;

      return (
        <div className='general-column justify-between'>
          <button className={btnClass} onClick={this.handleSubscription}>
            {btnText} | {subNum}
          </button>
          <div className='page-count-container'>
            <div>
              Page
              <input
                type='number'
                min='1'
                max={pages.length}
                defaultValue='1'
                onChange={this.handlePageChange}/>
               of {pages.length}
            </div>
          </div>
        </div>
      );
    }
  }

  //Setting up the current story
  settingUpPage = () => {
    const {selectedPage, pages} = this.state;
    if (pages.length > 0 && selectedPage <= pages.length && selectedPage > 0) {
      const currentPage = pages[selectedPage - 1].map((val,i) => {
        if (val) {
          return <div key={i}><br/>{val.content}</div>
        } else {
          return val;
        }
      });

      return <div className='story-container'>{currentPage}</div>;
    }

  }

  //Setting up extra section (voting/contributing);
  settingUpExtra = () => {
    if ('subscribers' in this.state.currentStory) {
      const {_id} = this.props.currentUser;
      const {status, subscribers, segments} = this.state.currentStory || {};
      const isSubscriber = subscribers.findIndex(val => val === _id) !== -1 || false;

      if (isSubscriber) {
        if (status === 'open') {
          return (
            <NewSegmentForm
              onChange={this.handleInputChange}
              onSubmit={this.handleSegmentSubmit}
              clearError={this.props.clearingError}
              error={this.state.error}/>
          );
        } else if (status === 'voting') {
          const newSegment = segments.find(val => val.status === 'voting');
          return (
            <VotingPanel
              segment={newSegment}
              onVoting={this.handleVoting}
              hasVoted={this.state.hasVoted}/>
          );
        }
      } else {
        return <EmptyPanel type='subscribe'/>;
      }
    }
  }

  //Event handlers
  //Handling page changes
  handlePageChange = event => {
    const pageNum = this.state.pages.length;
    const {value} = event.target;
    const newPage = (value > pageNum) ? pageNum : value;
    event.target.value = newPage;

    this.setState({
      ...this.state,
      selectedPage: newPage || 1
    });
  }

  //Handling input change
  handleInputChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  //Handling new segment submittion
  handleSegmentSubmit = event => {
    event.preventDefault();
    const {currentStory, newSegment} = this.state;
    this.props.clearingError();
    this.props.creatingNewSegment(currentStory._id, newSegment);
  }

  //Handling segment voting
  handleVoting = (event, segmentId) => {
    const {name} = event.target;
    const {_id} = this.state.currentStory;
    this.props.updatingVote(name, _id, segmentId, () => {
      this.setState({
        ...this.state,
        hasVoted: true
      });
    });
  }

  //Handling story subscription
  handleSubscription = event => {
    const {_id} = this.state.currentStory;
    this.props.updatingSubscribers(_id);
  }

  //Rendering component
  render () {
    const {title, genre, status} = this.state.currentStory;
    const statusClass = (status === 'open') ? 'badge badge-pill badge-success' :
                        (status === 'voting') ? 'badge badge-pill badge-warning' :
                        'badge badge-pill badge-primary';

    return (
      <PageFrame history={this.props.history}>
        <header className='story-header width-restriction'>
          <div className='story-info'>
            <h4>{title}</h4>
            <div>
              <label style={{paddingRight: '5px'}}>Your rating</label>
              <Rating className='rating-full' maxRating={5} clearable/>
            </div>
            <span className={statusClass} style={{marginRight: '5px'}}>{status}</span>
            <span className="badge badge-pill badge-secondary">{genre}</span>
          </div>
          {this.settingStoryControls()}
        </header>
        <section className='width-restriction'>
          {this.settingUpPage()}
        </section>
        <section className='width-restriction'>
          {this.settingUpExtra()}
        </section>
      </PageFrame>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    currentStory: state.stories.currentStory,
    error: state.errors.error
  };
}

export default connect(mapStateToProps, {
  fetchingStories,
  updatingSubscribers,
  creatingNewSegment,
  updatingVote,
  clearingError
})(SingleStoryPage);
