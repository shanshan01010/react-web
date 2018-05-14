/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { Tab, Loading } from '@icedesign/base';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';
import { DataSet } from '@antv/data-set';
import IceContainer from '@icedesign/container';

const TabPane = Tab.TabPane;

export default class EnhanceTable extends Component {
  static displayName = 'EnhanceTable';

  static defaultProps = {};

  constructor(props) {
    super(props);

    // 请求参数缓存
    this.queryCache = {};
    this.state = {
      visible: true,
      data: [],
    };
  }

  componentDidMount() {
    Axios({
      url: '/welend/account/userTotal/count',
      method: 'post',
      data: {},
      headers: {
        "Authorization": Cookies.get('authorization'),
      },
    }).then((res) => {
      if (res.data.status === 'success') {
        this.setState({
          data: res.data.data,
        });
      }
      this.setState({
        visible: false,
      });
      console.log(res);
    });
  }

  render() {
    const data = this.state.data;
    if (!data || data.length <= 0) {
      return (
        <Loading shape="flower" color="#333" style={styles.Loading} />
      );
    }

    console.log(data);
    const data1 = [{
      name: '所有用户信息统计表',
      '充值总额.': data.totalInMoney,
      '积分总额.': data.totalIntegral,
      '提现总额.': data.totalOutMoney,
      '投标总次数.': data.totalBidCount,
      '投标总金额.': data.totalBidMoney,
      '投标总盈利.': data.totalBidDiff,
      '投资未起息金额.': data.totalBidNew,
      '回款中资产.': data.totalBidLoad,
      '已回款资产.': data.totalBidFinish,
      '待收收益.': data.totalBidWait,
    }];
    const ds1 = new DataSet();
    const dv1 = ds1.createView().source(data1);
    dv1.transform({
      type: 'fold',
      fields: ['充值总额.', '积分总额.', '提现总额.', '投标总次数.', '投标总金额.', '投标总盈利.', '投资未起息金额.', '回款中资产.', '已回款资产.', '待收收益.'], // 展开字段集
      key: '类型', // key字段
      value: '金额', // value字段
    });
    const all = (
      <div className="chart-bar">
        <IceContainer>
          <h4 style={styles.charttitle}>所有用户信息统计表</h4>
          <Chart height={500} data={dv1} forceFit>
            <Axis name="类型" />
            <Axis name="金额" />
            <Legend />
            <Tooltip crosshairs={{ type: 'y' }} />
            <Geom
              type="interval"
              position="类型*金额"
              color="name"
              // adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]}
            />
          </Chart>
        </IceContainer>
      </div>
    );
    const tabs = [
      { tab: "所有用户统计", key: "all", content: all },
    ];


    return (
      <div className="filter-table">
        <IceContainer onChange>
          <Loading visible={this.state.visible} style={styles.loadStyle} shape="flower">
            <Tab>
              {tabs.map(item => (
                <TabPane key={item.key} tab={item.tab} onClick={this.handleClick}>
                  {item.content}
                </TabPane>
              ))}
            </Tab>
          </Loading>
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
  charttitle: {
    margin: '0 0 40px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
  },
  loadStyle: {
    position: 'relative',
    width: '100%',
    display: 'inline-block',
  }
};
