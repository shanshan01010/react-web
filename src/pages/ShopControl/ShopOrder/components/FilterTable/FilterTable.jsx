/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Table, Pagination, Icon } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';
import FilterForm from './Filter';

import AllFunction from '../../../../../components/AllFunction';

const TableDataBinders = AllFunction.TableDataBinder('/welend/shop/order/list', false);
// const updateBindingDatas = AllFunction.updateBindingData('/welend/shop/order/list');

@DataBinder({
  tableData: TableDataBinders,
  // updateBindingData: updateBindingDatas,
})
export default class EnhanceTable extends Component {
  static displayName = 'EnhanceTable';

  static defaultProps = {};

  constructor(props) {
    super(props);

    // 请求参数缓存
    this.queryCache = {};
    this.state = {
      filterFormValue: {},
    };
  }

  componentDidMount() {
    this.queryCache.page = 1;
    this.fetchData();
  }

  fetchData = () => {
    this.props.updateBindingData('tableData', {
      data: this.queryCache,
    });
  };

  // 订单详情点击事件
  onOrderShowClick = (record, url) => {
    console.log(record, url);
    hashHistory.push({
      pathname: url,
      state: {
        id: record.id,
      },
    });
  }

  // 列表操作按钮
  renderOperations = (value, index, record) => {
    return (
      <div
        className="filter-table-operation"
        style={styles.filterTableOperation}
      >
        <span
          title="订单详情"
          style={styles.operBtn}
          onClick={this.onOrderShowClick.bind(this, record, '/shop/order/show')}
        >
          <Icon size="xs" type="ellipsis" />
        </span>
      </div>
    );
  };

  // 处理状态信息
  renderStatus = (value) => {
    if (value === 0) {
      value = '默认';
    } else if (value === 1) {
      value = '已付款';
    } else if (value === 2) {
      value = '已发货';
    } else if (value === 3) {
      value = '已完成';
    } else if (value === 4) {
      value = '已退货';
    } else {
      value = '已作废';
    }
    return (
      <IceLabel status="danger">
        {value}
      </IceLabel>
    );
  };

  changePage = (currentPage) => {
    this.queryCache.page = currentPage;
    this.fetchData();
  };

  filterFormChange = (value) => {
    this.setState({
      filterFormValue: value,
    });
  };

  filterTable = () => {
    // 合并参数，请求数据
    this.queryCache = {
      ...this.queryCache,
      ...this.state.filterFormValue,
    };
    this.fetchData();
  };

  resetFilter = () => {
    this.setState({
      filterFormValue: {},
    });
  };

  render() {
    const tableData = this.props.bindingData.tableData;
    const { filterFormValue } = this.state;
    return (
      <div className="filter-table">
        <IceContainer>
          <FilterForm
            value={filterFormValue}
            onChange={this.filterFormChange}
            onSubmit={this.filterTable}
            onReset={this.resetFilter}
          />
        </IceContainer>
        <IceContainer>
          <Table
            dataSource={tableData.list}
            isLoading={tableData.__loading}
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >
            <Table.Column title="订单编号" dataIndex="seriaNo" width={80} />
            <Table.Column title="订单消费金额" dataIndex="orderMoney" width={80} />
            <Table.Column title="订单消费积分" dataIndex="orderIntegral" width={80} />
            <Table.Column title="收件人" dataIndex="addrName" width={80} />
            <Table.Column title="联系方式" dataIndex="addrMobile" width={80} />
            <Table.Column title="收件地址" dataIndex="addrStr" width={100} />
            <Table.Column title="快递单号" dataIndex="expressNo" width={100} />
            <Table.Column title="创建时间" dataIndex="createTime" width={100} />
            <Table.Column
              title="订单状态"
              dataIndex="status"
              width={85}
              cell={this.renderStatus}
            />
            <Table.Column
              title="操作"
              dataIndex="operation"
              width={150}
              cell={this.renderOperations}
            />
          </Table>
          <div style={styles.paginationWrapper}>
            <Pagination
              current={tableData.currentPage}
              pageSize={tableData.pageSize}
              total={tableData.total}
              onChange={this.changePage}
            />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  filterTableOperation: {
    lineHeight: '28px',
  },
  operationItem: {
    marginRight: '12px',
    textDecoration: 'none',
    color: '#5485F7',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginLeft: '10px',
    lineHeight: '20px',
  },
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px',
  },
  operBtn: {
    display: 'inline-block',
    width: '24px',
    height: '24px',
    borderRadius: '999px',
    color: '#929292',
    background: '#f2f2f2',
    textAlign: 'center',
    cursor: 'pointer',
    lineHeight: '24px',
    marginRight: '6px',
  },
};
