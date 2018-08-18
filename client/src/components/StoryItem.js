//Story Item
//Displays the stories that were retrieve from API
//Stories can be the overall stories available or the user's stories only
import React from 'react';
import {Link} from 'react-router-dom';
import {Rating} from 'semantic-ui-react';

//Component
const StoryItem = ({story}) => {
  const {_id, title, genre, status, subscribers} = story;
  const sbNum = subscribers.length;
  const statusClass = (status === 'open') ? 'badge badge-pill badge-success' :
                      (status === 'voting') ? 'badge badge-pill badge-warning' :
                      'badge badge-pill badge-primary';

  return (
    <div className='width-restriction' style={styles.itemContainer}>
      <div style={styles.mainContainer}>
        <h5><Link to={`/stories/${_id}`} style={styles.itemTitle}>{title}</Link></h5>
        <span className={statusClass} style={{marginRight: '5px'}}>{status}</span>
        <span className="badge badge-pill badge-secondary">{genre}</span>
      </div>
      <div style={styles.extrasContainer}>
        <div>
          Subscribers: {sbNum}
        </div>
        <div className='general-row end-justify'>
          <Rating className='rating-full' maxRating={5} disabled/>
        </div>
      </div>
    </div>
  );
}

//Styles
const styles = {
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: '80px',
    borderBottom: '1px solid #CDCDCD'
  },
  itemTitle: {
    color: '#0C120C',
    textDecoration: 'none'
  },
  mainContainer: {
    flex: 4,
    padding: '5px',
  },
  extrasContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '5px',
    fontSize: '0.75em',
    color: '#ADADAD',
    textAlign: 'right'
  }
}

//Export
export default StoryItem;
