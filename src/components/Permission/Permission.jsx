import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@icedesign/base';

export default class BasicHandlePart extends Component {
  static displayName = 'BasicHandlePart';


  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  static defaultProps = {
    dataSource: [1, 2, 3, 4],
    currentData: [],
    type: null,
    data: [],
  };

  static propTypes = {
    dataSource: PropTypes.array,
    currentData: PropTypes.array,
    type: PropTypes.String,
    data: PropTypes.array,
  };

  onButtonClick = (value) => {
    console.log(value);
  }

  // 判断该组件是否有权限
  findResult = (a, b) => {
    console.log(a, b);
    const res = a.every((x) => {
      return b.includes(x);
    });
    return res;
  }

  render() {
    // const { dataSource, currentdata } = this.props;
    const { dataSource, currentData, type, data } = this.props;
    console.log(this.props.dataSource);
    console.log(window.allValue);
    // const dataSources = defaultProps;
    console.log(this);
    if (type === null) {
      return (
        <div>
          {data.text}
        </div>
      );
    }
    if (this.findResult(dataSource, currentData)) {
      return (
        <this.props.type>
          {data.text}
        </this.props.type>
      );
    }
    if (!this.findResult(dataSource, currentData)) {
      return null;
    }

  }
}
const styles = {
  type: {
    display: 'none',
  },
};
