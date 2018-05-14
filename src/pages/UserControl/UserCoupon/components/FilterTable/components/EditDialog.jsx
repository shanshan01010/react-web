import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field, Select, DatePicker } from '@icedesign/base';

const FormItem = Form.Item;
const { Option } = Select;

export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: null,
    };
    this.field = new Field(this);
  }

  handleSubmit = () => {
    this.field.validate((errors, values) => {
    });
  };

  onOpen = (index, record) => {
    this.field.setValues({ ...record });
    this.setState({
      visible: true,
      value: record,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { init } = this.field;
    const { index, record } = this.props;
    const value = this.state.value;
    console.log(this.state.value);
    const formItemLayout = {
      labelCol: {
        fixedSpan: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };
    return (
      <div style={styles.editDialog}>
        <Button
          size="small"
          type="primary"
          onClick={() => this.onOpen(index, record)}
        >
          编辑
        </Button>
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="优惠券编辑"
        >
          <Form direction="ver" field={this.field}>
            <FormItem label="优惠券名称" {...formItemLayout}>
              <Input
                {...init('couponName', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="状态：" {...formItemLayout}>
              <Select
                {...init('status', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              >
                <Option value={0}>未使用</Option>
                <Option value={1}>已使用</Option>
                <Option value={2}>已过期</Option>
              </Select>
            </FormItem>

            <FormItem label="赠送时间：" {...formItemLayout}>
              {
                value === null ? (
                  <DatePicker showTime />
                ) : (
                  <DatePicker defaultValue={value.useTime} showTime />
                )
              }
            </FormItem>

            <FormItem label="使用时间：" {...formItemLayout}>
              {
                value === null ? (
                  <DatePicker showTime />
                ) : (
                  <DatePicker defaultValue={value.gaveTime} showTime />
                )
              }
            </FormItem>

            <FormItem label="过期时间" {...formItemLayout}>
              {
                value === null ? (
                  <DatePicker showTime />
                ) : (
                  <DatePicker defaultValue={value.deadTime} showTime />
                )
              }
            </FormItem>

            <FormItem label="存在天数" {...formItemLayout}>
              <Input
                {...init('expireDay', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>
          </Form>
        </Dialog>
      </div>
    );
  }
}

const styles = {
  editDialog: {
    display: 'inline-block',
    marginRight: '5px',
  },
};
