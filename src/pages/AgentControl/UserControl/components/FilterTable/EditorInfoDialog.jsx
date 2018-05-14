/* eslint no-unused-expressions: 0 */
import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { Dialog, Input, Select, Grid, Switch, Loading, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import DialogDecorator from './DialogDecorator';

const { Col, Row } = Grid;
const Toast = Feedback.toast;

class FormDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      value: props.value,
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

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  onOkHandler = () => {
    this.setState({
      loadVisible: true,
    });
    this.refs.form.validateAll((errors, values) => {
      if (!errors || errors.length === 0) {
        this.props.onOk && this.props.onOk(this);
      } else {
        Toast.error('数据填写不正确！请检查后再操作。');
      }
    });
  };

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

  render() {
    return (
      <Dialog
        title="编辑"
        onClose={this.props.onClose}
        onCancel={this.props.onCancel}
        onOk={this.onOkHandler}
        visible={this.state.visible}
        style={{ width: 600 }}
      >
        <Loading visible={this.state.loadVisible} style={styles.loadStyle} shape="flower">
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.onFormChange}
            ref="form"
          >
            <div>
              <Row>
                <Col span={4}>
                  <span style={styles.label}>标题</span>
                </Col>
                <Col span={18}>
                  <IceFormBinder required max={20} message="账号">
                    <Input style={styles.formField} name="loginName" />
                  </IceFormBinder>
                  <IceFormError name="loginName" />
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col span={4}>
                  <span style={styles.label}>昵称</span>
                </Col>
                <Col span={18}>
                  <IceFormBinder>
                    <Input
                      style={styles.formField}
                      name="name"
                    />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col span={4}>
                  <span style={styles.label}>手机号</span>
                </Col>
                <Col span={18}>
                  <IceFormBinder>
                    <Input
                      style={styles.formField}
                      name="mobile"
                    />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col span={4}>
                  <span style={styles.label}>工号</span>
                </Col>
                <Col span={18}>
                  <IceFormBinder>
                    <Input
                      style={styles.formField}
                      name="workNo"
                    />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col span={4}>
                  <span style={styles.label}>部门</span>
                </Col>
                <Col span={18}>
                  <IceFormBinder>
                    <Input
                      style={styles.formField}
                      name="departId"
                    />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col span={4}>
                  <span style={styles.label}>启用状态</span>
                </Col>
                <Col span={18}>
                  <IceFormBinder>
                    <Switch style={{ marginTop: '3px' }} name="isLock" defaultChecked={this.state.value.status} checkedChildren="开" unCheckedChildren="关"  size="medium" />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col span={4}>
                  <span style={styles.label}>是否允许登录</span>
                </Col>
                <Col span={18}>
                  <IceFormBinder>
                    <Switch style={{ marginTop: '3px' }} name="isLock" defaultChecked={this.state.value.isLock} checkedChildren="开" unCheckedChildren="关"  size="medium" />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col span={4}>
                  <span style={styles.label}>角色</span>
                </Col>
                <Col span={18}>
                  <IceFormBinder>
                    <Select
                      dataSource={this.roleData}
                      style={styles.formField}
                      name="roleIdAttr"
                    />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  新密码：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="passwd"
                    required
                    validator={this.checkPasswd}
                  >
                    <Input
                      style={styles.formField}
                      htmlType="password"
                      size="large"
                      placeholder="请重新输入新密码"
                    />
                  </IceFormBinder>
                  <IceFormError name="passwd" />
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
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
                      style={styles.formField}
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
        </Loading>
      </Dialog>
    );
  }
}

const styles = {
  loadStyle: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  row: {
    marginTop: '10px',
  },
  label: {
    lineHeight: '30px',
  },
  formField: {
    width: '100%',
  },
};

export default DialogDecorator(FormDialog);
