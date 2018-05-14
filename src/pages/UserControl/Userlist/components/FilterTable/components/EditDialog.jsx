import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import IceContainer from '@icedesign/container';
import { Loading, Feedback, Grid, Accordion, Input, Switch } from '@icedesign/base';
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

  onSwitchChange = (count, checked) => {
    const status = [];
    if (checked === true) {
      checked = '1';
    } else {
      checked = '0';
    }
    status.splice(count, 0, checked);
    console.log(checked, status, count);
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
      console.log(status);
    }
    console.log(value);
    const breadcrumb = [
      { text: '用户管理', link: '' },
      { text: '用户列表', link: '#/user/list' },
      { text: '用户编辑', link: '#/user/list/edit' },
    ];
    return (
      <div>
        <CustomBreadcrumb dataSource={breadcrumb} />
        <Loading shape="flower" visible={this.state.visible} style={styles.loadStyle}>
          <IceContainer>
            <Accordion>
              <Panel
                multiTitle
                title="用户基本信息编辑区"
              >
                <div style={styles.formContent}>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      手机号：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.mobile} />
                    </Col>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      邮箱：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.email} />
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      账户余额：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.money} />
                    </Col>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      用户积分：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.integral} />
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      用户等级：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.classId} />
                    </Col>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      等级名称：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.className} />
                    </Col>
                  </Row>
                  <Row style={styles.borderBottom}>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      微信ID：
                    </Col>
                    <Col s="12" l="10">
                      <Input style={styles.value} placeholder={value.openID} />
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      最近登录时间：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.loginTime} />
                    </Col>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      最近登录IP：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.loginIp} />
                    </Col>
                  </Row>
                  <Row style={styles.borderBottom}>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      最近登录设备：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.loginDevice} />
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      注册IP：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.registerIP} />
                    </Col>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      注册时间：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.registerTime} />
                    </Col>
                  </Row>
                  <Row style={styles.borderBottom}>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      注册设备：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.registerDevice} />
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      真实姓名：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.chnName} />
                    </Col>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      身份证号：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.chnNum} />
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      代理邀请号：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.agentCode} />
                    </Col>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      渠道商ID：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.inviteCode} />
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      创建时间：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.createTime} />
                    </Col>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      更新时间：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.updateTime} />
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      开户行：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.openBankName} />
                    </Col>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      银行名称：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.bankName} />
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      银行卡号：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.backCard} />
                    </Col>
                    <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                      银行卡预留手机：
                    </Col>
                    <Col s="6" l="6">
                      <Input style={styles.value} placeholder={value.bankMobile} />
                    </Col>
                  </Row>
                </div>
              </Panel>
            </Accordion>
          </IceContainer>
          <IceContainer>
            <div style={styles.formContent}>
              <h4 style={styles.formTitle}>用户状态信息编辑区</h4>
              <Row style={styles.formItem}>
                <Col xxs="6" s="6" l="6" style={styles.formLabel}>
                  是否禁止用户登录：
                </Col>
                <Col s="4" l="4">
                  {
                    status[0] === '1' ? (
                      <Switch checkedChildren="开" onChange={this.onSwitchChange.bind(this, 0)} defaultChecked="true" unCheckedChildren="关" />
                    ) : (
                      <Switch checkedChildren="开" onChange={this.onSwitchChange.bind(this, 0)} defaultChecked="false" unCheckedChildren="关" />
                    )
                  }
                </Col>
                <Col xxs="6" s="6" l="6" style={styles.formLabel}>
                  用户绑定银行卡：
                </Col>
                <Col s="4" l="4">
                  {
                    status[1] === '1' ? (
                      <Switch checkedChildren="开" onChange={this.onSwitchChange.bind(this, 1)} defaultChecked="true" unCheckedChildren="关" />
                    ) : (
                      <Switch checkedChildren="开" onChange={this.onSwitchChange.bind(this, 1)} defaultChecked="false" unCheckedChildren="关" />
                    )
                  }
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="6" l="6" style={styles.formLabel}>
                  用户认证状态：
                </Col>
                <Col s="4" l="4">
                  {
                    status[2] === '1' ? (
                      <Switch checkedChildren="开" onChange={this.onSwitchChange.bind(this, 2)} defaultChecked="true" unCheckedChildren="关" />
                    ) : (
                      <Switch checkedChildren="开" onChange={this.onSwitchChange.bind(this, 2)} defaultChecked="false" unCheckedChildren="关" />
                    )
                  }
                </Col>
                <Col xxs="6" s="6" l="6" style={styles.formLabel}>
                  用户投资新手标状态：
                </Col>
                <Col s="4" l="4">
                  {
                    status[3] === '1' ? (
                      <Switch checkedChildren="开" onChange={this.onSwitchChange.bind(this, 3)} defaultChecked="true" unCheckedChildren="关" />
                    ) : (
                      <Switch checkedChildren="开" onChange={this.onSwitchChange.bind(this, 3)} defaultChecked="false" unCheckedChildren="关" />
                    )
                  }
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="6" l="6" style={styles.formLabel}>
                  用户风险测评状态：
                </Col>
                <Col s="4" l="4">
                  {
                    status[4] === '1' ? (
                      <Switch checkedChildren="开" onChange={this.onSwitchChange.bind(this, 4)} defaultChecked="true" unCheckedChildren="关" />
                    ) : (
                      <Switch checkedChildren="开" onChange={this.onSwitchChange.bind(this, 4)} defaultChecked="false" unCheckedChildren="关" />
                    )
                  }
                </Col>
                <Col xxs="6" s="6" l="6" style={styles.formLabel}>
                  用户是否允许发信息：
                </Col>
                <Col s="4" l="4">
                  {
                    status[5] === '1' ? (
                      <Switch checkedChildren="开" onChange={this.onSwitchChange.bind(this, 5)} defaultChecked="true" unCheckedChildren="关" />
                    ) : (
                      <Switch checkedChildren="开" onChange={this.onSwitchChange.bind(this, 5)} defaultChecked="false" unCheckedChildren="关" />
                    )
                  }
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="6" l="6" style={styles.formLabel}>
                  用户是否允许发邮件：
                </Col>
                <Col s="4" l="4">
                  {
                    status[6] === '1' ? (
                      <Switch checkedChildren="开" onChange={this.onSwitchChange.bind(this, 6)} defaultChecked="true" unCheckedChildren="关" />
                    ) : (
                      <Switch checkedChildren="开" onChange={this.onSwitchChange.bind(this, 6)} defaultChecked="false" unCheckedChildren="关" />
                    )
                  }
                </Col>
                <Col xxs="6" s="6" l="6" style={styles.formLabel}>
                  用户是否允许发站内信：
                </Col>
                <Col s="4" l="4">
                  {
                    status[7] === '1' ? (
                      <Switch checkedChildren="开" onChange={this.onSwitchChange.bind(this, 7)} defaultChecked="true" unCheckedChildren="关" />
                    ) : (
                      <Switch checkedChildren="开" onChange={this.onSwitchChange.bind(this, 7)} defaultChecked="false" unCheckedChildren="关" />
                    )
                  }
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
    paddingBottom: '10px',
  },
};
