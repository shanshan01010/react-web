import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, Feedback, DatePicker, moment, Tab  } from '@icedesign/base';
import FoundationSymbol from 'foundation-symbol';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import CustomBreadcrumb from '../../../../../../../components/CustomBreadcrumb';
import AllFunction from '../../../../../../../components/AllFunction';
import Ueditor from '../../../../../../../components/Ueditor/Ueditor';

import './ueditor.css';


const DataCommonAxios = AllFunction.DataCommonAxios;
const { RangePicker } = DatePicker;
const Toast = Feedback.toast;
const TabPane = Tab.TabPane;
const { Row, Col } = Grid;

let time = null;
let times = null;

export default class AddMenus extends Component {
  static displayName = 'UserForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.editorResult = '';
    this.state = {
      value: {
        bidName: null,
        minMoney: null,
        day: null,
        totalMoney: null,
        totalDiff: null,
        addRate: null,
        addMoney: null,
        bidType: null,
        repayType: null,
        maxMoney: null,
        maxCount: null,
        expectRate: null,
        fixrateTime: null,
        startTime: null,
        endTime: null,
        transferDay: null,
        descs: null,
        ctrl: null,
        img: null,
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  componentDidMount() {
  }

  shouldComponentUpdate(nextProps , nextState) {
    return (this.props.router.location.action === 'PUSH');
  }

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      const desc = UE.getEditor('descs').getAllHtml();
      const ctrl = UE.getEditor('ctrl').getAllHtml();
      const img = UE.getEditor('img').getAllHtml();
      values.startTime = time[0];
      values.endTime = time[1];
      values.fixrateTime = times;
      values.desc = desc;
      values.ctrl = ctrl;
      values.img = img;
      if (!errors && values.fixrateTime !== null && values.startTime !== null && values.endTime !== null) {
        const Succeed = () => {
          Toast.success('添加成功！');
          hashHistory.push('/product/bid');
        };
        const Fail = () => {
          Toast.error('添加失败！');
        };
        DataCommonAxios('/welend/product/bid/add', values, Succeed, Fail);
      } else {
        Toast.error('请检测数据是否有效后，在操作！');
      }
    });
  };

  render() {
    console.log(this.props);
    const breadcrumb = [
      { text: '产品管理', link: '' },
      { text: '产品标管理', link: '#/product/bid' },
      { text: '添加标', link: '#/product/bid/add' },
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
              <h2 style={styles.formTitle}>添加标</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  产品名称：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="bidName" required triggerType="onBlur" message="必填">
                    <Input
                      size="large"
                      placeholder="请输入产品名称"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="bidName" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  起投金额：
                </Col>
                <Col s="6" l="6">
                  <IceFormBinder name="minMoney"  required triggerType="onBlur" message="必填">
                    <Input
                      size="large"
                      placeholder="请输入类目图标"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="bidName" />
                </Col>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                投资期限：
                </Col>
                <Col s="6" l="6">
                  <IceFormBinder name="day" required triggerType="onBlur" message="必填">
                    <Input
                      size="large"
                      placeholder="请输入投资期限"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="day" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                投资总额：
                </Col>
                <Col s="6" l="6">
                  <IceFormBinder name="totalMoney"  required triggerType="onBlur" message="必填">
                    <Input
                      size="large"
                      placeholder="请输入投资总额"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="totalMoney" />
                </Col>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                已投资总额：
                </Col>
                <Col s="6" l="6">
                  <IceFormBinder name="totalDiff"  required triggerType="onBlur" message="必填">
                    <Input
                      size="large"
                      placeholder="请输入已投资总额"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="bidName" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                加利息率：
                </Col>
                <Col s="6" l="6">
                  <IceFormBinder name="addRate"  required triggerType="onBlur" message="必填">
                    <Input
                      size="large"
                      placeholder="请输入加利息率"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="bidName" />
                </Col>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                加价金额：
                </Col>
                <Col s="6" l="6">
                  <IceFormBinder name="addMoney"  required triggerType="onBlur" message="必填">
                    <Input
                      size="large"
                      placeholder="请输入已加价金额"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="bidName" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                标类型：
                </Col>
                <Col s="6" l="6">
                  <IceFormBinder name="bidType">
                    <Select
                      size="large"
                      placeholder="请选择标类型"
                      style={{ width: '100%' }}
                      dataSource={[
                        { label: '新手', value: 0 },
                        { label: '短期', value: 1 },
                      ]}
                    />
                  </IceFormBinder>
                </Col>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                还款方式：
                </Col>
                <Col s="6" l="6">
                  <IceFormBinder name="repayType">
                    <Select
                      size="large"
                      placeholder="请选择还款方式"
                      style={{ width: '100%' }}
                      dataSource={[
                        { label: '满标计息 到期本息', value: 0 },
                        { label: '满标计息 先息后本', value: 1 },
                      ]}
                    />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                最大投资金额：
                </Col>
                <Col s="6" l="6">
                  <IceFormBinder name="maxMoney"  required triggerType="onBlur" message="必填">
                    <Input
                      size="large"
                      placeholder="请输入最大投资金额"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="bidName" />
                </Col>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                最大购买次数：
                </Col>
                <Col s="6" l="6">
                  <IceFormBinder name="maxCount"  required triggerType="onBlur" message="必填">
                    <Input
                      size="large"
                      placeholder="请选择最大购买次数"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="bidName" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                预期年利化率：
                </Col>
                <Col s="6" l="6">
                  <IceFormBinder name="expectRate"  required triggerType="onBlur" message="必填">
                    <Input
                      size="large"
                      placeholder="请输入预期年利化率"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                </Col>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                起息日期：
                </Col>
                <Col s="6" l="6">
                  <IceFormBinder name="fixrateTime">
                    <DatePicker showTime onChange={(a, b) => {times = b}} />
                  </IceFormBinder>
                  <IceFormError name="bidName" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                开始/结束时间：
                </Col>
                <Col s="6" l="6">
                  <RangePicker
                    showTime={{
                      defaultValue: [
                        moment("00:00:00", "HH:mm:ss"),
                        moment("23:59:59", "HH:mm:ss")
                      ]
                    }}
                    onChange={(a, b) => {time = b}}
                    resetTime={false}
                  />
                </Col>
              </Row>
              <Row>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  转让最小天数：
                </Col>
                <Col s="6" l="6">
                  <IceFormBinder name="transferDay" required triggerType="onBlur" message="必填">
                    <Input
                      size="large"
                      placeholder="请输入转让最小天数"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="bidName" />
                </Col>
              </Row>
              <p style={{borderTop: '1px solid #eee', padding: '20px 20px 0 20px'}}>项目概述：</p>    
              <IceFormBinder name="desc">
                <Ueditor width="100%" id="descs" className="editor" height="200"/>
              </IceFormBinder>
              <p>风险控制：</p>  
              <IceFormBinder name="ctrl">
                <Ueditor width="100%" id="ctrl" className="editor" height="200"/>
              </IceFormBinder>
              <p>图片：</p>  
              <IceFormBinder name="img">
                <Ueditor width="100%" id="img" className="editor" height="200"/>
              </IceFormBinder>
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
  Ueditor: {
    width: '100%',
  },
};
