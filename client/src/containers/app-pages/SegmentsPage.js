//Segments Page
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchingSegments} from '../../store/actions/stories';
import PageFrame from '../PageFrame';
import ItemList from '../../components/ItemList';

class SegmentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      mySegments: []
    };
  }

  //Lifecycle methods
  componentWillMount() {
    const {_id} = this.props.currentUser;
    this.props.fetchingSegments(_id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      mySegments: nextProps.mySegments
    });
  }

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

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    mySegments: state.stories.mySegments
  };
}

export default connect(mapStateToProps, {fetchingSegments})(SegmentsPage);
