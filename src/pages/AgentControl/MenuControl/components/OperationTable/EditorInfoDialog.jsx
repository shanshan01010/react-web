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
const allIcon = [
  'bangzhu',
  'cascades',
  'home2',
  'activity',
  'qrcode',
  'light',
  'link',
  'copy',
  'creative',
  'phone',
  'angle-down',
  'edit',
  'hourglass',
  'coupons',
  'repair',
  'shopcar',
  'cross',
  'clock',
  'search',
  'message',
  'exchange',
  'delete',
  'angle-up',
  'redpacket',
  'speaker',
  'transfer-left',
  'transfer-right',
  'customize',
  'down',
  'publish',
  'attachment',
  'eye',
  'location',
  'backward',
  'forward',
  'rmb',
  'notice',
  'yonghu',
  'shop',
  'fans2',
  'chart',
  'lock',
  'code',
  'horn',
  'home',
  'bell',
  'person',
  'bold',
  'background-color',
  'font-color',
  'underline',
  'italics',
  'font-size',
  'ol-list',
  'align-center',
  'align-flex',
  'float-full',
  'float-left',
  'quote',
  'align-right',
  'align-left',
  'ul-list',
  'store',
  'topic',
  'anchor',
  'video',
  'sucai',
  'picture',
  'gif',
  'task',
  'guanbi',
  'question',
  'mail',
  'image',
  'question2',
  'key',
  'content',
  'edit2',
  'menu',
  'collapse',
  'correct',
  'directory',
  'fans',
  'compass',
  'quote2',
  'gif2',
  'pin',
  'video2',
  'item',
  'material',
  'shezhi',
  'skin_light',
  'requ',
];

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
    const left = (
      <Button id="rightBottom" style={{ margin: '5px', background: '#bfe08b', border: 0, color: '#fff', marginTop: '10px' }} className="btrigger">
        图标样式表
      </Button>
    );

    const content = (
      <div style={{overflowY: 'auto', height: '300px' }}>
        <p style={{ color: '#f38190' }}>点击即可复制！</p>
        {allIcon.map(this.renderIcon)}
      </div>
    );
    return (
      <Dialog
        title="编辑代理菜单"
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
                  <span style={styles.label}>菜单名称</span>
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
                <Col span={10}>
                  <IceFormBinder>
                    <Input
                      style={styles.formField}
                      name="icon"
                      hasClear
                    />
                  </IceFormBinder>
                </Col>
                <Col s="5" l="7">
                  <Balloon
                    trigger={left}
                    align="r"
                    triggerType="click"
                  >
                    {content}
                  </Balloon>
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col span={4}>
                  <span style={styles.label}>顺序</span>
                </Col>
                <Col span={18}>
                  <IceFormBinder required triggerType="onBlur" message="必填">
                    <Input
                      style={styles.formField}
                      name="orderNum"
                      hasClear
                    />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col span={4}>
                  <span style={styles.label}>链接地址</span>
                </Col>
                <Col span={18}>
                  <IceFormBinder>
                    <Input
                      style={styles.formField}
                      name="href"
                      hasClear
                    />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col span={4}>
                  <span style={styles.label}>权限标识</span>
                </Col>
                <Col span={18}>
                  <IceFormBinder triggerType="onBlur">
                    <Input
                      style={styles.formField}
                      name="perms"
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
