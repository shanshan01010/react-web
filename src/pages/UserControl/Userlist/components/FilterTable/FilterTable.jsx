/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { Table, Pagination, Button, Icon } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';
import FilterForm from './Filter';
import EditDialog from './components/EditDialog';

import AllFunction from '../../../../../components/AllFunction';

const tableDatas = AllFunction.TableDataBinder('/welend/account/user/list', false);
const updateBindingDatas = AllFunction.updateBindingData('/welend/account/user/list');


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

  onDetailsClick = (value, url) => {
    hashHistory.push({
      pathname: url,
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
        <span
          title="编辑"
          style={styles.operBtn}
          onClick={this.onDetailsClick.bind(this, record, '/user/list/edit')}
        >
          <Icon size="xs" type="edit" />
        </span>

        <span
          title="详情"
          style={styles.operBtn}
          onClick={this.onDetailsClick.bind(this, record, '/user/list/details')}
        >
          <Icon size="xs" type="ellipsis" />
        </span>
        <span
          title="统计"
          style={styles.operBtn}
          onClick={this.onDetailsClick.bind(this, record, '/user/list/count')}
        >
          <Icon size="xs" type="image-text" />
        </span>
      </div>
    );
  };

  renderClassId = (value, index, record) => {
    return (
      <div>
        <IceLabel status="danger">
          {record.classId}
        </IceLabel>&nbsp;&nbsp;{record.className}
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

  downFile = (blob, fileName) => {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    }
  }

  downloadUrl = (url) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    iframe.onload = function () {
      document.body.removeChild(iframe);
    };
    document.body.appendChild(iframe);
  }

  downloadDetailData = () => {
    const divElement = document.getElementById('downloadDiv');
    const downloadUrl = '/welend/excel/moneyIn';
    const params = {
      headers: {
        "Authorization": Cookies.get('authorization'),
      },
    };
    ReactDOM.render(
      <form action={downloadUrl} method="post">
        <input name="params" type="text" value={params} />
      </form>,
      divElement
    );
    ReactDOM.findDOMNode(divElement).querySelector('form').submit();
    ReactDOM.unmountComponentAtNode(divElement);
  }

  onDataOutClick = () => {
    // alert('数据导出');
    // Axios({
    //   url: '/welend/excel/moneyIn',
    //   method: 'post',
    //   data: {},
    //   headers: {
    //     'Authorization': Cookies.get('authorization'),
    //   },
    // }).then((res) => {
    //   console.log(res);
    //   const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
    //   const fileName = '用户列表.xls';
    //   this.downFile(blob, fileName);
    // }).catch(() => {
    // });
    Axios.get('/welend/excel/moneyIn', {
      headers: {
        'Authorization': Cookies.get('authorization'),
      },
    }).then((res) => {
      const blob = new Blob([res.data], { type: 'application/ms-excel' });
      const fileName = '用户列表';
      this.downFile(blob, fileName);
    });
  }

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
          <div id="downloadDiv" style={{ display: 'none' }} />
          <Button style={styles.dataOut} shape="warning" onClick={this.downloadDetailData}>数据导出</Button>
          <Table
            dataSource={tableData.list}
            isLoading={tableData.__loading}
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >
            <Table.Column title="手机号" dataIndex="mobile" width={100} />
            <Table.Column title="邮箱地址" dataIndex="email" width={105} />
            <Table.Column title="账户余额" dataIndex="money" width={85} />
            <Table.Column title="账户等级" dataIndex="classId" cell={this.renderClassId} width={100} />
            <Table.Column title="用户积分" dataIndex="integral" width={100} />
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
