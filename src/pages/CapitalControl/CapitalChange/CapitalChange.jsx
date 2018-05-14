import React, { Component } from 'react';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';
import FilterTable from './components/FilterTable';

export default class CapitalChange extends Component {
  static displayName = 'CapitalChange';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '资金管理', link: '' },
      { text: '资金变更管理', link: '#/capital/change' },
    ];
    return (
      <div className="capital-change-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <FilterTable />
      </div>
    );
  }
}
