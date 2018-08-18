//Segments Page
//Displays segments submitted by user
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchingSegments} from '../../store/actions/stories';
import PageFrame from '../PageFrame';
import ItemList from '../../components/ItemList';

//Component
class SegmentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      mySegments: []
    };
  }

  //Lifecycle methods
  //Call action to fetch segments submitted by user
  //Note: CWM should be replaced by CDM
  componentWillMount() {
    const {_id} = this.props.currentUser;
    this.props.fetchingSegments(_id);
  }

  //Updates component once segments are received
  //Note: CWRP should be replaced by CDU
  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      mySegments: nextProps.mySegments
    });
  }

  //Rendering component
  render () {
    return (
      <PageFrame history={this.props.history}>
        <section className='content-header width-restriction'>
          <h4>My contributions</h4>
        </section>
        <ItemList data={this.state.mySegments} emptyMessage='segments' isSegments/>
      </PageFrame>
    );
  }
}

//React-Redux: mapping global state to props
const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    mySegments: state.stories.mySegments
  };
}

//Export
export default connect(mapStateToProps, {fetchingSegments})(SegmentsPage);
