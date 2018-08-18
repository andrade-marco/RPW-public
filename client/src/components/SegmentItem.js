//Segment Item
//Displays the segments that have been submitted by user
import React from 'react';
import {Link} from 'react-router-dom';

//Component
const SegmentItem = ({segment}) => {
  const {story, votes, status, content} = segment;
  const {itemContainer, itemTitle, headerContainer} = styles;
  const positive = votes.filter(val => val.choice === 'positive').length;
  const negative = votes.filter(val => val.choice === 'negative').length;
  const statusClass = (status === 'accepted') ? 'badge badge-pill badge-success' :
                      (status === 'rejected') ? 'badge badge-pill badge-danger' :
                                                'badge badge-pill badge-warning';

  return (
    <div className='width-restriction' style={itemContainer}>
      <header style={headerContainer}>
        <div>
          <h5 style={{margin: 0}}>
            <Link to={`/stories/${story._id}`} style={itemTitle}>@ {story.title}</Link>
          </h5>
          <span className={statusClass}>{status}</span>
        </div>
        <div>
          <span style={{fontSize: '0.9em', marginRight: '2px'}} className="badge badge-primary">
            <i className='fas fa-thumbs-up'/> {positive}
          </span>
          <span style={{fontSize: '0.9em'}} className="badge badge-secondary">
            <i className='fas fa-thumbs-down'/> {negative}
          </span>
        </div>
      </header>
      <div className='segment-content'>
        {content}
      </div>
    </div>
  );
}

//Styles
const styles = {
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottom: '1px solid #CDCDCD'
  },
  itemTitle: {
    color: '#0C120C',
    textDecoration: 'none',
  },
  mainContainer: {
    flex: 4,
    padding: '5px',
    height: '100%'
  },
  headerContainer: {
    width: '100%',
    padding: '14px 0px 8px 0px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}

//Export
export default SegmentItem;
