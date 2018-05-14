import React, { Component } from 'react';

export default class Ueditor extends Component {
    constructor(props){
        super(props);
        // console.log('props');
        // console.log(props);
        this.state = {
            'id': props.id,
            'height': props.height,
            'name': props.name,
            'value': props.content,
            'width': props.width,
        };
        // console.log('state');
        // console.log(this.state);
      }
      componentDidMount(){
        this.initEditor()
      }
      componentWillUnmount() {
        // 组件卸载后，清除放入库的id
        //UE.delEditor(this.props.id);
      }
      initEditor() {
        const id = this.state.id;
        const ueEditor = UE.getEditor(this.state.id , {
            initialFrameHeight : 500
        });
        const self = this;
        ueEditor.ready((ueditor) => {
          if (!ueditor) {
            UE.delEditor(id);
            self.initEditor();
          }
        });
      }
      render(){
        return (
            <script id={this.state.id}  name={this.state.name} type="text/plain">
                {this.state.content}
            </script>
        )
      }
}
