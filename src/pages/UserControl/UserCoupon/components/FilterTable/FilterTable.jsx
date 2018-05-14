/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { hashHistory } from 'react-router';
import { Table, Pagination, Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';
import FilterForm from './Filter';
import EditDialog from './components/EditDialog';

import AllFunction from '../../../../../components/AllFunction';

const tableDatas = AllFunction.TableDataBinder('/welend/account/userCashCoupon/list', false);
const updateBindingDatas = AllFunction.updateBindingData('/welend/account/userCashCoupon/list');


@DataBinder({
  tableData: tableDatas,
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

  onDetailsClick = (value) => {
    hashHistory.push({
      pathname: '/user/list/details',
      state: {
        id: value.id,
      },
    });
  }

  renderOperations = (value, index, record) => {
    return (
      <div
        className="filter-table-operation"
        style={styles.filterTableOperation}
      >
        <EditDialog index={index} record={record} getFormValues={this.getFormValues} />
      </div>
    );
  };

  renderClassId = (value, index, record) => {
    if (value === 0) {
      value = '未使用';
    } else if (value === 1) {
      value = '已使用';
    } else {
      value = '已过期';
    }
    return (
      <div>
        <IceLabel status="danger">
          {value}
        </IceLabel>
      </div>
    );
  }

  renderStatus = (value) => {
    if (value === true) {
      value = '已发布';
    } else {
      value = '未发布';
    }
    return (
      <IceLabel inverse={false} status="default">
        {value}
      </IceLabel>
    );
  };

  changePage = (currentPage) => {
    this.queryCache.page = currentPage;
    this.fetchData();
  };

  filterFormChange = (value) => {
    // console.log(value);
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

  onDataOutClick = () => {
    alert('数据导出');
  }

  render() {
    const tableData = this.props.bindingData.tableData;
    const { filterFormValue } = this.state;
    console.log(tableData);
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
          <Button style={styles.dataOut} shape="warning" onClick={this.onDataOutClick}>数据导出</Button>
          <Table
            dataSource={tableData.list}
            isLoading={tableData.__loading}
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >
            {/* <Table.Column title="优惠券ID" dataIndex="couponId" width={100} /> */}
            <Table.Column title="优惠券名字" dataIndex="couponName" width={105} />
            <Table.Column title="状态" dataIndex="status" cell={this.renderClassId} width={100} />
            <Table.Column title="赠送时间" dataIndex="gaveTime" width={105} />
            <Table.Column title="使用时间" dataIndex="useTime" width={105} />
            <Table.Column title="过期时间" dataIndex="deadTime" width={105} />
            <Table.Column title="存在天数" dataIndex="expireDay" width={100} />
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
  dataOut: {
    position: 'relative',
    right: 0,
    left: '100%',
    marginLeft: '-100px',
  },
};
