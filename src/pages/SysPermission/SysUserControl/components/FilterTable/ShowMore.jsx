/* eslint no-unused-expressions: 0 */
import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { Dialog, Input, Select, Grid, Switch, Loading, Feedback, Button } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import DialogDecorator from './DialogDecorator';
import AllFunction from '../../../../../components/AllFunction';

const DataCommonAxioss = AllFunction.DataCommonAxios;

const { Col, Row } = Grid;
const Toast = Feedback.toast;

class FormDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      value: props.value,
      loadVisible: false,
    };
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const footer = (
      <Button type="primary" onClick={this.onClose}>
        关闭
      </Button>
    );
    return (
      <Dialog
        title="用户详情"
        onClose={this.onClose}
        visible={this.state.visible}
        footer={footer}
        style={{ width: 600 }}
      >
        <Loading visible={this.state.loadVisible} style={styles.loadStyle} shape="flower">
          <div style={{ padding: '15px'}}>
            <Row>
              <Col span={6} style={styles.col}>
                <span style={styles.label}>标题：</span>
              </Col>
              <Col span={18}>
                <div style={styles.formField}>
                  {this.state.value.loginName}
                </div>
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col span={6} style={styles.col}>
                <span style={styles.label}>昵称：</span>
              </Col>
              <Col span={18}>
                <div style={styles.formField}>
                  {this.state.value.name}
                </div>
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col span={6} style={styles.col}>
                <span style={styles.label}>手机号：</span>
              </Col>
              <Col span={18}>
                <div style={styles.formField}>
                  {this.state.value.mobile}
                </div>
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col span={6} style={styles.col}>
                <span style={styles.label}>工号：</span>
              </Col>
              <Col span={18}>
                <div style={styles.formField}>
                  {this.state.value.workNo}
                </div>
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col span={6} style={styles.col}>
                <span style={styles.label}>部门：</span>
              </Col>
              <Col span={18}>
                <div style={styles.formField}>
                  {this.state.value.departId}
                </div>
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col span={6} style={styles.col}>
                <span style={styles.label}>启用状态：</span>
              </Col>
              <Col span={18}>
                <Switch style={{ marginTop: '3px' }} name="isLock" checked={this.state.value.status} checkedChildren="开" unCheckedChildren="关"  size="medium" />
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col span={6} style={styles.col}>
                <span style={styles.label}>是否允许登录：</span>
              </Col>
              <Col span={18}>
                <Switch style={{ marginTop: '3px' }} name="isLock" checked={this.state.value.isLock} checkedChildren="开" unCheckedChildren="关"  size="medium" />
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col span={6} style={styles.col}>
                <span style={styles.label}>角色：</span>
              </Col>
              <Col span={18}>
                <div style={styles.formField}>
                  {this.state.value.roleIdAttr}
                </div>
              </Col>
            </Row>
          </div>
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
    borderBottom: '1px solid #eee',
  },
  label: {
    lineHeight: '30px',
  },
  col: {
    textAlign: 'right',
  },
  formField: {
    width: '100%',
    lineHeight: '30px',
    textIndent: '10px',
  },
};

export default DialogDecorator(FormDialog);
