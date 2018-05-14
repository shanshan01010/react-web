import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import Img from '@icedesign/img';
import logo from '../../public/images/logo.png';


export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo" style={{}}>
        <Link to="/" className="logo-text">
          <Img src={logo} />
        </Link>
      </div>
    );
  }
}
