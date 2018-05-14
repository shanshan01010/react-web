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
      { text: '代理管理', link: '' },
      { text: '代理菜单管理', link: '#/agency/menu' },
    ];

    const buttonData = [
      { text: '添加代理菜单', link: '/agency/menu/add', type: 'primary' },
    ];
    return (
      <div className="menu-control-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        {
          findPermission(permission, 'agency:menu:add') ?
            (<BasicHandlePart dataSource={buttonData} />) : null
        }
        <OperationTable />
      </div>
    );
  }
}
