import React, { Component } from 'react';
import CustomBreadcrumb from '../../../../../components/CustomBreadcrumb';
import AddMenus from './AddSysUsers';

export default class AddMenu extends Component {
  static displayName = 'AddMenus';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '系统管理', link: '' },
      { text: '系统用户管理', link: '#/sysPermission/sysUserControl' },
      { text: '添加系统用户', link: '#/sysPermission/sysUserControl/add' },
    ];
    return (
      <div className="sys-user-control-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <AddMenus />
      </div>
    );
  }
}
