/* eslint no-unused-expressions: 0 */
import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { Dialog, Input, Feedback, Grid, Tree, Loading } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import DialogDecorator from './DialogDecorator';

const { Node: TreeNode } = Tree;
const { Col, Row } = Grid;
const Toast = Feedback.toast;

class FormDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      checkedKeys: [],
      loadVisible: true,
      roleId: [],
      treeData: [],
      value: props.value,
    };
  }

  componentDidMount() {
    console.log(this.props.value.id);
    Axios({
      url: '/welend/agency/menu/list',
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
      url: '/welend/agency/menu/showByRole',
      method: 'post',
      data: {
        id: this.props.value.id,
      },
      headers: {
        'Authorization': Cookies.get('authorization'),
      },
    }).then((data) => {
      console.log(data.data.data.list);
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
          this.father(nav.children);
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
    const agentMenuEntityLists = this.state.checkedKeys.map((i) => {
      return {
        id: i,
      };
    });
    this.setState({
      loadVisible: true,
    });
    const value = {
      id: this.props.value.id,
      agentMenuEntityList: agentMenuEntityLists,
    };
    console.log(this.state.value);
    this.refs.form.validateAll((errors, values) => {
      value.name = values.name;
      value.remark = values.remark;
      if (!errors || errors.length === 0) {
        this.props.onOk && this.props.onOk(this, value);
      } else {
        this.setState({
          loadVisible: false,
        });
        Toast.error('数据填写不正确！请检查后再操作。');
      }
    });
  };

  handleCheck = (keys, info) => {
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
    console.log(values);
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
    const loadVisible = this.state.loadVisible;
    const { checkedKeys } = this.state;
    console.log(this.state.checkedKeys);

    if (!treeDatas || treeDatas.length === 0 || !checkedKeys || checkedKeys.length === 0) {
      return (
        <Dialog
          title="编辑数据"
          onClose={this.props.onClose}
          onCancel={this.props.onCancel}
          onOk={this.onOkHandler}
          visible={this.state.visible}
          style={{ overflowY: 'auto', width: 600 }}
        >
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
        shouldUpdatePosition
        style={{ overflowY: 'auto', width: 600 }}
      >
        <Loading visible={loadVisible} style={styles.loadStyle} shape="flower">
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.onFormChange}
            ref="form"
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
                </Col>
              </Row>

              <Row style={styles.row}>
                <Col span={4}>
                  <span style={styles.label}>备注：</span>
                </Col>
                <Col span={18}>
                  <IceFormBinder>
                    <Input
                      style={styles.formField}
                      name="remark"
                    />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.row}>
                <Col span={4}>
                  <span style={styles.label}>菜单权限：</span>
                </Col>
                <Col span={18} style={{}}>
                  <Tree
                    defaultExpandAll
                    checkable
                    checkedKeys={this.state.checkedKeys}
                    onCheck={this.handleCheck}
                  >
                    { this.loop(treeDatas) }
                  </Tree>
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
    lineHeight: '30px',
  },
  formField: {
    width: '100%',
  },
};

export default DialogDecorator(FormDialog);
