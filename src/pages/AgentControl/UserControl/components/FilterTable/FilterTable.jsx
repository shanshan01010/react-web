/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { Table, Pagination, Icon, Dialog, Feedback } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';
import FilterForm from './Filter';
import BasicHandlePart from '../../../../../components/BasicHandlePart';

import ShowMore from './ShowMore';
import EditorInfoDialog from './EditorInfoDialog';
import AllFunction from '../../../../../components/AllFunction';

const Toast = Feedback.toast;
const tableDatas = AllFunction.TableDataBinder('/welend/agency/user/list', false);
const updateBindingDatas = AllFunction.updateBindingData('/welend/agency/user/list');
const permission = AllFunction.permissionDataChange(Cookies.get('permission'));
const findPermission = AllFunction.findPermission;
const DataCommonAxioss = AllFunction.DataCommonAxios;

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
      visible: false,
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

  onEditItemClick = (record, e) => {
    e.preventDefault();
    // console.log(record);
    EditorInfoDialog.show({
      value: record,
      onOk: (that) => {
        const Succeed = () => {
          Toast.success('更新成功！');
          that.setState({
            loadVisible: false,
          });
          console.log(this);
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
        DataCommonAxioss('/welend/agency/user/update', that.state.value, Succeed, Fail);
      },
      onClose: () => {
        EditorInfoDialog.hide();
      },
      onCancel: () => {
        EditorInfoDialog.hide();
      },
    });
  };

  onShowMoreClick = (record, e) => {
    e.preventDefault();
    ShowMore.show({
      value: record,
    });
  }

  renderOperations = (value, index, record) => {
    return (
      <div className="operation-table-operation" style={styles.operationTable}>
        {
          findPermission(permission, 'agency:user:update') ?
          (
            <span
              onClick={this.onEditItemClick.bind(this, record)}
              title="编辑"
              style={styles.operBtn}
            >
              <Icon size="xs" type="edit" />
            </span>
          ) : null
        }
        {
          findPermission(permission, 'agency:user:delete') ?
          (
            <span title="删除" style={styles.operBtn}>
              <Icon size="xs" type="close" />
            </span>
          ) : null
        }
        {/* <span title="查看详情" style={styles.operBtn} onClick={this.onShowMoreClick.bind(this, record)}>
          <Icon size="xs" type="ellipsis" />
        </span> */}
      </div>
    );
  };

  renderStatus = (value) => {
    const styles = {
      background: '#F2F3F7',
    };
    if (value === 0) {
      value = '默认';
      styles.background = '#1ec36e3b';
    } else {
      value = '禁用';
    }
    return (
      <IceLabel style={styles} inverse={false} status="default">
        {value}
      </IceLabel>
    );
  };

  renderRole = (value) => {
    // const result = value.map((item) => {
    return (
      <IceLabel style={styles.roleLabel} status="danger">
        {value}
      </IceLabel>
    );
    // });
    // return result;
  }


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
    console.log(tableData);
    const { filterFormValue } = this.state;
    const buttonData = [
      { text: '添加用户', link: '/agency/user/add', type: 'primary' },
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
           findPermission(permission, 'agency:menu:add') ?
           (
             <BasicHandlePart dataSource={buttonData} />
           ) : null
        }
        <IceContainer>
          <Table
            dataSource={tableData.list}
            isLoading={tableData.__loading}
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >
            <Table.Column
              title="昵称"
              dataIndex="account"
              width={85}
            />
            <Table.Column
              title="真是姓名"
              dataIndex="realName"
              width={85}
            />
            <Table.Column
              title="手机号"
              dataIndex="mobile"
              width={100}
            />
            <Table.Column
              title="代理邀请码"
              dataIndex="agentCode"
              width={150}
            />
            <Table.Column
              title="状态"
              dataIndex="status"
              width={80}
              cell={this.renderStatus}
            />
            <Table.Column
              title="角色"
              dataIndex="roleName"
              width={150}
              cell={this.renderRole}
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
  roleLabel: {
    margin: '3px',
  },
};
