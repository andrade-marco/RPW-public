//Profile Summary
import React from 'react';

//Component
const Divider = ({vertical}) => {
  const {
    containerStyle,
    textContainer,
    verticalDirection,
    horizontalDirection,
    borderVertical,
    borderHorizontal
  } = styles;

  const direction = (vertical) ? verticalDirection : horizontalDirection;
  const borderStyle = (vertical) ? borderVertical : borderHorizontal;

  return (
    <div style={{...containerStyle, ...direction}}>
      <div style={borderStyle}></div>
      <div style={textContainer}>or</div>
      <div style={borderStyle}></div>
    </div>
  );
}

//Styles
const styles = {
  containerStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  verticalDirection: {
    flexDirection: 'column',
    height: '100%'
  },
  horizontalDirection: {
    flexDirection: 'row',
    width: '100%',
    margin: '8px 0px',
  },
  textContainer: {
    flex: 1,
    fontSize: '0.7em',
    color: '#c20114',
    textAlign: 'center'
  },
  borderVertical: {
    flex: 1,
    borderRight: '1px solid #cdcdcd'
  },
  borderHorizontal: {
    flex: 1,
    borderBottom: '1px solid #cdcdcd'
  }
}

//Export
export default Divider;
