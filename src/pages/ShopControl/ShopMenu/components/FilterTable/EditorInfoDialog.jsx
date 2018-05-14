/* eslint no-unused-expressions: 0 */
import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Dialog, Input, Grid, Switch, Feedback, Loading, Balloon, Button } from '@icedesign/base';
import FoundationSymbol from 'foundation-symbol';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import DialogDecorator from './DialogDecorator';

const { Col, Row } = Grid;
const Toast = Feedback.toast;

class FormDialog extends Component {
  static displayName = 'UserForm';
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      value: props.value,
      loadVisible: false,
    };
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
        this.setState({
          loadVisible: false,
        });
        Toast.error('数据填写不正确！请检查后再操作。');
      }
    });
  };


  render() {
    return (
      <Dialog
        title="编辑类目"
        onClose={this.props.onClose}
        onCancel={this.props.onCancel}
        onOk={this.onOkHandler}
        visible={this.state.visible}
        style={{ width: 500 }}
        validateAllFormField={this.validateAllFormField}

      >
        <Loading visible={this.state.loadVisible} style={styles.loadStyle} shape="flower">
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.onFormChange}
            ref="form"
          >
            <div>
              <Row style={styles.row}>
                <Col span={4}>
                  <span style={styles.label}>类目名称</span>
                </Col>
                <Col span={18}>
                  <IceFormBinder required triggerType="onBlur" message="必填">
                    <Input style={styles.formField} name="name" hasClear />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>

              <Row style={styles.row}>
                <Col span={4}>
                  <span style={styles.label}>图标</span>
                </Col>
                <Col span={18}>
                  <IceFormBinder>
                    <Input style={styles.formField} hasClear name="icon" />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col span={4}>
                  <span style={styles.label}>排序</span>
                </Col>
                <Col span={10}>
                  <IceFormBinder>
                    <Input
                      style={styles.formField}
                      name="orderNum"
                      hasClear
                    />
                  </IceFormBinder>
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
    display: 'inline-block',
    marginTop: '15px',
  },
  formField: {
    marginTop: '10px',
    width: '100%',
  },
  switchField: {
    marginTop: '10px',
  },
};

export default DialogDecorator(FormDialog);
