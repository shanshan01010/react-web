import React, { Component } from 'react';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';
import FilterTable from './componetnts/BoardList';


export default class EnhanceTable extends Component {
  static displayName = 'EnhanceTable';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '活动管理', link: '' },
      { text: '动作管理', link: '#/event/Active' },
    ];
    return (
      <div className="capital-in-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <FilterTable />
      </div>
    );
  }
}

