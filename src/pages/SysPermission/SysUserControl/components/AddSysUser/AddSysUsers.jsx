import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { hashHistory } from 'react-router';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Select, Switch, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import AllFunction from '../../../../../components/AllFunction';

const DataCommonAxios = AllFunction.DataCommonAxios;
// console.log(DataCommonAxios);

const { Row, Col } = Grid;
const Toast = Feedback.toast;
export default class AddMenus extends Component {
  static displayName = 'UserForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        id: '',
        name: '',
        loginName: '',
        mobile: '',
        departId: '',
        email: '',
        workNo: '',
        status: '',
        isLock: '',
        loginPwd: '',
        roleIdAttr: null,
      },
    };
    this.roleData = [];
    Axios({
      url: '/welend/sys/role/list',
      method: 'post',
      data: {},
      headers: {
        "Authorization": Cookies.get('authorization'),
      },
    }).then((data) => {
      for (let key in data.data.data.list) {
        this.roleData.push({
          label: data.data.data.list[key].name,
          value: data.data.data.list[key].id,
        });
      }
    });
  }

  isMobile = (rule, values, callback) => {
    if (/^[1][3|5|6|7|8][0-9]{11}$/.test(values)) {
      callback('请输入正确格式的手机号');
    } else {
      callback();
    }
  }

  checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入新密码');
    } else if (values.length < 8) {
      callback('密码必须大于8位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
    }
  };

  checkPasswd2 = (rule, values, callback, stateValues) => {
    // console.log('stateValues:', stateValues);
    if (values && values !== stateValues.passwd) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      // console.log('values', values);
      if (!errors || errors === null) {
        const Succeed = () => {
          Toast.success('添加成功！');
          hashHistory.push('/sysPermission/sysUserControl');
        };
        const Fail = () => {
          Toast.success('添加失败！');
        };
        values.roleIdAttr = [values.roleIdAttr];
        DataCommonAxios('/welend/sys/user/add', values, Succeed, Fail);
      }
    });
  };

  render() {
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>添加系统用户</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  账号：
                </Col>
                <Col s="12" l="5">
                  <IceFormBinder name="loginName" triggerType="onBlur" required message="必填">
                    <Input
                      size="large"
                      placeholder="请输入账号"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="loginName" />
                </Col>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  昵称：
                </Col>
                <Col s="12" l="5">
                  <IceFormBinder name="name">
                    <Input
                      size="large"
                      placeholder="请输入昵称"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  邮箱：
                </Col>
                <Col s="12" l="5">
                  <IceFormBinder
                    type="email"
                    name="email"
                    required
                    message="请输入正确的邮箱"
                  >
                    <Input
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="123456@qq.com"
                    />
                  </IceFormBinder>
                  <IceFormError name="email" />
                </Col>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  手机号码：
                </Col>
                <Col s="12" l="5">
                  <IceFormBinder name="mobile" required message="必填" validator={this.isMobile}>
                    <Input
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="请输入手机号码"
                    />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  工号：
                </Col>
                <Col s="12" l="5">
                  <IceFormBinder name="workNo">
                    <Input
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="请输入工号"
                    />
                  </IceFormBinder>
                </Col>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  部门：
                </Col>
                <Col s="12" l="5">
                  <IceFormBinder name="departId">
                    <Input
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="请输入部门"
                    />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  角色：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="roleIdAttr" required message="必填">
                    <Select
                      style={{ width: '50%' }}
                      size="large"
                      placeholder="请选择角色"
                      dataSource={this.roleData}
                    />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  用户是否启用：
                </Col>
                <Col s="12" l="3">
                  <IceFormBinder style={{ width: '20%' }} name="status" required message="必填">
                    <Switch style={{ marginTop: '3px' }} checkedChildren="开" unCheckedChildren="关"  size="medium" />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  用户是否允许登录：
                </Col>
                <Col s="12" l="5">
                  <IceFormBinder style={{ width: '20%' }} name="isLock" required message="必填">
                    <Switch style={{ marginTop: '3px' }} checkedChildren="开" unCheckedChildren="关"  size="medium" />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  新密码：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="passwd"
                    required
                    validator={this.checkPasswd}
                  >
                    <Input
                      style={{ width: '100%' }}
                      htmlType="password"
                      size="large"
                      placeholder="请重新输入新密码"
                    />
                  </IceFormBinder>
                  <IceFormError name="passwd" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  确认密码：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="loginPwd"
                    required
                    validator={(rule, values, callback) =>
                      this.checkPasswd2(
                        rule,
                        values,
                        callback,
                        this.state.value
                      )
                    }
                  >
                    <Input
                      style={{ width: '100%' }}
                      htmlType="password"
                      size="large"
                      placeholder="两次输入密码保持一致"
                    />
                  </IceFormBinder>
                  <IceFormError name="rePasswd" />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                onClick={this.validateAllFormField}
              >
                提 交
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 25,
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
};
