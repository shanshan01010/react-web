import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import IceContainer from '@icedesign/container';
import { Loading, Feedback, Grid, Accordion  } from '@icedesign/base';
import IceLabel from '@icedesign/label';
import CustomBreadcrumb from '../../../../../../components/CustomBreadcrumb';

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
      { text: '用户管理', link: '' },
      { text: '用户列表', link: '#/user/list' },
      { text: '用户详情', link: '#/user/list/details' },
    ];
    return (
      <div>
        <CustomBreadcrumb dataSource={breadcrumb} />
        <Loading shape="flower" visible={this.state.visible} style={styles.loadStyle}>
          <IceContainer>
            <Accordion>
              <Panel
                multiTitle
                title="用户基本详情"
              >
                <ul>
                  <li>
                    <div style={styles.formContent}>
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
                      <Row style={styles.borderBottom}>
                        <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                          微信ID：
                        </Col>
                        <Col s="12" l="10">
                          <div style={styles.value}>{value.openID}</div>
                        </Col>
                      </Row>
                      <Row style={styles.formItem}>
                        <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                          最近登录时间：
                        </Col>
                        <Col s="6" l="6">
                          <div style={styles.value}>{value.loginTime}</div>
                        </Col>
                        <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                          最近登录IP：
                        </Col>
                        <Col s="6" l="6">
                          <div style={styles.value}>{value.loginIp}</div>
                        </Col>
                      </Row>
                      <Row style={styles.borderBottom}>
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
                      <Row style={styles.borderBottom}>
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
                          银行卡预留手机：
                        </Col>
                        <Col s="6" l="6">
                          <div style={styles.value}>{value.bankMobile}</div>
                        </Col>
                      </Row>
                    </div>
                  </li>
                </ul>
              </Panel>
            </Accordion>
          </IceContainer>
          <IceContainer>
            <div style={styles.formContent}>
              <h4 style={styles.formTitle}>用户状态信息</h4>
              <Row style={styles.formItem}>
                <Col xxs="6" s="6" l="6" style={styles.formLabel}>
                  是否禁止用户登录：
                </Col>
                <Col s="4" l="4">
                  <IceLabel style={styles.statusLabel} status="danger">
                    {status[0] === '1' ? '正常' : '禁止' }
                  </IceLabel>
                </Col>
                <Col xxs="6" s="6" l="6" style={styles.formLabel}>
                  用户绑定银行卡：
                </Col>
                <Col s="4" l="4">
                  <IceLabel style={styles.statusLabel} status="danger">
                    {status[1] === '1' ? '已绑定' : '未绑定' }
                  </IceLabel>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="6" l="6" style={styles.formLabel}>
                  用户认证状态：
                </Col>
                <Col s="4" l="4">
                  <IceLabel style={styles.statusLabel} status="danger">
                    {status[2] === '1' ? '已认证' : '未认证' }
                  </IceLabel>
                </Col>
                <Col xxs="6" s="6" l="6" style={styles.formLabel}>
                  用户投资新手标状态：
                </Col>
                <Col s="4" l="4">
                  <IceLabel style={styles.statusLabel} status="danger">
                    {status[3] === '1' ? '已投资' : '未投资' }
                  </IceLabel>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="6" l="6" style={styles.formLabel}>
                  用户风险测评状态：
                </Col>
                <Col s="4" l="4">
                  <IceLabel style={styles.statusLabel} status="danger">
                    {status[4] === '1' ? '已测评' : '未测评' }
                  </IceLabel>
                </Col>
                <Col xxs="6" s="6" l="6" style={styles.formLabel}>
                  用户是否允许发信息：
                </Col>
                <Col s="4" l="4">
                  <IceLabel style={styles.statusLabel} status="danger">
                    {status[5] === '1' ? '允许' : '不允许' }
                  </IceLabel>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="6" l="6" style={styles.formLabel}>
                  用户是否允许发邮件：
                </Col>
                <Col s="4" l="4">
                  <IceLabel style={styles.statusLabel} status="danger">
                    {status[6] === '1' ? '允许' : '不允许' }
                  </IceLabel>
                </Col>
                <Col xxs="6" s="6" l="6" style={styles.formLabel}>
                  用户是否允许发站内信：
                </Col>
                <Col s="4" l="4">
                  <IceLabel style={styles.statusLabel} status="danger">
                    {status[7] === '1' ? '允许' : '不允许' }
                  </IceLabel>
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
