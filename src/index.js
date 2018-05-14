import ReactDOM from 'react-dom';
// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/reset.scss';
import routes from './routes';
import Axios from 'axios';

// 以下代码 ICE 自动生成, 请勿修改
const container = document.createElement('div');
container.dataset.reactRoot = true;
window.allValue = "1111";
// Axios.get("/mock/basic-not-found.json").then((data) => {
//   console.log(data);
// });
document.body.appendChild(container);
ReactDOM.render(routes, container);
