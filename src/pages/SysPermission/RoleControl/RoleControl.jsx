import React, { Component } from 'react';
import Cookies from 'js-cookie';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';
import BasicHandlePart from '../../../components/BasicHandlePart';
import OperationTable from './components/OperationTable';

import AllFunction from '../../../components/AllFunction';

const permissionDataChange = AllFunction.permissionDataChange(Cookies.get('permission'));
const findPermission = AllFunction.findPermission;
export default class RoleControl extends Component {
  static displayName = 'RoleControl';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '系统管理', link: '' },
      { text: '系统角色管理', link: '#/sysPermission/roleControl' },
    ];

    const buttonData = [
      { text: '添加角色', link: '/sysPermission/roleControl/add', type: 'primary' },
    ];

    return (
      <div className="role-control-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        {
          findPermission(permissionDataChange, 'sys:role:add') ? (
            <BasicHandlePart dataSource={buttonData} />
          ) : null
        }
        <OperationTable />
      </div>
    );
  }
}
