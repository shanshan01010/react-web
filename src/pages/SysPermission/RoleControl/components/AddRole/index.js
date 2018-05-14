import React, { Component } from 'react';
import CustomBreadcrumb from '../../../../../components/CustomBreadcrumb';
import AddMenus from './AddRoles';

export default class AddMenu extends Component {
  static displayName = 'AddMenus';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '系统管理', link: '' },
      { text: '系统角色管理', link: '#/sysPermission/roleControl' },
      { text: '添加角色', link: '#/sysPermission/roleControl/add' },
    ];
    return (
      <div className="sys-user-control-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <AddMenus />
      </div>
    );
  }
}
