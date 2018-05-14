/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Table, Pagination, Icon, Balloon } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';
import FilterForm from './Filter';
import AssetInfoDisplay from '../AssetInfoDisplay';

import AllFunction from '../../../../../components/AllFunction';

const TableDataBinders = AllFunction.TableDataBinder('/welend/funds/moneyOut/list', false);
const updateBindingDatas = AllFunction.updateBindingData('/welend/funds/moneyOut/list');

@DataBinder({
  tableData: TableDataBinders,
  updateBindingData: updateBindingDatas,
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

  editItem = (record, e) => {
    e.preventDefault();
    // TODO: record 为该行所对应的数据，可自定义操作行为
  };

  renderOperations = (value, index, record) => {
    return (
      <div
        className="filter-table-operation"
        style={styles.filterTableOperation}
      >
        <span
          title="备注"
          style={styles.operBtn}
          id="top"
          className="btrigger"
        >
          <Icon size="xs" type="all" />
        </span>
      </div>
    );
  };

  renderStatus = (value) => {
    if (value === 0) {
      value = '我方处理中';
    } else if (value === 1) {
      value = '对方处理中';
    } else if (value === 2) {
      value = '成功';
    } else {
      value = '失败';
    }
    return (
      <IceLabel inverse={true} status="danger">
        {value}
      </IceLabel>
    );
  };

  renderReviewStatus = (value) => {
    if (value === 0) {
      value = '审核中';
    } else if (value === 1) {
      value = '审核通过';
    } else {
      value = '审核失败';
    }
    return (
      <IceLabel inverse={true} status="danger">
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
    console.log(tableData);
    return (
      <div className="filter-table">
        <IceContainer>
          <AssetInfoDisplay />
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
            <Table.Column title="提现人" dataIndex="chnName" width={100} />
            <Table.Column title="提现金额" dataIndex="money" width={80} />
            <Table.Column title="渠道" dataIndex="channel" width={100} />
            <Table.Column title="提现手续费" dataIndex="fee" width={85} />
            <Table.Column
              title="提现时间"
              dataIndex="createTime"
              width={90}
            />
            <Table.Column
              title="审核时间"
              dataIndex="reviewTime"
              width={90}
            />
            <Table.Column
              title="完成时间"
              dataIndex="completeTime"
              width={90}
            />
            <Table.Column
              title="状态"
              dataIndex="status"
              width={85}
              cell={this.renderStatus}
            />
            <Table.Column
              title="审核状态"
              dataIndex="reviewStatus"
              width={85}
              cell={this.renderReviewStatus}
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
