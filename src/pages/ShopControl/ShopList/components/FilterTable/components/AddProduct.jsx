import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import IceContainer from '@icedesign/container';
import CopyToClipboard from 'react-copy-to-clipboard';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, Feedback, CascaderSelect, Loading  } from '@icedesign/base';
import FoundationSymbol from 'foundation-symbol';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import CustomBreadcrumb from '../../../../../../components/CustomBreadcrumb';
import AllFunction from '../../../../../../components/AllFunction';

const DataCommonAxios = AllFunction.DataCommonAxios;

const Toast = Feedback.toast;
const selectData = [];

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
    this.roleData = [];
    Axios({
      url: '/welend/shop/menu/list',
      method: 'post',
      data: {},
      headers: {
        "Authorization": Cookies.get('authorization'),
      },
    }).then((res) => {
      if (res && res.data.data.list.length > 0) {
        res.data.data.list.map((nav, index) => {
          if (nav.children && nav.children.length > 0) {
            selectData[index] = { value: nav.id, label: nav.name, children: [] };
            return this.parent(selectData[index], nav.children);
          }
          return selectData[index] = { value: nav.id, label: nav.name, children: [] };
        });
      }
    });
  }

  parent = (f, c) => {
    c.map((item, index) => {
      f.children.push({ value: item.id, label: item.name, children: [] });
      if (item.children && item.children.length > 0) {
        this.parent(f.children[index], item.children, index);
      }
    });
  }

  child = (m) => {
    return selectData.push(m.permission);
  }

  isMobile = (rule, values, callback) => {
    if (/^[1][3|5|6|7|8][0-9]{11}$/.test(values)) {
      callback('请输入正确格式的手机号');
    } else {
      callback();
    }
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
        hashHistory.push('/shop/product');
      };
      const Fail = () => {
        Toast.error('添加失败！');
      };
      DataCommonAxios('/welend/shop/product/add', values, Succeed, Fail);
    });
  };
  render() {
    const breadcrumb = [
      { text: '商城管理', link: '' },
      { text: '商品管理', link: '#/shop/product' },
      { text: '添加商品', link: '#/shop/product/add' },
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
              <h2 style={styles.formTitle}>添加商品</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  商品名称：
                </Col>
                <Col s="6" l="6">
                  <IceFormBinder name="name" required triggerType="onBlur" message="必填">
                    <Input
                      size="large"
                      placeholder="请输入商品名称"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  商品价格：
                </Col>
                <Col s="6" l="6">
                  <IceFormBinder name="money" required triggerType="onBlur" message="必填">
                    <Input
                      size="large"
                      placeholder="请输入商品价格"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="money" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  商品顺序：
                </Col>
                <Col s="6" l="6">
                  <IceFormBinder name="sort" required triggerType="onBlur" message="必填">
                    <Input
                      size="large"
                      placeholder="请输入商品顺序"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="sort" />
                </Col>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  商品库存：
                </Col>
                <Col s="6" l="6">
                  <IceFormBinder name="amount" required triggerType="onBlur" message="必填">
                    <Input
                      size="large"
                      placeholder="请输入商品库存"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="amount" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  商品类别：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="categoryId">
                    {/* <Select
                      size="large"
                      placeholder="请选择商品类别"
                      style={{ width: '100%' }}
                      dataSource={this.roleData}
                    /> */}
                    {
                      !selectData && selectData.length <= 0 ? (
                        <Loading shape="flower" />
                      ) : (
                        <CascaderSelect
                          dataSource={selectData}
                          onChange={this.handleChange}
                        />
                      )
                    }
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  商品状态：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="status">
                    <Select
                      size="large"
                      placeholder="请选择商品状态"
                      style={{ width: '100%' }}
                      dataSource={[
                        { label: '默认', value: 0 },
                        { label: '停用', value: 1 },
                      ]}
                    />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  是否推荐：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="isTop">
                    <Select
                      size="large"
                      placeholder="请选择"
                      style={{ width: '100%' }}
                      dataSource={[
                        { label: '推荐', value: 0 },
                        { label: '不推荐', value: 1 },
                      ]}
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
