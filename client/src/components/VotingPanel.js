//Voting Panel
//Panel that appears at the bottom of stories that have segments being voted on
import React from 'react';

//Component
const VotingPanel = ({segment, onVoting, hasVoted}) => {
  const {votingHeader, segmentBox, votingButtons, votesContainer} = styles;
  let positive, negative;
  if(segment && !hasVoted) {
    positive = segment.votes.filter(val => val.choice === 'positive').length;
    negative = segment.votes.filter(val => val.choice === 'negative').length;

    return (
      <div className='story-extra card'>
        <header className='spaced-row' style={votingHeader}>
          <h5 style={{flex: 1, alignSelf: 'center'}}>Next...</h5>
          <div style={votesContainer}>
            <div className='rating-badge'>
                <i className="fa fa-thumbs-up"/> {positive || 0}
            </div>
            <div className='rating-badge'>
                <i className="fa fa-thumbs-down"/> {negative || 0}
            </div>
          </div>
        </header>
        <div style={segmentBox}>{segment.content}</div>
        <div className="btn-group w-100" role="group">
          <button
            name='positive'
            onClick={event => onVoting(event, segment._id)}
            className='btn btn-success w-50'
            style={votingButtons.left}>
            <i className='fa fa-thumbs-up'/> Keep
          </button>
          <button
            name='negative'
            onClick={event => onVoting(event, segment._id)}
            className='btn btn-danger w-50'
            style={votingButtons.right}>
            <i className='fa fa-thumbs-down'/> Reject
          </button>
        </div>
      </div>
    );
  } else if (hasVoted) {
    return (
      <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">Thank you for voting!</h4>
        <p>Your vote was registered successfully. Please check back soon to see if the segment was accepted by the voting subscribers of this story.</p>
        <hr/>
        <p className="mb-0">Note: if you have voted on this segment previously, do not worry, your vote will not be counted multiple times.</p>
      </div>
    );
  } else {
    return <div></div>;
  }
}

//Styles
const styles = {
  votingHeader: {
    borderBottom: '1px solid #CDCDCD',
    padding: '15px'
  },
  segmentBox: {
    whiteSpace: 'pre-wrap',
    borderBottom: '1px solid #CDCDCD',
    padding: '15px'
  },
  votingButtons: {
    right: {
      borderRadius: '0 0 4px 0',
      margin: 0
    },
    left: {
      borderRadius: '0 0 0 4px',
      margin: 0
    }
  },
  votesContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
};

//Export
export default VotingPanel;
