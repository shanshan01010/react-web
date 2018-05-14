import React, { Component } from 'react';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';
import FilterTable from './components/FilterTable';

export default class UserCoupon extends Component {
  static displayName = 'UserCoupon';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '用户管理', link: '' },
      { text: '用户统计', link: '#/user/count' },
    ];
    return (
      <div className="UserCoupon-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <FilterTable />
      </div>
    );
  }
}
