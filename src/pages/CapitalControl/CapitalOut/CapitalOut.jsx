import React, { Component } from 'react';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';
import FilterTable from './components/FilterTable';

export default class CapitalOut extends Component {
  static displayName = 'CapitalOut';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '资金管理', link: '' },
      { text: '出金管理', link: '#/capital/out' },
    ];
    return (
      <div className="capital-out-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <FilterTable />
      </div>
    );
  }
}
