//About Page
//Page that describes the app in detail
//Note: Page not in use
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavBar from '../../components/NavBar';

//Component
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

//Export
export default AboutPage;
