import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { hashHistory } from 'react-router';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Select, Tree, Checkbox, Loading, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Node: TreeNode } = Tree;
const { Row, Col } = Grid;
const Toast = Feedback.toast;

const tipLoader1 = (
  <div className="load-container load7">
    <div className="loader">loading...</div>
  </div>
);

export default class AddMenus extends Component {
  static displayName = 'UserForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.treeData = [];
    this.state = {
      checkedKeys: [],
      checkable: true,
      treeData: [],
      visible: false,
      value: {
        name: null,
        remark: null,
        agentMenuEntityList: null,
      },
    };
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    Axios({
      url: '/welend/agency/menu/list',
      method: 'post',
      headers: {
        'Authorization': Cookies.get('authorization'),
      },
      data: {},
    }).then((data) => {
      this.setState({
        treeData: data.data.data.list,
      });
    });
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.setState({
      visible: true,
    });
    this.refs.form.validateAll((errors, values) => {
      if (!errors) {
        const agentMenuEntityLists = this.state.checkedKeys.map((i) => {
          return {
            id: i,
          };
        });
        values.agentMenuEntityList = agentMenuEntityLists;
        Axios({
          url: '/welend/agency/role/add',
          method: 'post',
          data: values,
          headers: {
            'Authorization': Cookies.get('authorization'),
          },
        }).then((res) => {
          // console.log(res);
          this.setState({
            visible: false,
          });
          if (res.data.status === 'success') {
            Toast.success('添加成功！');
            hashHistory.push('/agency/role');
          } else {
            Toast.error(res.data.message);
          }
        });
      } else {
        Toast.error('请检测数据是否有效，在操作！');
      }
    });
  };

  handleCheck(keys, info) {
    const values = [];
    for (let i = 0; i < keys.length; i++) {
      values.push(keys[i]);
    }
    for (let i = 0; i < info.halfCheckedKeys.length; i++) {
      values.push(info.halfCheckedKeys[i]);
    }
    this.setState({
      checkedKeys: keys,
    });
    // console.log(values);
  }

  loop = (data) => {
    return data.map((item) => {
      return (
        <TreeNode label={item.name} key={item.id}>
          {item.children && item.children.length ? this.loop(item.children) : null}
        </TreeNode>
      );
    });
  }

  render() {
    const treeDatas = this.state.treeData;
    const { checkedKeys, checkable } = this.state;

    if (!treeDatas || treeDatas.length === 0) {
      return (
        <div>
          <Loading shape="flower" color="#333" style={styles.Loading} />
        </div>
      );
    }
    return (
      <div className="user-form">
        <IceContainer>
          <Loading visible={this.state.visible} shape="flower" style={styles.loadStyle}>
            <IceFormBinderWrapper
              value={this.state.value}
              onChange={this.formChange}
              ref="form"
            >
              <div style={styles.formContent}>
                <h2 style={styles.formTitle}>添加角色</h2>

                <Row style={styles.formItem}>
                  <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                    角色名称：
                  </Col>
                  <Col s="12" l="10">
                    <IceFormBinder name="name">
                      <Input
                        size="large"
                        placeholder="请输入用户名"
                        style={{ width: '100%' }}
                      />
                    </IceFormBinder>
                    <IceFormError name="name" />
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                    备注：
                  </Col>
                  <Col s="12" l="10">
                    <IceFormBinder name="remark">
                      <Input
                        size="large"
                        placeholder="请输入角色备注"
                        style={{ width: '100%' }}
                      />
                    </IceFormBinder>
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                    菜单权限：
                  </Col>
                  <Col s="12" l="10">
                    <Tree
                      selectable
                      checkable={checkable}
                      checkedKeys={checkedKeys}
                      onCheck={this.handleCheck}
                    >
                      { this.loop(treeDatas) }
                    </Tree>
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
          </Loading>
        </IceContainer>
      </div>
    );

  }
}

const styles = {
  Loading: {
    textAlign: 'center',
  },
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
  loadStyle: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
  },
};
