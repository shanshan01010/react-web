/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { Table, Pagination, Icon, Feedback, Dialog } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';

import EditorInfoDialog from './EditorInfoDialog';
import AllFunction from '../../../../../components/AllFunction';

const Toast = Feedback.toast;
const tableDatas = AllFunction.TableDataBinder('/welend/agency/role/list', false);
const updateBindingDatas = AllFunction.updateBindingData('/welend/agency/role/list');
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
    this.state = {};
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

  onEditRoleClick = (record, e) => {
    // console.log(record);
    e.preventDefault();
    EditorInfoDialog.show({
      value: record,
      onOk: (that, value) => {
        // console.log(value);
        const Succeed = () => {
          Toast.success('更新成功！');
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
        DataCommonAxioss('/welend/agency/role/update', value, Succeed, Fail);
      },
      onClose: () => {
        EditorInfoDialog.hide();
      },
      onCancel: () => {
        EditorInfoDialog.hide();
      },
    });
  };

  onDeleteRoleClick = (record, e) => {
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
        DataCommonAxioss('/welend/agency/role/delete', record, Succeed, Fail);
      },
    });
  }

  renderOperations = (value, index, record) => {
    return (
      <div className="operation-table-operation" style={styles.operationTable}>
        {
          findPermission(permission, 'agency:role:update') ? (
            <span
              onClick={this.onEditRoleClick.bind(this, record)}
              title="编辑"
              style={styles.operBtn}
            >
              <Icon size="xs" type="edit" />
            </span>
          ) : null
        }
        {
          findPermission(permission, 'agency:role:delete') ? (
            <span
              onClick={this.onDeleteRoleClick.bind(this, record)}
              title="删除"
              style={styles.operBtn}
            >
              <Icon size="xs" type="close" />
            </span>
          ) : null
        }
      </div>
    );
  };

  changePage = (currentPage) => {
    this.fetchData({
      page: currentPage,
    });
  };

  render() {
    const tableData = this.props.bindingData.tableData;
    console.log(this.props.bindingData.tableData);

    return (
      <div className="operation-table">
        <IceContainer style={styles.cardContainer}>
          <Table
            dataSource={tableData.list}
            isLoading={tableData.__loading}
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >
            <Table.Column title="" width={50} />
            <Table.Column title="角色名称" dataIndex="name" width={85} />
            <Table.Column title="备注" dataIndex="remark" width={105} />
            {
              !findPermission(permission, 'agency:role:update') &&
              !findPermission(permission, 'agency:role:delete') ? null : (
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
    marginLeft: '10px',
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
