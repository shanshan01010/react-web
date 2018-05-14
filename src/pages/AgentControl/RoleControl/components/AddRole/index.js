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
      { text: '代理管理', link: '' },
      { text: '代理角色管理', link: '#/agency/role' },
      { text: '添加代理角色', link: '#/agency/role/add' },
    ];
    return (
      <div className="sys-user-control-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <AddMenus />
      </div>
    );
  }
}
