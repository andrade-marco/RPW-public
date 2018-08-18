//Empty Panel
//Message to indicate empty/no data found
import React from 'react';

//Messages
//Different message options below
const info = {
  subscribe: {
    title: 'Not a subscriber yet?',
    message: 'You need to be a subscriber to be able to contribute to this story. Please click on the subscribe button above to start contributing to this story.',
    icon: 'fa fa-user-plus'
  },
  stories: {
    title: 'No stories found...',
    message: 'We were not able to find any stories for you. Please check back soon to find amazing stories, or create your own story by clicking on "Create new story".',
    icon: 'fas fa-book-open'
  },
  segments: {
    title: 'You have not contributed to stories yet...',
    message: 'Visit your "Home" page and subscribe to stories to be able to contribute and help build amazing stories.',
    icon: 'fas fa-file-alt'
  },
  myStories: {
    title: 'You have not created stories yet...',
    message: 'Click on "Create new story" to start a new story. Your first story is worth 10 reputation points.',
    icon: 'fas fa-book-open'
  }
}

//Component
const EmptyPanel = ({type}) => {
  const {cardStyle, iconStyle, titleStyle} = styles;
  return (
    <div className='card text-center width-restriction' style={cardStyle}>
      <i className={info[type].icon} style={iconStyle}/>
      <h5 style={titleStyle}>{info[type].title}</h5>
      <span>{info[type].message}</span>
    </div>
  );
}

//Styles
const styles = {
  cardStyle: {
    padding: '25px 35px',
    marginTop: '10px',
    backgroundColor: '#FBFBFB'
  },
  iconStyle: {
    fontSize: '2.3em',
    marginBottom: '8px',
    color: '#C20114'
  },
  titleStyle: {
    color: '#6D7275'
  }
};

//Export
export default EmptyPanel;
