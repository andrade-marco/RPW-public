//List of stories or segments
//Component to display the list of stories or segments retrieved from API
//Segments represent pieces of stories submitted by user
import React from 'react';
import StoryItem from './StoryItem';
import SegmentItem from './SegmentItem';
import EmptyPanel from './EmptyPanel';

//Component
const ItemList = ({data, isSegments, emptyMessage}) => {
  //Check to see if there are stories/segments - if not display empty message
  if (data.length > 0) {
    let itemsArray = [];

    //Display segment item or story item depending on the type passed to component
    if (isSegments) {
      itemsArray = data.map(val => <SegmentItem key={val._id} segment={val}/>);
    } else {
      itemsArray = data.map(val => <StoryItem key={val._id} story={val}/>);
    }

    //Return list
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

//Styles
const styles = {
  listContainer: {
    borderTop: '1px solid #CDCDCD',
  }
}

//Export
export default ItemList;
