//About Page
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavBar from '../../components/NavBar';

class AboutPage extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <NavBar navType='out-app'/>

      </div>
    );
  }
}

export default AboutPage;
