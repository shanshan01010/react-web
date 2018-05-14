import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import IceContainer from '@icedesign/container';
import CopyToClipboard from 'react-copy-to-clipboard';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, Feedback } from '@icedesign/base';
import FoundationSymbol from 'foundation-symbol';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import CustomBreadcrumb from '../../../../../../../components/CustomBreadcrumb';
import AllFunction from '../../../../../../../components/AllFunction';

const DataCommonAxios = AllFunction.DataCommonAxios;

const Toast = Feedback.toast;

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
        money: '',
        amount: '',
        status: null,
        isTop: null,
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      console.log(errors);
      const Succeed = () => {
        Toast.success('添加成功！');
        hashHistory.push('/shop/menu');
      };
      const Fail = () => {
        Toast.error('添加失败！');
      };
      DataCommonAxios('/welend/shop/menu/add', values, Succeed, Fail);
    });
  };
  render() {
    const breadcrumb = [
      { text: '商城管理', link: '' },
      { text: '商品类目管理', link: '#/shop/menu' },
      { text: '添加类别', link: '#/shop/menu/add' },
    ];
    return (
      <div className="user-form">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>添加类别</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  类别名称：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="name" required triggerType="onBlur" message="必填">
                    <Input
                      size="large"
                      placeholder="请输入类目名称"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  图标：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="icon">
                    <Input
                      size="large"
                      placeholder="请输入类目图标"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  排序：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="orderNum" required triggerType="onBlur" message="必填">
                    <Input
                      size="large"
                      placeholder="请输入类目顺序"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="orderNum" />
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
