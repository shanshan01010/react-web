import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import IceContainer from '@icedesign/container';
import CopyToClipboard from 'react-copy-to-clipboard';
import { hashHistory } from 'react-router';
import { Input, Grid, Button, Switch, Feedback, Balloon } from '@icedesign/base';
import FoundationSymbol from 'foundation-symbol';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import AllFunction from '../../../../../components/AllFunction';

const DataCommonAxios = AllFunction.DataCommonAxios;

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
  'requ'
];

const { Row, Col } = Grid;
export default class AddMenus extends Component {
  static displayName = 'UserForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        icon: '',
        orderNum: '',
        href: '',
        perms: '',
        type: 0,
      },
    };
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
      console.log(errors);
      const Succeed = () => {
        Toast.success('添加菜单成功！');
        hashHistory.push('/agency/menu');
      };
      const Fail = () => {
        Toast.error('添加菜单失败！');
      };
      DataCommonAxios('/welend/agency/menu/add', values, Succeed, Fail);
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
      <Button id="rightBottom" style={{ margin: '5px', background: '#bfe08b', border: 0, color: '#fff' }} className="btrigger">
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
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>添加代理菜单</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  菜单名称：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="name" required triggerType="onBlur" message="必填">
                    <Input
                      size="large"
                      placeholder="请输入菜单名称"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  排序：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="orderNum" required triggerType="onBlur" message="必填">
                    <Input
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="请输入排序"
                    />
                  </IceFormBinder>
                  <IceFormError name="orderNum" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  图标：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="icon">
                    <Input
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="请输入菜单图标"
                    />
                  </IceFormBinder>
                </Col>
                <Col s="3" l="5">
                  <Balloon
                    trigger={left}
                    align="l"
                    triggerType="click"
                  >
                    {content}
                  </Balloon>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  链接地址：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="href">
                    <Input
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="请输入链接地址"
                    />
                  </IceFormBinder>
                  <p style={{ marginTop: '5px', color: '#ea9191' }}>如果本菜单还有子菜单，那么无需填写！</p>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  权限标识：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="perms">
                    <Input
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="请输入权限标识"
                    />
                  </IceFormBinder>
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
