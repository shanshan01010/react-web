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
      { text: '代理管理', link: '' },
      { text: '代理用户管理', link: '#/agency/user' },
      { text: '代理系统用户', link: '#/agency/user/add' },
    ];
    return (
      <div className="sys-user-control-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <AddMenus />
      </div>
    );
  }
}
