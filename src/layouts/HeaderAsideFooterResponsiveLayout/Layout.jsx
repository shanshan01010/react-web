/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';

import cx from 'classnames';
import Layout from '@icedesign/layout';
import { Icon, Tab, Loading } from '@icedesign/base';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import { Link, hashHistory } from 'react-router';
import FoundationSymbol from 'foundation-symbol';
import { enquire } from 'enquire-js';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import Logo from './../../components/Logo';
import './scss/light.scss';
import './scss/dark.scss';

// const TabPane = Tab.TabPane;
// 设置默认的皮肤配置，支持 dark 和 light 两套皮肤配置
const theme = typeof THEME === 'undefined' ? 'dark' : THEME;
const TabPane = Tab.TabPane;
const rootid = '0';
const panes = [
  { tab: '首页', key: rootid, closeable: false, to: '/' },
];
let activeKey = 0;
const allPermission = [];

export default class HeaderAsideFooterResponsiveLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      openDrawer: false,
      isScreen: undefined,
      panes: panes,
      tabledata : [],
      activeKey: activeKey,
      loadVisible: true,
      tab: [],
    };
    const openKeys = this.getOpenKeys();
    this.state.activeKey = activeKey;
    this.openKeysCache = openKeys;
  }

  componentDidMount() {
    const urlParams = window.location.href.split('#')[1];
    // console.log(urlParams);
    Axios({
      url: '/welend/sys/menu/showOfUser',
      method: 'post',
      data: {},
      headers: {
        "Authorization": Cookies.get('authorization'),
      },
    }).then((res) => {
      res.data.data.list.map((nav) => {
        // console.log(nav.href);
        if (nav.href === urlParams && nav.id !== rootid) {
          if (!nav.children || nav.children.length <= 0) {
            panes.push({
              tab: nav.name,
              key: nav.id,
              closeable: true,
              to: nav.href,
            });
            activeKey = nav.id;
            this.setState({
              panes: panes,
              tabledata: res.data.data.list,
              tab: panes,
              activeKey: nav.id,
            });
          }
        }

        if (nav.children && nav.children.length > 0) {
          nav.children.map((item) => {
            if (item.href === urlParams && item.id !== rootid) {
              panes.push({
                tab: item.name,
                key: item.id,
                closeable: true,
                to: item.href,
              });
              activeKey = item.id;
            }
          });
          this.setState({
            panes: panes,
            tabledata: res.data.data.list,
            tab: panes,
            activeKey: activeKey,
          });
        }
        this.setState({
          loadVisible: false,
        });
      });
    });

    Axios({
      url: '/welend/sys/menu/showForRole',
      method: 'post',
      data: {},
      headers: {
        "Authorization": Cookies.get('authorization'),
      },
    }).then((res) => {
      // console.log(res);
      if (res && res.data.data.list.length > 0) {
        // console.log('sl');
        res.data.data.list.map((nav) => {
          allPermission.push(nav.permission);
          return this.parent(nav, nav.children);
        });
        // console.log(allPermission);
        Cookies.set('permission', allPermission);
      }
    });

    this.enquireScreenRegister();
  }

  parent = (f, c) => {
    if (c && c.length > 0) {
      c.map((item) => {
        if (item.children && item.children.length > 0) {
          allPermission.push(item.permission);
          return this.parent(item, item.children);
        }
        return this.child(item);
      });
    }
  }

  child = (m) => {
    return allPermission.push(m.permission);
  }


  /**
   * 注册监听屏幕的变化，可根据不同分辨率做对应的处理
   */
  enquireScreenRegister = () => {
    const isMobile = 'screen and (max-width: 720px)';
    const isTablet = 'screen and (min-width: 721px) and (max-width: 1199px)';
    const isDesktop = 'screen and (min-width: 1200px)';

    enquire.register(isMobile, this.enquireScreenHandle('isMobile'));
    enquire.register(isTablet, this.enquireScreenHandle('isTablet'));
    enquire.register(isDesktop, this.enquireScreenHandle('isDesktop'));
  };

  enquireScreenHandle = (type) => {
    let collapse;
    if (type === 'isMobile') {
      collapse = false;
    } else if (type === 'isTablet') {
      collapse = true;
    } else {
      collapse = this.state.collapse;
    }

    const handler = {
      match: () => {
        this.setState({
          isScreen: type,
          collapse,
        });
      },
      unmatch: () => {
        // handler unmatched
      },
    };

    return handler;
  };

  toggleCollapse = () => {
    const { collapse } = this.state;
    const openKeys = !collapse ? [] : this.openKeysCache;

    this.setState({
      collapse: !collapse,
      openKeys,
    });
  };

  /**
   * 左侧菜单收缩切换
   */
  toggleMenu = () => {
    const { openDrawer } = this.state;
    this.setState({
      openDrawer: !openDrawer,
    });
  };

  /**
   * 当前展开的菜单项
   */
  onOpenChange = (openKeys) => {
    this.setState({
      openKeys,
    });
    this.openKeysCache = openKeys;
  };

  /**
   * 响应式时点击菜单进行切换
   */
  onMenuClick = () => {
    this.toggleMenu();
  };

  /**
   * 获取当前展开的菜单项
   */
  getOpenKeys = () => {
    const { routes } = this.props;
    const matched = routes[0].path;
    const tabledata = this.state.tabledata;
    // console.log(Data);
    let openKeys = [];

    tabledata &&
    tabledata.length > 0 &&
      tabledata.map((item, index) => {
        if (item.to === matched) {
          openKeys = [`${index}`];
        }
      });

    return openKeys;
  };

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.tab.forEach((item, i) => {
      if (item.key == targetKey) {
        lastIndex = i - 1;
        // console.log(this.state.panes[lastIndex].to);
        hashHistory.push(this.state.tab[lastIndex].to);
      }
    });
    const tab = this.state.tab.filter(pane => pane.key != targetKey);
    if (lastIndex >= 0 && activeKey == targetKey) {
      activeKey = tab[lastIndex].key;

    }
    if (activeKey == rootid) {
      hashHistory.push('/');
    }
    this.setState({ tab, activeKey });
  }

  onTabClose = (targetKey) => {
    this.remove(targetKey);
  }

  onTabChange = (activeKey) => {
    this.setState({ activeKey });
  }

  createMenuList = (pp, childrens) => {
    // console.log('show', childrens);
    // console.log(pp);
    if (childrens && childrens.length > 0) {
      return (
        <SubMenu
          key={pp.id}
          triggerType="click"
          title={
            <span>
              {pp.icon ? (
                <FoundationSymbol size="small" type={pp.icon} />
              ) : null}
              <span className="ice-menu-collapse-hide">
                {pp.name}
              </span>
            </span>
          }
        >
          {
            childrens.map((item) => {
              if (item.show) {
                if (item.children && item.children.length > 0 && item.show) {
                  return this.createMenuList(item, item.children);
                }
                return this.createMenuLeaf(item);
              }
            })
          }
        </SubMenu>
      );
    }

    if (pp.show) {
      return this.createMenuLeaf(pp);
    }
  };

  createMenuLeaf = (pp) => {
    const linkProps = {};
    // console.log(this);
    // console.log(pp.href);
    if (pp.newWindow) {
      linkProps.href = '/#' + pp.href;
      linkProps.target = '_blank';
    } else if (pp.external) {
      linkProps.href = '/#' + pp.href;
    } else {
      linkProps.href = '/#' + pp.href;
    }
    return (
      <MenuItem key={pp.id} triggerType="click">
        <Link {...linkProps}
          onClick={() => {
            if (!pp.children || pp.children.length === 0) {
              this.setState(prevState => {
                const { tab } = prevState;
                this.state.activeKey = pp.id ;
                let isNew = true;
                for(let i = 0; i < tab.length ; i++){
                  if(tab[i].key == pp.id){
                    isNew = false;
                  }
                }
                if(isNew){
                  tab.push({ tab: pp.name, key: pp.id ,  to: pp.href });
                }
                return { tab };
              })
            }
          }}
        >
          <span>
            {pp.icon ? (
              <FoundationSymbol size="small" type={pp.icon} />
            ) : null}&nbsp;&nbsp;
            {pp.id === '0' ? (
              <span className="ice-menu-collapse-hide">
                {pp.name}
              </span>
            ) : (
              <span>
                {pp.name}
              </span>
            )}
          </span>
        </Link>
      </MenuItem>
    );
  }

  onClickStyle = () => {
    const onClickStyle = {
      background: 'linear-gradient( to right, #1c75ff, #47c2ff )',
    };
    return onClickStyle;
  }

  render() {
    const { location = {} } = this.props;
    const { pathname } = location;
    const tabledata = this.state.tabledata;

    return (
      <Layout
        style={{ minHeight: '100vh' }}
        className={cx(
          `ice-design-header-aside-footer-responsive-layout-${theme}`,
          {
            'ice-design-layout': true,
          }
        )}
      >
        <Loading visible={this.state.loadVisible} shape="flower">
          <Header
            theme={theme}
            isMobile={this.state.isScreen !== 'isDesktop' ? true : undefined}
          />
          <Layout.Section>
            {this.state.isScreen === 'isMobile' && (
              <a className="menu-btn" onClick={this.toggleMenu}>
                <Icon type="category" size="small" />
              </a>
            )}
            {this.state.openDrawer && (
              <div className="open-drawer-bg" onClick={this.toggleMenu} />
            )}
            <Layout.Aside
              width="auto"
              theme={theme}
              className={cx('ice-design-layout-aside', {
                'open-drawer': this.state.openDrawer,
              })}
            >
              {/* 侧边菜单项 begin */}
              {this.state.isScreen !== 'isMobile' && (
                <a className="collapse-btn" onClick={this.toggleCollapse}>
                  <Icon
                    type={this.state.collapse ? 'arrow-right' : 'arrow-left'}
                    size="small"
                  />
                </a>
              )}
              {this.state.isScreen === 'isMobile' && <Logo />}
              <Menu
                style={{ width: this.state.collapse ? 60 : 200 }}
                inlineCollapsed={this.state.collapse}
                mode="inline"
                selectedKeys={[pathname]}
                selectMode="single"
                openKeys={this.state.openKeys}
                defaultSelectedKeys={[pathname]}
                onOpenChange={this.onOpenChange}
                onClick={this.onMenuClick}
              >
                {
                  tabledata && tabledata.length > 0
                    && tabledata.map((item) => {
                      return this.createMenuList(item, item.children);
                    })
                }
              </Menu>
              {/* 侧边菜单项 end */}
            </Layout.Aside>

            {/* 主体内容 */}
            <Layout.Main>
              <div>
                {/* 多页标签卡0 */}
                <Tab
                  type="wrapped"
                  activeKey={this.state.activeKey}
                  closeable
                  onChange={this.onTabChange}
                  onClose={this.onTabClose}
                  className="custom-tab"
                >
                  {this.state.tab.map(item => (
                    <TabPane tabStyle={styles.tabPane} tab={item.tab} key={item.key} closeable={item.closeable} onClick={() => { hashHistory.push(item.to); }}>
                      {this.props.children}
                    </TabPane>
                  ))}
                </Tab>
              </div>
            </Layout.Main>
          </Layout.Section>
          <Footer />
        </Loading>
      </Layout>
    );
  }
}

const styles = {
  tabPane: {
    height: '35px',
    lineHeight: '35px',
    padding: '0 15px',
    marginLeft: '-5px',
  },
};
