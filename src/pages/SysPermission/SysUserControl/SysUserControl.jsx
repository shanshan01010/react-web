import React, { Component } from 'react';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';
// import BasicHandlePart from '../../../components/BasicHandlePart';
import FilterTable from './components/FilterTable';

export default class SysUserControl extends Component {
  static displayName = 'SysUserControl';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '系统管理', link: '' },
      { text: '系统用户管理', link: '#/sysPermission/sysUserControl' },
    ];
    return (
      <div className="sys-user-control-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <FilterTable />
      </div>
    );
  }
}
