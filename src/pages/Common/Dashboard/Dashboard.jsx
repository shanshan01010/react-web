import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';

import StatisticalCard from './components/StatisticalCard';

import DataStatistics from './components/DataStatistics';

import RealTimeStatistics from './components/RealTimeStatistics';
import LatestNews from './components/LatestNews';

import './Dashboard.scss';

const allPermission = [];

export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  constructor(props) {
    super(props);
    this.state = {};
    // Cookies.remove('permission');
    // if (Cookies.get('permission') === undefined) {
    //   Axios({
    //     url: '/welend/sys/menu/showForRole',
    //     method: 'post',
    //     data: {},
    //     headers: {
    //       "Authorization": Cookies.get('authorization'),
    //     },
    //   }).then((res) => {
    //     console.log(res);
    //     if (res && res.data.data.list.length > 0) {
    //       // console.log('sl');
    //       res.data.data.list.map((nav) => {
    //         allPermission.push(nav.permission);
    //         return this.parent(nav, nav.children);
    //       });
    //       console.log(allPermission);
    //       Cookies.set('permission', allPermission);
    //     }
    //   });
    // }
  }
  // parent = (f, c) => {
  //   if (c && c.length > 0) {
  //     c.map((item) => {
  //       if (item.children && item.children.length > 0) {
  //         allPermission.push(item.permission);
  //         return this.parent(item, item.children);
  //       }
  //       return this.child(item);
  //     });
  //   }
  // }

  // child = (m) => {
  //   return allPermission.push(m.permission);
  // }

  render() {
    return (
      <div className="dashboard-page">
        {/* <PerMission currentData={[1]} type="Button" /> */}
        <StatisticalCard />

        <DataStatistics />

        <RealTimeStatistics />

        <LatestNews />
      </div>
    );
  }
}
