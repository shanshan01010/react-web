import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';

export default class BasicHandlePart extends Component {
  static displayName = 'BasicHandlePart';

  static defaultProps = {
    dataSource: [],
  };

  static propTypes = {
    dataSource: PropTypes.array,
  };

  onButtonClick = (value) => {
    console.log(value);
  }

  render() {
    const { dataSource } = this.props;
    return (
      <IceContainer>
        {dataSource.map((item, index) => {
          return (
            <Link key={index} to={item.link}>
              <Button key={index} type={item.type}>
                {item.text}
              </Button>
            </Link>
          );
        })}
      </IceContainer>
    );
  }
}
