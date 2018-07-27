//Story List
import React from 'react';
import StoryItem from './StoryItem';
import SegmentItem from './SegmentItem';
import EmptyPanel from './EmptyPanel';

//Component
const ItemList = ({data, isSegments, emptyMessage}) => {
  if (data.length > 0) {
    let itemsArray = [];
    if (isSegments) {
      itemsArray = data.map(val => <SegmentItem key={val._id} segment={val}/>);
    } else {
      itemsArray = data.map(val => <StoryItem key={val._id} story={val}/>);
    }

    return (
      <div
        style={styles.listContainer}
        className='width-restriction'>
        {itemsArray}
      </div>
    );

  } else {
    return <EmptyPanel type={emptyMessage}/>;
  }
}

const styles = {
  listContainer: {
    borderTop: '1px solid #CDCDCD',
  }
}

export default ItemList;
