import React, { Component } from 'react';
import { Input, Grid, Select, Button, DatePicker, Accordion } from '@icedesign/base';

// form binder 详细用法请参见官方文档
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const { Option } = Select;
const { Panel } = Accordion;

export default class Filter extends Component {
  static displayName = 'Filter';

  render() {
    return (
      <Accordion>
        <Panel title="内容筛选">
          <IceFormBinderWrapper
            value={this.props.value}
            onChange={this.props.onChange}
          >
            <div>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>所属应用</label>
                  <IceFormBinder>
                    <Input name="app" key={1} />
                  </IceFormBinder>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>分类ID</label>
                  <IceFormBinder>
                    <Input name="id" key={2} />
                  </IceFormBinder>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>标签ID</label>
                  <IceFormBinder>
                    <Input name="tag" key={3} />
                  </IceFormBinder>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>开始时间</label>
                  <IceFormBinder
                    valueFormatter={(date, strValue) => {
                      return strValue;
                    }}
                  >
                    <DatePicker name="startTime" key={4} style={styles.filterTool} />
                  </IceFormBinder>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>结束时间</label>
                  <IceFormBinder
                    valueFormatter={(date, strValue) => {
                      return strValue;
                    }}
                  >
                    <DatePicker name="endTime" key={5} style={styles.filterTool} />
                  </IceFormBinder>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>尺寸</label>
                  <IceFormBinder>
                    <Select
                      name="size"
                      placeholder="请选择"
                      style={styles.filterTool}
                      key={6}
                    >
                      <Option value="small">Small</Option>
                      <Option value="medium">Medium</Option>
                      <Option value="large">Large</Option>
                    </Select>
                  </IceFormBinder>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>删除状态</label>
                  <IceFormBinder>
                    <Select name="status" key={7} style={styles.filterTool}>
                      <Option value="success">成功</Option>
                      <Option value="failed">失败</Option>
                    </Select>
                  </IceFormBinder>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>讨论ID</label>
                  <IceFormBinder>
                    <Input name="commentId" key={8} />
                  </IceFormBinder>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>置顶</label>
                  <IceFormBinder>
                    <Select
                      name="isStick"
                      placeholder="请选择"
                      style={styles.filterTool}
                      key={9}
                    >
                      <Option value="all">不限</Option>
                      <Option value="stick">置顶</Option>
                      <Option value="not-stick">不置顶</Option>
                    </Select>
                  </IceFormBinder>
                </Col>
              </Row>
              <div
                style={{
                  textAlign: 'left',
                  marginLeft: '12px',
                }}
              >
                <Button onClick={this.props.onReset} type="normal">
                  重置
                </Button>
                <Button
                  onClick={this.props.onSubmit}
                  type="primary"
                  style={{ marginLeft: '10px' }}
                >
                  确定
                </Button>
              </div>
            </div>
          </IceFormBinderWrapper>
        </Panel>
      </Accordion>
    );
  }
}

const styles = {
  filterCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },

  filterTitle: {
    width: '68px',
    textAlign: 'right',
    marginRight: '12px',
    fontSize: '14px',
  },

  filterTool: {
    width: '200px',
  },
};
