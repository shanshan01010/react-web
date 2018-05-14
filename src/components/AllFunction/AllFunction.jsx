import Axios from 'axios';
import Cookies from 'js-cookie';
import { Dialog } from '@icedesign/base';

// 不带数据data的普通请求
const CommonAxios = (Url, Succeed, Fail) => {
  Axios({
    url: Url,
    method: 'post',
    headers: {
      "Authorization": Cookies.get('authorization'),
    },
  }).then((res) => {
    // console.log(Succeed)
    if (res.status === 'success') {
      res.status = null;
      if (Succeed !== undefined) {
        Succeed();
      }
      return res;
    }
    if (Fail !== undefined) {
      Fail();
    }
  }).catch(() => {
    if (Fail !== undefined) {
      Fail();
    }
  });
};

// 代数据data的普通请求
const DataCommonAxios = (Url, Data, Succeed, Fail) => {
  console.log(Data);
  Axios({
    url: Url,
    method: 'post',
    data: Data,
    headers: {
      "Authorization": Cookies.get('authorization'),
    },
  }).then((res) => {
    // console.log(res);
    if (res.data.status === 'success') {
      res.status = null;
      if (Succeed !== undefined) {
        Succeed(res);
      }
      return res;
    }
    if (Fail !== undefined) {
      Fail();
    }
  }).catch(() => {
    if (Fail !== undefined) {
      // Fail();
    }
  });
};

// 表格的DataBinder,是否显示message    message:是否提示请求后的信息  boolean类型
const TableDataBinder = (Url, message) => {
  const value = {
    tableData: {
      url: Url,
      method: 'post',
      data: {},
      headers: {
        "Authorization": Cookies.get('authorization'),
      },
      success: (res) => {
        if (!message) {
          res.status = null;
        }
      },
      defaultBindingData: {
        list: [],
        total: null,
        pageSize: 5,
        currentPage: null,
      },
    },
  };
  return value.tableData;
};

// 更新BindData
const updateBindingData = (Url) => {
  const value = {
    updateBindingData: {
      url: Url,
      method: 'post',
      headers: {
        "Authorization": Cookies.get('authorization'),
      },
      success: (res) => {
        res.status = null;
      },
    },
  };
  return value.updateBindingData;
};

// 权限标识数据格式转换
const permissionDataChange = (data) => {
  if (data !== undefined) {
    const datas = data.replace(/"/g, '').replace('"', '').slice(1, -1).split(',');
    return datas;
  }
  return null;
};

const findPermission = (f, c) => {

  for (let i = 0; i < f.length; i++) {
    if (f[i] === c) {
      return true;
    }
  }
};

export default {
  CommonAxios,
  DataCommonAxios,
  TableDataBinder,
  updateBindingData,
  permissionDataChange,
  findPermission,
};
