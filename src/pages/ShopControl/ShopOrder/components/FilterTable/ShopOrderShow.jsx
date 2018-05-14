import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import IceContainer from '@icedesign/container';
import { Loading, Feedback, Grid, Accordion  } from '@icedesign/base';
import IceLabel from '@icedesign/label';
import CustomBreadcrumb from '../../../../../components/CustomBreadcrumb';

const Toast = Feedback.toast;
const { Row, Col } = Grid;
const { Panel } = Accordion;

export default class ShowUser extends Component {
  static displayName = 'ShowUser';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      visible: true,
    };
  }

  componentWillMount() {
    const ids = this.props.location.state.id;
    Axios({
      url: '/welend/shop/orderDetail/show',
      method: 'post',
      data: {
        id: ids,
      },
      headers: {
        "Authorization": Cookies.get('authorization'),
      },
    }).then((res) => {
      this.setState({
        visible: false,
      });
      if (res.data.status === 'success') {
        this.setState({
          value: res.data.data,
        });
      } else {
        Toast.error(res.data.message);
      }
    }).catch(() => {
      Toast.error('数据获取失败！');
    });
  }

  render() {
    const value = this.state.value;
    if (!value || value.length <= 0 || value === undefined) {
      return (
        <Loading shape="flower" />
      );
    }

    const status = [];
    if (value !== {} && value !== undefined) {
      const statusvalue = '' + value.status + '';
      for (let i = 0; i < statusvalue.length; i++) {
        status.push(statusvalue.charAt(i));
      }
    }
    const breadcrumb = [
      { text: '商城管理', link: '' },
      { text: '订单管理', link: '#/shop/order' },
      { text: '订单详情', link: '#/shop/order/show' },
    ];
    return (
      <div>
        <CustomBreadcrumb dataSource={breadcrumb} />
        <Loading shape="flower" visible={this.state.visible} style={styles.loadStyle}>
          <IceContainer>
            <div style={styles.formContent}>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  产品名称：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.name}</div>
                </Col>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  购买数量：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.amount}</div>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  产品现价：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.money}</div>
                </Col>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  产品积分现价：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.integral}</div>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  用户花费总金额：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.totalMoney}</div>
                </Col>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  用户消费总积分：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.totalIntegral}</div>
                </Col>
              </Row>
            </div>
          </IceContainer>
        </Loading>
      </div>
    );
  }
}

const styles = {
  value: {
    height: '100%',
    width: '100%',
    lineHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    fontSize: '15px',
    marginLeft: '10px',
  },
  showUser: {
    display: 'inline-block',
    marginRight: '5px',
  },
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 10,
    // borderBottom: '1px solid #eeeeee',
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  loadStyle: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
  },
  statusLabel: {
    marginTop: '6px',
  },
  borderBottom: {
    marginBottom: 10,
    borderBottom: '1px solid #eee',
  },
};
