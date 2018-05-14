/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { Table, Pagination, Icon } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import IceImg from '@icedesign/img';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';

import EditorInfoDialog from './EditorInfoDialog';
import AllFunction from '../../../../../components/AllFunction';

const tableDatas = AllFunction.TableDataBinder('/welend/sys/role/list', false);
const updateBindingDatas = AllFunction.updateBindingData('/welend/sys/role/list');


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

  editItem = (record, e) => {
    e.preventDefault();
    EditorInfoDialog.show({
      value: record,
      onOk: (value) => {
        // 更新数据
        this.props.updateBindingData(
          'updateTableData',
          {
            params: {
              // 复杂数据结构需要 JSON stringify
              newItem: JSON.stringify(value),
            },
          },
          () => {
            // 更新完成之后，可以重新刷新列表接口
            this.props.updateBindingData('tableData', {
              data: {
                page: 1,
              },
            });
            EditorInfoDialog.hide();
          }
        );
      },
      onClose: () => {
        EditorInfoDialog.hide();
      },
      onCancel: () => {
        EditorInfoDialog.hide();
      },
    });
  };

  renderOperations = (value, index, record) => {
    return (
      <div className="operation-table-operation" style={styles.operationTable}>
        <span
          onClick={this.editItem.bind(this, record)}
          title="编辑"
          style={styles.operBtn}
        >
          <Icon size="xs" type="edit" />
        </span>
        <span title="删除" style={styles.operBtn}>
          <Icon size="xs" type="close" />
        </span>
      </div>
    );
  };

  renderStatus = (value) => {
    const styles = {
      background: '#F2F3F7',
      color: '#A0A2AD',
    };
    if (value) {
      value = '可用';
      styles.background = '#ea8383';
      styles.color = '#fff';
    } else {
      value = '禁用';
    }
    return (
      <IceLabel inverse={false} style={styles} status="default">
        {value}
      </IceLabel>
    );
  };

  changePage = (currentPage) => {
    this.fetchData({
      page: currentPage,
    });
  };

  render() {
    const tableData = this.props.bindingData.tableData;
    // console.log(this.props.bindingData.tableData);

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
            <Table.Column title="角色名称" dataIndex="name" width={105} />
            <Table.Column title="角色英文名称" dataIndex="enname" width={105} />
            <Table.Column
              title="可用状态"
              dataIndex="useable"
              width={100}
              cell={this.renderStatus}
            />
            <Table.Column
              title="操作"
              dataIndex="operation"
              width={150}
              cell={this.renderOperations}
            />
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
