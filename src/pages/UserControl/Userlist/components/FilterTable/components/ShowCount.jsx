/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { Loading } from '@icedesign/base';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';
import { DataSet } from '@antv/data-set';
import IceContainer from '@icedesign/container';
import CustomBreadcrumb from '../../../../../../components/CustomBreadcrumb';

// 用户个人统计
export default class ShowCount extends Component {
  static displayName = 'ShowCount';

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
    const ids = this.props.location.state.id;
    Axios({
      url: '/welend/account/userTotal/count',
      method: 'post',
      data: {
        userId: ids,
      },
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
    const breadcrumb = [
      { text: '用户管理', link: '' },
      { text: '用户列表', link: '#/user/list' },
      { text: '个人统计', link: '#/user/list/count' },
    ];
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

    return (
      <div className="filter-table">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <IceContainer onChange>
          <Loading visible={this.state.visible} style={styles.loadStyle} shape="flower">
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
                />
              </Chart>
            </IceContainer>
          </Loading>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
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
  },
};
