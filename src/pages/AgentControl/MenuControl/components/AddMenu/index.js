import React, { Component } from 'react';
import CustomBreadcrumb from '../../../../../components/CustomBreadcrumb';
import AddMenus from './AddMenus';

export default class AddMenu extends Component {
  static displayName = 'AddMenus';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '系统管理', link: '' },
      { text: '系统菜单管理', link: '#/sysPermission/menu' },
      { text: '添加菜单', link: '#/sysPermission/menu/add' },
    ];
    return (
      <div className="sys-user-control-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <AddMenus />
      </div>
    );
  }
}
