/* eslint no-unused-expressions: 0 */
import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { Dialog, Input, Select, Grid, Tree, Loading } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import DialogDecorator from './DialogDecorator';

const { Node: TreeNode } = Tree;
const { Col, Row } = Grid;

const typeData = [
  { label: '清单', value: '清单' },
  { label: '单品', value: '单品' },
];

class FormDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      checkedKeys: [],
      loadVisible: true,
      menuList: [],
      treeData: [],
      value: props.value,
    };
  }

  componentDidMount() {
    console.log(this.props.value.id);
    Axios({
      url: '/welend/sys/menu/showForRole',
      method: 'post',
      data: {},
      headers: {
        'Authorization': Cookies.get('authorization'),
      },
    }).then((data) => {
      this.setState({
        treeData: data.data.data.list,
        loadVisible: false,
      });
    });
    Axios({
      url: '/welend/sys/menu/showRoleMenu',
      method: 'post',
      data: {
        id: this.props.value.id,
      },
      headers: {
        'Authorization': Cookies.get('authorization'),
      },
    }).then((data) => {
      // console.log(data.data.data.list);
      this.father(data.data.data.list);
      this.setState({
        loadVisible: false,
      });
    });
  }

  father = (s) => {
    if (s && s.length > 0) {
      s.map((nav) => {
        if (nav.children && nav.children.length > 0) {
          return this.father(nav.children);
        }
        return this.state.checkedKeys.push(nav.id);
      });
    }
  }


  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  onOkHandler = () => {
    this.props.onOk && this.props.onOk(this.state.value);
  };

  handleCheck = (keys, info) => {
    // console.log(this.state.value);
    const values = [];
    // console.log('keys', keys, 'info', info, 'half', info.halfCheckedKeys);
    values.push(keys[0]);
    for (let i = 0; i < keys.length; i++) {
      values.push(keys[i]);
    }
    for (let i = 0; i < info.halfCheckedKeys.length; i++) {
      values.push(info.halfCheckedKeys[i]);
    }
    this.setState({
      checkedKeys: keys,
      menuList: values,
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
    let loadVisible = this.state.loadVisible;
    const { checkedKeys } = this.state;
    // console.log(this.state.checkedKeys);

    if (!treeDatas || treeDatas.length === 0 || !checkedKeys || checkedKeys.length === 0) {
      return (
        <Dialog>
          <Loading shape="flower" color="#333" style={styles.Loading} />
        </Dialog>
      );
    }
    return (
      <Dialog
        title="编辑数据"
        onClose={this.props.onClose}
        onCancel={this.props.onCancel}
        onOk={this.onOkHandler}
        visible={this.state.visible}
        style={{ width: 600, overFlow: 'auto' }}
      >
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.onFormChange}
        >
          <div>
            <Row>
              <Col span={4}>
                <span style={styles.label}>角色名称：</span>
              </Col>
              <Col span={18}>
                <IceFormBinder required max={20} message="必填">
                  <Input style={styles.formField} name="name" />
                </IceFormBinder>
                <IceFormError name="name" />
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col span={4}>
                <span style={styles.label}>英文名称：</span>
              </Col>
              <Col span={18}>
                <IceFormBinder>
                  <Input
                    style={styles.formField}
                    name="enname"
                  />
                </IceFormBinder>
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col span={4}>
                <span style={styles.label}>可用状态：</span>
              </Col>
              <Col span={18}>
                <IceFormBinder>
                  <Select
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="请选择..."
                    dataSource={[
                      { label: '可用', value: true },
                      { label: '禁用', value: false },
                    ]}
                    name="useable"
                  />
                </IceFormBinder>
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col span={4}>
                <span style={styles.label}>菜单权限：</span>
              </Col>
              <Col span={18} style={{}}>
                <IceFormBinder>
                  <Tree
                    defaultExpandAll
                    checkable
                    checkedKeys={checkedKeys}
                    onCheck={this.handleCheck}
                    name="menuList"

                  >
                    { this.loop(treeDatas) }
                  </Tree>
                </IceFormBinder>
              </Col>
            </Row>
          </div>
        </IceFormBinderWrapper>
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
