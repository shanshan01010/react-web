import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { hashHistory } from 'react-router';
import IceContainer from '@icedesign/container';
import { Button, Loading, Feedback, Grid } from '@icedesign/base';
import CustomBreadcrumb from '../../../../../../components/CustomBreadcrumb';

const Toast = Feedback.toast;
const { Row, Col } = Grid;

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
    console.log(ids);
    Axios({
      url: '/welend/account/user/show',
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
      // console.log(res.data.data);
    });
  }

  render() {
    const value = this.state.value;
    console.log(value.money);
    const breadcrumb = [
      { text: '用户管理', link: '' },
      { text: '用户列表', link: '#/user/list' },
      { text: '用户详情', link: '#/user/list/details' },
    ];
    return (
      <div>
        <CustomBreadcrumb dataSource={breadcrumb} />
        <IceContainer>
          <Loading shape="flower" visible={this.state.visible} style={styles.loadStyle}>
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>用户详情</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  手机号：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.mobile}</div>
                </Col>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  邮箱：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.email}</div>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  账户余额：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.money}</div>
                </Col>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  用户积分：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.integral}</div>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  用户等级：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.classId}</div>
                </Col>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  等级名称：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.className}</div>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  微信ID：
                </Col>
                <Col s="12" l="10">
                  <div style={styles.value}>{value.openID}</div>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  最近一次登录时间：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.loginTime}</div>
                </Col>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  最近一次登录IP：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.loginIp}</div>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  最近登录设备：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.loginDevice}</div>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  注册IP：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.registerIP}</div>
                </Col>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  注册时间：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.registerTime}</div>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  注册设备：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.registerDevice}</div>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  真实姓名：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.chnName}</div>
                </Col>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  身份证号：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.chnNum}</div>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  代理邀请号：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.agentCode}</div>
                </Col>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  渠道商ID：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.inviteCode}</div>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  创建时间：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.createTime}</div>
                </Col>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  更新时间：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.updateTime}</div>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  开户行：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.openBankName}</div>
                </Col>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  银行名称：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.bankName}</div>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  银行卡号：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.backCard}</div>
                </Col>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  银行卡预留手机号：
                </Col>
                <Col s="6" l="6">
                  <div style={styles.value}>{value.bankMobile}</div>
                </Col>
              </Row>
            </div>
          </Loading>
        </IceContainer>
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
    marginBottom: 25,
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
  }
};
