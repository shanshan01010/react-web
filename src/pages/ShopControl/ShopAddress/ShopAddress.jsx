import React, { Component } from 'react';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';

import FilterTable from './components/FilterTable';

export default class CapitalIn extends Component {
  static displayName = 'CapitalIn';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '商城管理', link: '' },
      { text: '收货地址管理', link: '#/shop/adress' },
    ];
    return (
      <div className="capital-in-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <FilterTable />
      </div>
    );
  }
}
