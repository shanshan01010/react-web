import React, { Component } from 'react';
import Board from 'react-trello';
import Container from '@icedesign/container';

export default class App extends Component {
  handleDragStart = (cardId, laneId) => {
    console.log('handleDragStart:', cardId, laneId);
  };

  handleDragEnd = (cardId, sourceLaneId, targetLaneId, position) => {
    console.log('handleDragEnd:', cardId, sourceLaneId, targetLaneId, position);
  };

  shouldReceiveNewData = (nextData) => {
    console.log(nextData);
  };

  handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`);
  };

  render() {
    const lanes = {
      one: {
        display: 'block',
      },
    };
    const data = {
      lanes: [
        {
          style: lanes.one,
          id: '1',
          label: '3/3',
          title: '内容',
          cards: [
            {
              id: 'Card1',
              title: '拖动排序',
              description: '任务列表也可以拖动排序，拖动一个任务列表试试看',
              label: '30 mins',
            },
            {
              id: 'Card2',
              title: '新建任务',
              description: '点击【Add Card】，试试创建一条新的任务',
              label: '5 mins',
              metadata: { sha: 'be312a1' },
            },
            {
              id: 'Card3',
              title: '任务时间',
              description: '设置了截止时间的任务，会在任务日历中显示',
              label: '5 mins',
              metadata: { sha: 'be312a1' },
            },
          ],
        },
        {
          style: lanes.one,
          id: '2',
          title: '基础',
          label: '0/0',
          cards: [],
        },
        {
          style: lanes.one,
          id: '3',
          title: '条件',
          label: '0/0',
          cards: [],
        },
        {
          style: lanes.one,
          id: '4',
          title: '动作',
          label: '0/0',
          cards: [],
        },
      ],
    };
    return (
      <div style={styles.boardList}>
        <Board
          style={styles.boardPart}
          data={data}
          draggable
          collapsibleLanes
          editable
          handleDragStart={this.handleDragStart}
          handleDragEnd={this.handleDragEnd}
          onDataChange={this.shouldReceiveNewData}
          onCardAdd={this.handleCardAdd}
        />
      </div>
    );
  }
}

const styles = {
  boardList: {
    width: '100%',
  },
  boardPart: {
    background: '#eee',
    padding: '12px',
    width: '100%',
  },
};
