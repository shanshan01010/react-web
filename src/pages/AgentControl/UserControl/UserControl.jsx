import React, { Component } from 'react';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';
import FilterTable from './components/FilterTable';

export default class SysUserControl extends Component {
  static displayName = 'SysUserControl';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '代理管理', link: '' },
      { text: '代理用户管理', link: '#/agency/user' },
    ];
    return (
      <div className="sys-user-control-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <FilterTable />
      </div>
    );
  }
}
