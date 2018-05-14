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

class AddCildrenMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      value: {
        name: '',
        icon: '',
        orderNum: '',
        href: '',
        parentId: props.value.id,
        perms: '',
        type: 0,
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
      console.log(values);
      if (!(this.props.value.href === '' || this.props.value.href == null || this.props.value.href.length <= 0)) {
        values.type = 2;
      } else {
        values.type = 1;
      }
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
    console.log(this.state.value);
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
    let titles = '';
    return (
      <Dialog
        {...this.props.value.href === '' || this.props.value.href == null || this.props.value.href.length <= 0 ? (titles = '添加子菜单') : (titles = '添加按钮权限')}
        title={titles}
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
                  {this.props.value.href === '' || this.props.value.href == null || this.props.value.href.length <= 0 ? (
                    <span style={styles.label}>菜单名称：</span>
                  ) : (
                    <span style={styles.label}>按钮名称：</span>
                  )}
                </Col>
                <Col span={10}>
                  <IceFormBinder required triggerType="onBlur" message="必填">
                    <Input style={styles.formField} name="name" />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>
              {
                this.props.value.href === '' || this.props.value.href == null || this.props.value.href.length <= 0 ? (
                  <Row>
                    <Col span={4}>
                      <span style={styles.label}>菜单图标：</span>
                    </Col>
                    <Col span={10}>
                      <IceFormBinder>
                        <Input style={styles.formField} name="icon" />
                      </IceFormBinder>
                    </Col>
                    <Col s="3" l="5">
                      <Balloon
                        trigger={left}
                        align="r"
                        triggerType="click"
                      >
                        {content}
                      </Balloon>
                    </Col>
                  </Row>
                ) : null
              }
              <Row>
                <Col span={4}>
                  {this.props.value.href === '' || this.props.value.href == null || this.props.value.href.length <= 0 ? (
                    <span style={styles.label}>菜单顺序：</span>
                  ) : (
                    <span style={styles.label}>按钮顺序：</span>
                  )}
                </Col>
                <Col span={8}>
                  <IceFormBinder required max={20} triggerType="onBlur" message="必填">
                    <Input style={styles.formField} name="orderNum" />
                  </IceFormBinder>
                  <IceFormError name="orderNum" />
                </Col>
              </Row>

              <Row>
                <Col span={4}>
                  {this.props.value.href === '' || this.props.value.href == null || this.props.value.href.length <= 0 ? (
                    <span style={styles.label}>菜单权限标识：</span>
                  ) : (
                    <span style={styles.label}>按钮权限标识：</span>
                  )}
                </Col>
                <Col span={18}>
                  <IceFormBinder >
                    <Input style={styles.formField} name="perms" />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row>
                <Col span={4}>
                  <span style={styles.label}>链接地址：</span>
                </Col>
                <Col span={18}>
                  <IceFormBinder>
                    <Input style={styles.formField} name="href" />
                  </IceFormBinder>
                  <p style={{ marginTop: '5px', color: '#ea9191' }}>如果本菜单还有子菜单，那么无需填写！</p>
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
    // lineHeight: '30px',
    marginTop: '15px',
  },
  formField: {
    marginTop: '10px',
    width: '100%',
  },
};

export default DialogDecorator(AddCildrenMenu);
