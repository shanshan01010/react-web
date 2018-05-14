import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Loading } from '@icedesign/base';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';
import BasicHandlePart from '../../../components/BasicHandlePart';
import OperationTable from './components/OperationTable';

import AllFunction from '../../../components/AllFunction';

const permission = AllFunction.permissionDataChange(Cookies.get('permission'));
const findPermission = AllFunction.findPermission;
export default class RoleControl extends Component {
  static displayName = 'RoleControl';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '代理管理', link: '' },
      { text: '代理角色管理', link: '#/agency/role' },
    ];

    const buttonData = [
      { text: '添加代理角色', link: '/agency/role/add', type: 'primary' },
    ];

    if (!permission) {
      return (
        <Loading shape="flower" />
      );
    }

    return (
      <div className="role-control-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        {
          findPermission(permission, 'agency:role:add') ? (
            <BasicHandlePart dataSource={buttonData} />
          ) : null
        }
        <OperationTable />
      </div>
    );
  }
}
