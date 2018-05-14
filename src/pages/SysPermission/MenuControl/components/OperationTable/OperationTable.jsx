/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { Table, Pagination, Icon, Switch, Feedback, Loading, Dialog } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import FoundationSymbol from 'foundation-symbol';
import IceImg from '@icedesign/img';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';
import AllFunction from '../../../../../components/AllFunction';

import EditorInfoDialog from './EditorInfoDialog';
import AddChildrenMenu from './AddChildrenMenu';

const Toast = Feedback.toast;
const tableDatas = AllFunction.TableDataBinder('/welend/sys/menu/showOfUser', false);
const updateBindingDatas = AllFunction.updateBindingData('/welend/sys/menu/showOfUser');
const DataCommonAxioss = AllFunction.DataCommonAxios;
const permissionDataChange = AllFunction.permissionDataChange;
const findPermission = AllFunction.findPermission;

const permission = permissionDataChange(Cookies.get('permission'));

@DataBinder({
  tableData: tableDatas,
  updateBindingData: updateBindingDatas,
})

export default class OperationTable extends Component {
  static displayName = 'OperationTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      loadVisible: false,
    };
  }

  componentDidMount() {
    this.fetchData({
      page: 1,
    });
  }

  fetchData = ({ page }) => {
    this.props.updateBindingData('tableData', {
      data: {
        page,
      },
    });
  };

  // 修改菜单
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
        DataCommonAxioss('/welend/sys/menu/update', that.state.value, Succeed, Fail);
      },
      onClose: () => {
        EditorInfoDialog.hide();
      },
      onCancel: () => {
        EditorInfoDialog.hide();
      },
    });
  };

  // 添加菜单
  onAddChildMenuClick = (record, e) => {
    e.preventDefault();
    AddChildrenMenu.show({
      value: record,
      onOk: (that) => {
        const Succeed = () => {
          that.setState({
            loadVisible: false,
          });
          Toast.success('添加成功！');
          AddChildrenMenu.hide();
          this.props.updateBindingData('tableData', {
            data: {
              page: 1,
            },
          });
        };
        const Fail = () => {
          that.setState({
            loadVisible: false,
          });
          Toast.error('添加失败！');
          AddChildrenMenu.hide();
          this.props.updateBindingData('tableData', {
            data: {
              page: 1,
            },
          });
        };
        DataCommonAxioss('/welend/sys/menu/add', that.state.value, Succeed, Fail);
      },
      onClose: () => {
        AddChildrenMenu.hide();
      },
      onCancel: () => {
        AddChildrenMenu.hide();
      },
    });
  }

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
        this.setState({
          loadVisible: true,
        });
        record.delFlag = false;
        const Succeed = () => {
          this.setState({
            loadVisible: false,
          });
          Toast.success('删除成功！');
          AddChildrenMenu.hide();
          this.props.updateBindingData('tableData', {
            data: {
              page: 1,
            },
          });
        };
        const Fail = () => {
          this.setState({
            loadVisible: false,
          });
          Toast.error('删除失败！');
          AddChildrenMenu.hide();
          this.props.updateBindingData('tableData', {
            data: {
              page: 1,
            },
          });
        };
        DataCommonAxioss('/welend/sys/menu/update', record, Succeed, Fail);
      }
    });
  }

  renderOperations = (value, index, record) => {
    // console.log(permission);
    let titles = '';
    if (record.href === '' || record.href == null || record.href.length <= 0) {
      titles = '添加子菜单';
    } else {
      titles = '添加按钮权限';
    }
    return (
      <div className="operation-table-operation" style={styles.operationTable}>
        {findPermission(permission, 'sys:menu:add') ?
            (
              <span
                title={titles}
                style={styles.operBtn}
                onClick={this.onAddChildMenuClick.bind(this, record)}
              >
                <Icon size="xs" type="add" />
              </span>
            ) : null
        }
        {
          findPermission(permission, 'sys:menu:update') ?
          (
            <span
              onClick={this.onEditMenuClick.bind(this, record)}
              title="编辑"
              style={styles.operBtn}
            >
              <Icon size="xs" type="edit" />
            </span>
          ) : null
        }
        {
          findPermission(permission, 'sys:menu:delete') ?
          (
            <span title="删除" style={styles.operBtn} onClick={this.onDeleteMenuClick.bind(this, record)}>
              <Icon size="xs" type="close" />
            </span>
          ) : null
        }
      </div>
    );
  };

  renderShow = (value) => {
    let statusStyle = 'default';
    if (value) {
      value = '显示';
      statusStyle = 'danger';
    } else {
      value = '隐藏';
    }
    return (
      <IceLabel style={styles.roleLabel} status={statusStyle}>
        {value}
      </IceLabel>
    );
  }

  renderIcon = (value, index, record) => {
    return (
      <div>
        <FoundationSymbol type={record.icon} />
        <br />
        {record.icon}
      </div>
    );
  }

  changePage = (currentPage) => {
    this.fetchData({
      page: currentPage,
    });
  };


  render() {
    const tableData = this.props.bindingData.tableData;
    const findData = findData;
    return (
      <div className="operation-table">
        <IceContainer style={styles.cardContainer}>
          <Loading visible={this.state.loadVisible} style={styles.loadStyle} shape="flower">
            <Table
              dataSource={tableData.list}
              isLoading={tableData.__loading}
              className="basic-table"
              style={styles.basicTable}
              hasBorder={false}
              isTree
              indentSize={20}
            >
              <Table.Column
                title="菜单名称"
                dataIndex="name"
                width={180}
              />
              <Table.Column
                title="菜单描述"
                dataIndex="description"
                cell={this.renderDescription}
                width={100}
              />
              <Table.Column
                title="图标"
                dataIndex="icon"
                cell={this.renderIcon}
                width={50}
              />
              <Table.Column
                title="顺序"
                dataIndex="sort"
                width={50}
              />
              <Table.Column
                title="链接地址"
                dataIndex="href"
                width={80}
              />
              <Table.Column
                title="显示"
                dataIndex="show"
                width={50}
                cell={this.renderShow}
              />
              {
                !findPermission(permission, 'sys:menu:add') &&
                !findPermission(permission, 'sys:menu:update') &&
                !findPermission(permission, 'sys:menu:delete') ? null : (
                  <Table.Column
                    title="操作"
                    dataIndex="operation"
                    width={100}
                    cell={this.renderOperations}
                  />
                )
              }
            </Table>
            <div style={styles.paginationContainer}>
              <Pagination
                current={tableData.currentPage}
                pageSize={tableData.pageSize}
                total={tableData.total}
                onChange={this.changePage}
              />
            </div>
          </Loading>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  cardContainer: {
    padding: '10px 10px 20px 10px',
  },
  titleCol: {
    display: 'flex',
    flexDirection: 'row',
  },
  titleText: {
    lineHeight: '20px',
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
  paginationContainer: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
