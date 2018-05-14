import React, { Component } from 'react';
import Cookies from 'js-cookie';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';
import BasicHandlePart from '../../../components/BasicHandlePart';
import OperationTable from './components/OperationTable';

import AllFuncion from '../../../components/AllFunction';

const permissionDataChange = AllFuncion.permissionDataChange;
const findPermission = AllFuncion.findPermission;

const permission = permissionDataChange(Cookies.get('permission'));

export default class MenuControl extends Component {
  static displayName = 'MenuControl';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '系统管理', link: '' },
      { text: '系统菜单管理', link: '#/sysPermission/menu' },
    ];

    const buttonData = [
      { text: '添加菜单', link: '/sysPermission/menu/add', type: 'primary' },
    ];
    return (
      <div className="menu-control-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        {
          findPermission(permission, 'sys:menu:add') ?
            (<BasicHandlePart dataSource={buttonData} />) : null
        }
        <OperationTable />
      </div>
    );
  }
}
