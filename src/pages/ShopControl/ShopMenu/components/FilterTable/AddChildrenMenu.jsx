/* eslint no-unused-expressions: 0 */
import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Dialog, Input, Select, Grid, Feedback, Loading, Balloon, Button, Switch } from '@icedesign/base';
import FoundationSymbol from 'foundation-symbol';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import DialogDecorator from './DialogDecorator';

const { Col, Row } = Grid;
const Toast = Feedback.toast;
const typeData = [
  { label: '显示', value: true },
  { label: '隐藏', value: false },
];

class AddCildrenMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      value: {
        name: '',
        icon: '',
        orderNum: '',
      },
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
        return null;
      }
    });
  };

  renderIcon = (type, idx) => {
    return (
      <div
        style={{
          display: 'inline-block',
          minWidth: '150px',
          marginBottom: '15px',
          cursor: 'pointer',
          float: 'left',
        }}
        key={idx}
      >
        <FoundationSymbol size="large" type={type} />
        <CopyToClipboard text={type} onCopy={this.copied}>
          <span style={{ marginLeft: '5px' }}>{type}</span>
        </CopyToClipboard>
      </div>
    );
  };

  copied = () => {
    Feedback.toast.success('复制成功！');
  };

  render() {
    return (
      <Dialog
        title="添加子类目"
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
                  <span style={styles.label}>子类目名称：</span>
                </Col>
                <Col span={10}>
                  <IceFormBinder required triggerType="onBlur" message="必填">
                    <Input style={styles.formField} name="name" />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>
              <Row>
                <Col span={4}>
                  <span style={styles.label}>类目图标：</span>
                </Col>
                <Col span={10}>
                  <IceFormBinder>
                    <Input style={styles.formField} name="icon" />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row>
                <Col span={4}>
                  <span style={styles.label}>类目顺序：</span>
                </Col>
                <Col span={8}>
                  <IceFormBinder required max={20} triggerType="onBlur" message="必填">
                    <Input style={styles.formField} name="orderNum" />
                  </IceFormBinder>
                  <IceFormError name="orderNum" />
                </Col>
              </Row>
              {/* <Row style={styles.row}>
                <Col span={4}>
                  <span style={styles.label}>是否显示</span>
                </Col>
                <Col span={18}>
                  <IceFormBinder>
                    <Select
                      dataSource={typeData}
                      style={styles.formField}
                      name="show"
                    />
                  </IceFormBinder>
                </Col>
              </Row> */}
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
    // lineHeight: '30px',
    marginTop: '15px',
  },
  formField: {
    marginTop: '10px',
    width: '100%',
  },
};

export default DialogDecorator(AddCildrenMenu);
