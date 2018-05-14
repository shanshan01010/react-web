/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Table, Pagination, Icon, Feedback, Dialog } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';
import FilterForm from './Filter';
import BasicHandlePart from '../../../../../components/BasicHandlePart';
import AllFunction from '../../../../../components/AllFunction';
import EditorInfoDialog from './EditorInfoDialog';

const Toast = Feedback.toast;
const permissionDataChange = AllFunction.permissionDataChange;
const findPermission = AllFunction.findPermission;
const DataCommonAxioss = AllFunction.DataCommonAxios;
const permission = permissionDataChange(Cookies.get('permission'));

const TableDataBinders = AllFunction.TableDataBinder('/welend/product/bid/list', false);
// const updateBindingDatas = AllFunction.updateBindingData('/welend/shop/product/list');
// console.log(permission);

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

  // 修改类目
  onEditMenuClick = (record, e) => {
    e.preventDefault();
    EditorInfoDialog.show({
      value: record,
      onOk: (that) => {
        const Succeed = () => {
          Toast.success('更新成功！');
          that.setState({
            loadVisible: false,
          });
          // console.log(this);
          EditorInfoDialog.hide();
          this.props.updateBindingData('tableData', {
            data: {
              page: 1,
            },
          });
        };
        const Fail = () => {
          Toast.error('更新失败！');
          that.setState({
            loadVisible: false,
          });
          EditorInfoDialog.hide();
          this.props.updateBindingData('tableData', {
            data: {
              page: 1,
            },
          });
        };
        DataCommonAxioss('/welend/shop/menu/update', that.state.value, Succeed, Fail);
      },
      onClose: () => {
        EditorInfoDialog.hide();
      },
      onCancel: () => {
        EditorInfoDialog.hide();
      },
    });
  };


  onDeleteMenuClick = (record, e) => {
    let contents = '确定删除吗？';
    if (record.children && record.children.length > 0) {
      contents = '是否删除本菜单及其下的子菜单？';
    }
    e.preventDefault();
    Dialog.confirm({
      content: contents,
      closable: false,
      title: '提示',
      onOk: () => {
        record.delFlag = false;
        const Succeed = () => {
          Toast.success('删除成功！');
          this.props.updateBindingData('tableData', {
            data: {
              page: 1,
            },
          });
        };
        const Fail = () => {
          Toast.error('删除失败！');
          this.props.updateBindingData('tableData', {
            data: {
              page: 1,
            },
          });
        };
        DataCommonAxioss('/welend/shop/menu/update', record, Succeed, Fail);
      },
    });
  }

  renderOperations = (value, index, record) => {
    return (
      <div
        className="filter-table-operation"
        style={styles.filterTableOperation}
      >
        {
          findPermission(permission, 'shop:menu:update') ? (
            <span
              title="编辑"
              style={styles.operBtn}
              onClick={this.onEditMenuClick.bind(this, record)}
            >
              <Icon size="xs" type="edit" />
            </span>
          ) : null
        }
        {
          findPermission(permission, 'shop:menu:delete') ? (
            <span
              title="删除"
              style={styles.operBtn}
              onClick={this.onDeleteMenuClick.bind(this, record)}
            >
              <Icon size="xs" type="close" />
            </span>
          ) : null
        }
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
    const buttonData = [
      { text: '添加标', link: '/product/bid/add', type: 'primary' },
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
          findPermission(permission, 'product:bid:add') ?
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
            <Table.Column title="产品名称" dataIndex="bidName" width={100} />
            <Table.Column title="起投金额" dataIndex="minMoney" width={80} />
            <Table.Column title="投资期限" dataIndex="day" width={100} />
            <Table.Column title="投资总额" dataIndex="totalMoney" width={100} />
            <Table.Column title="已投资总额" dataIndex="totalDeff" width={80} />
            <Table.Column title="加利息率" dataIndex="addRate" width={100} />
            <Table.Column title="加价金额" dataIndex="addmoney" width={80} />
            <Table.Column title="标类型" dataIndex="bidType" width={100} />
            <Table.Column title="还款方式" dataIndex="repayType" width={100} />
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
