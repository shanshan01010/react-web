// <!-- auto generated navs start -->
const autoGenHeaderNavs = [];
const autoGenAsideNavs = [];

// <!-- auto generated navs end -->

const customHeaderNavs = [
  {
    text: '首页',
    to: '/',
    icon: 'home',

  },
  {
    text: '反馈',
    to: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    text: '帮助',
    to: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const customAsideNavs = [
  {
    text: '首页',
    to: '/',
    key: 0,
    icon: 'home',
  },
  {
    text: '用户管理',
    to: '/user',
    key: 1,
    icon: 'yonghu',
    children: [
      { text: '用户列表', to: '/user/list', key: 2 },
      { text: '用户反馈', to: '/user/feedback', key: 3 },
    ],
  },
  {
    text: '销售管理',
    to: '/sell',
    icon: 'copy',
    key: 4,
    children: [
    ],
  },
  {
    text: '投资记录',
    to: '/invest',
    icon: 'compass',
    key: 5,
    children: [
    ],
  },
  {
    text: '数据导出',
    to: '/dataExport',
    icon: 'backward',
    key: 6,
    children: [
    ],
  },
  {
    text: '资金管理',
    to: '/capital',
    key: 7,
    icon: 'coupons',
    children: [
      { text: '入金管理', to: '/capital/in', key: 8 },
      { text: '出金管理', to: '/capital/out', key: 9 },
      {
        text: '资金变更管理',
        to: '/capital/change',
        icon: 'eye',
        key: 10,
        children: [
          {
            text: '资金变更管理1',
            to: '/capital/change',
            icon: 'nav-list',
            key: 20,
            children: [
              {
                text: '数据导出1',
                to: '/dataExport',
                icon: 'backward',
                key: 22,
                children: [
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    text: '系统管理',
    to: '/sys',
    icon: 'key',
    key: 11,
    children: [
      { text: '系统菜单管理', to: '/sysPermission/menu', key: 12 },
      {
        text: '系统用户管理',
        to: '/sysPermission/sysUserControl',

        key: 13,
      },
      {
        text: '系统角色管理',
        to: '/sysPermission/roleControl',

        key: 14,
      },
    ],
  },
  {
    text: '回款计划',
    to: '/receiptPlan',
    icon: 'light',
    key: 15,
    children: [
    ],
  },
  {
    text: '标的管理',
    to: '/bid',
    icon: 'anchor',
    key: 16,
    children: [
    ],
  },
  {
    text: '活动管理',
    to: '/activity',
    icon: 'customize',
    key: 17,
    children: [
    ],
  },
  {
    text: '消息管理',
    to: '/message',
    icon: 'horn',
    key: 18,
    children: [
    ],
  },
  {
    text: '商城管理',
    to: '/store',
    icon: 'store',
    key: 19,
    children: [
    ],
  },
  {
    text: '论坛管理',
    to: '/forum',
    icon: 'fans',
    key: 21,
    children: [
    ],
  },
];

function transform(navs) {
  // custom logical
  return [...navs];
}

export const headerNavs = transform([
  ...autoGenHeaderNavs,
  ...customHeaderNavs,
]);

export const asideNavs = transform([...autoGenAsideNavs, ...customAsideNavs]);
