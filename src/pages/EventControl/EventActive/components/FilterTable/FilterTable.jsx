/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Table, Pagination, Icon, Balloon } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';
import FilterForm from './Filter';
import BasicHandlePart from '../../../../../components/BasicHandlePart';
import AllFunction from '../../../../../components/AllFunction';

const permissionDataChange = AllFunction.permissionDataChange;
const findPermission = AllFunction.findPermission;

const permission = permissionDataChange(Cookies.get('permission'));

// const TableDataBinders = AllFunction.TableDataBinder('/welend/event/active/list', false);
// const updateBindingDatas = AllFunction.updateBindingData('/welend/event/active/list');

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
      value = '默认';
    } else if (value === 1) {
      value = '停用';
    }
    return (
      <IceLabel status="danger">
        {value}
      </IceLabel>
    );
  };

  renderIsTop = (value) => {
    if (value === 0) {
      value = '未推荐';
    } else if (value === 1) {
      value = '已推荐';
    }
    return (
      <IceLabel status="info">
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
    const buttonData = [
      { text: '添加商品', link: '/shop/product/add', type: 'primary' },
    ];
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
        {
          findPermission(permission, 'shop:product:add') ?
            (<BasicHandlePart dataSource={buttonData} />) : null
        }
        <IceContainer>
          <Table
            dataSource={tableData.list}
            isLoading={tableData.__loading}
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >
            <Table.Column title="收益百分比" dataIndex="profitPercent" width={100} />
            <Table.Column title="现金返回" dataIndex="cashback" width={80} />
            <Table.Column title="年化收益百分比" dataIndex="yearPercent" width={100} />
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
